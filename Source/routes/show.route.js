const express = require("express");
const passport = require("../utils/passport");
const router = express.Router();
const articleModel = require("../models/article.model");
const tagModel = require("../models/tag.model");
const commentModel = require("../models/comment.model");
const categoryModel = require("../models/category.model");
const premiumUser = require("../utils/PremiumUser");
const userModel = require("../models/user.model");
var nodemailer = require("nodemailer");
const crypto = require("crypto");
const moment = require("moment");
const config = require("../config/default.json");
const bcryptjs = require("bcryptjs");
const LRU = require("lru-cache");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "dantaliian1@gmail.com",
    pass: "iloveloan",
  },
});
router.use(function (req, res, next) {
  req.app.locals.layout = "show"; // set your layout here
  next(); // pass control to the next handler
});

router.get("/", async function (req, res) {
  const [
    listCateSub,
    result4Rand,
    resultTop12Views,
    resultTop12Time,
    resultTop12Place
  ] = await Promise.all([
    categoryModel.allSubCate(),
    articleModel.Top4Rand(),
    articleModel.Top12Views(),
    articleModel.Top12Time(),
    articleModel.Top12Place()
  ]);

  // Tách 3 Views đầu và 8 Views sau để hiển thị
  // var top3View = [];
  // var top8ViewLast = [];
  // for (var top = 0; top < resultTop11View.length; top++){
  //   if (top < 3){
  //     top3View.push(resultTop11View[top]);
  //   }
  //   else{
  //     top8ViewLast.push(resultTop11View[top]);
  //   }
  // }

  res.render("vwShow/home", {
    listCateSub,
    list4Rand: result4Rand,
    listTop12Views: resultTop12Views,
    listTop12Time: resultTop12Time,
    listTop12Place: resultTop12Place
  });
});


// router.post("/details", async function (req, res) {
//   var text = req.body.commentText;
//   var id = req.body.id;
//   var date = new Date();

//   var entity = {
//     IDArticle: id,
//     IDUser: res.locals.lcAuthUser.IDUser,
//     Date: date,
//     Comment: text
//   }

//   commentModel.addComment(entity);

//   return res.redirect(`/details?id=${id}#comment`);
// });

//Chi tiết bài viết
router.get("/details", async function (req, res) {
  const getId = req.query.id;
  const single = await articleModel.singleArticle(getId);
  
  const [
    listCateSub,
    detailsPost,
    listCate,
    listCateNumber,
    listArticle,
    listComment
  ] = await Promise.all([
    categoryModel.allSubCate(),
    articleModel.singleArticle(getId),
    categoryModel.allCate(),
    categoryModel.allCateNumber(),
    articleModel.Top6RelationshipRand(getId, single[0].IDCategory, single[0].IDSubCategory),
    commentModel.allCommentIdArticle(getId)
  ]);

  // update Views
  var newViews = detailsPost[0].Views + 1;
  articleModel.upViews(getId, newViews);

  // Đếm số lượng trong các tỉnh thành có bao nhiêu bài viết
  listCate.forEach(function(item){
    var flag = -1;
    for (var i = 0; i < listCateNumber.length; i++){
      if (item.IDCategory === listCateNumber[i].IDCategory){
        flag = i;
      }
    }
    if (flag === -1){
      item.Number = 0;
    }
    else{
      item.Number = listCateNumber[flag].Number;
    }
  });
  //Thuật toán sắp xếp tuần tự giảm dần
  for (var i = 0; i < listCate.length - 1; i++){
    for (var j = i + 1; j < listCate.length; j++){
      if (listCate[i].Number < listCate[j].Number){
        var temp = listCate[i];
        listCate[i] = listCate[j];
        listCate[j] = temp;
      }
    }
  }
  // Lấy top 10 tỉnh
  if (listCate.length > 10) listCate.length = 10;

  res.render("vwShow/vwArticles/detailArticle", {
    listCateSub,
    detailsPost: detailsPost[0],
    listCate,
    listArticle,
    listComment
  });
});

//Các tỉnh thành
router.get("/category", async function (req, res) {
  const getId = req.query.id;
  const [
    listCateSub,
    listCate,
    listCateNumber,
    listArticle
  ] = await Promise.all([
    categoryModel.allSubCate(),
    categoryModel.allCate(),
    categoryModel.allCateNumber(),
    articleModel.singleWithCategory(getId)
  ]);

  listCate.forEach(function(item){
    var flag = -1;
    for (var i = 0; i < listCateNumber.length; i++){
      if (item.IDCategory === listCateNumber[i].IDCategory){
        flag = i;
      }
    }
    if (flag === -1){
      item.Number = 0;
    }
    else{
      item.Number = listCateNumber[flag].Number;
    }
  });

  listCate.forEach(function(item, index){
    if (item.IDCategory == getId)
    {
      item.active = true;
    }
  });

  res.render("vwShow/vwArticles/listArticle", {
    listCateSub,
    listCate,
    listArticle
  });
});

// Các địa điểm
router.get("/place", async function (req, res) {
  const getId = req.query.id;

  const [
    listCateSub,
    subCate,
    listArticle
  ] = await Promise.all([
    categoryModel.allSubCate(),
    categoryModel.SingleSubCate(getId),
    articleModel.singleWithSubCategory(getId)
  ]);

  res.render("vwShow/vwArticles/listCateSub", {
    listCateSub,
    subCate: subCate[0],
    listArticle
  });
});


// Tìm kiếm
router.get("/search-location", async function (req, res) {
  const text = req.query.text;

  const [
    listCateSub,
    listArticle
  ] = await Promise.all([
    categoryModel.allSubCate(),
    articleModel.allWithSearch(text)
  ]);


  res.render("vwShow/vwArticles/search", {
    listCateSub,
    text,
    listArticle
  });
});



////////////////////////////////
router.post("/getMore", async function (req, res) {
  let data = req.body.data;
  data.current = parseInt(data.current);
  let getArticles = await articleModel.newTime(data.current, data.limit);
  res.send(getArticles);
});

router.post("/getMoreCate", async function (req, res) {
  let data = req.body.data;
  data.current = parseInt(data.current);
  let getArticles = await articleModel.ArticleWithIdCate(
    data.id,
    data.current,
    data.limit
  );
  res.send(getArticles);
});

router.post("/getMoreSubCate", async function (req, res) {
  let data = req.body.data;
  data.current = parseInt(data.current);
  let getArticles = await articleModel.ArticleWithIdSubCate(
    data.id,
    data.current,
    data.limit
  );
  res.send(getArticles);
});

router.post("/getMoreTag", async function (req, res) {
  let data = req.body.data;
  data.current = parseInt(data.current);
  let getArticles = await articleModel.ArticleWithIdTag(
    data.id,
    data.current,
    data.limit
  );
  res.send(getArticles);
});

router.get("/home", async function (req, res) {
  res.redirect("/");
});

router.get(`/login`, async function (req, res) {
  let notification = "";
  
  if(req.query.status == 'false'){
    notification = "Username or Password was wrong";
  }

  const [
    listCateSub
  ] = await Promise.all([
    categoryModel.allSubCate(),
  ]);

  res.render("vwShow/login", {
    notificationLogin : notification,
    listCateSub
  });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }

    const url = req.query.retURL || "/";

    if (!user) {     
      return res.redirect('/login?retURL=' + url + '&status=false');
     }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      req.session.isAuthenticated = true;
      req.session.userId = req.session.passport.user.TypeName;

      return res.redirect(url);
    });
  })(req, res, next);
});

// router.post(
//   "/login",
//   passport.authenticate("local", { failureRedirect: "/failureLogin" }),
//   function (req, res) {
//     req.session.isAuthenticated = true;
//     req.session.userId = req.session.passport.user.TypeName;

//     const url = req.query.retURL || "/";
//     res.redirect(url);
//   }
// );

// router.get("/failureLogin", function (req, res) {
//   res.render("vwShow/login", {
//     notificationLogin: "UserName or Password is wrong",
//   });
// });

router.get("/login-facebook", passport.authenticate("facebook"));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  function (req, res) {
    req.session.isAuthenticated = true;
    res.redirect("/");
  }
);

router.post("/logout", function (req, res) {
  req.logout();
  req.session.isAuthenticated = false;
  req.session.userId = null;
  res.redirect(req.headers.referer);
});

async function IsPremium(req) {
  const result = await userModel.SingleUserPremium(req.user.IDUser);
  let type = 0;
  if (result.length != 0) {
    var DateNow = new Date();

    var DateEnd = new Date(result[0].DateEnd);
    if (DateNow > DateEnd) {
      type = 1;
    }
  } else {
    type = 2;
  }
  return type;
}

router.get("/checkPremium", async function (req, res) {
  const result = await IsPremium(req);
  if (result == 1) {
    res.redirect(`/subscriber/extendpremium?retURL=${req.headers.referer}`);
  } else if (result == 2) {
    res.redirect(`/subscriber/registerpremium?retURL=${req.headers.referer}`);
  } else {
    res.redirect(
      `/subscriber/addDurationPremium?retURL=${req.headers.referer}`
    );
  }
});

router.get("/articles/:idPost", async function (req, res) {
  const idPost = +req.params.idPost || 1;
  const success = req.query.success || 0;
  let Post = await articleModel.SingleWithID(idPost);
  var IsUserPremium = false;
  if (Post.IsPremium === 1) {
    if (!req.isAuthenticated()) {
      return res.redirect(`/login?retURL=${req.originalUrl}`);
    } else {
      const result = await premiumUser.Check(req.user.IDUser);
      if (result == 1) {
        return res.redirect(
          `/subscriber/extendpremium?retURL=${req.originalUrl}`
        );
      } else if (result == 2) {
        return res.redirect(
          `/subscriber/registerpremium?retURL=${req.originalUrl}`
        );
      }
      IsUserPremium = true;
    }
  } else {
    if (!req.isAuthenticated()) {
      IsUserPremium = false;
    } else {
      const Check = await userModel.CheckPremiumByID(req.user.IDUser);
      if (Check) {
        IsUserPremium = true;
      }
    }
  }
  const [Tags, Comments, RelatePosts, Author] = await Promise.all([
    tagModel.TagsWithIDpost(idPost),
    commentModel.CommentWithIDpost(idPost),
    articleModel.RelateWithID(idPost),
    userModel.AuthorWithIdArticle(idPost),
  ]);
  const [NumArticlesOfUser, NumOfAllCommentWithAuthor] = await Promise.all([
    articleModel.NumberArticleByIdAuthor(Author.IDUser),
    commentModel.NumOfAllCommentWithIdAuthor(Author.IDUser),
  ]);
  let entity = {
    IDArticle: idPost,
    Views: Post.Views + 1,
  };
  await articleModel.UpViewArticleByID(entity);
  Post.Views += 1;
  res.render("vwShow/vwArticles/detailArticle", {
    Post,
    Tags,
    Comments,
    RelatePosts,
    Author,
    NumArticlesOfUser,
    NumOfAllCommentWithAuthor,
    CommentIsEmpty: Comments.length === 0,
    IsUserPremium,
    success,
  });
});

router.get("/categories/:idCate", async function (req, res) {
  let topic = "Cate";
  const idCate = +req.params.idCate || 1;
  const ListArticle = await articleModel.ArticleWithIdCate(idCate, 0, 5);
  let notificationResult;
  if (ListArticle.length == 0) {
    let CateName = await categoryModel.GetNameByID(idCate);
    notificationResult = `<h4 class='text-danger'>Không có bài báo nào thuộc: ${CateName}</h4>`;
  } else {
    notificationResult = `<h4 class='text-success'>Categories: ${ListArticle[0].CategoryName}</h4>`;
  }
  let id = idCate;
  res.render("vwShow/vwArticles/listArticle", {
    ListArticle,
    topic,
    id,
    notificationResult,
    listEmpty: ListArticle.length === 0,
  });
});

router.get("/subcategories/:idSubCate", async function (req, res) {
  let topic = "SubCate";
  const idSubCate = +req.params.idSubCate || 1;
  const ListArticle = await articleModel.ArticleWithIdSubCate(idSubCate, 0, 5);
  let notificationResult;
  if (ListArticle.length == 0) {
    let SubCateName = await categoryModel.GetNameByIDSub(idSubCate);
    notificationResult = `<h4 class='text-danger'>Không có bài báo nào thuộc: ${SubCateName} </h4>`;
  } else {
    notificationResult = `<h4 class='text-success'>Subcategory Name:  ${ListArticle[0].SubCategoryName}</h4>`;
  }
  let id = idSubCate;
  res.render("vwShow/vwArticles/listArticle", {
    ListArticle,
    topic,
    id,
    notificationResult,
    listEmpty: ListArticle.length === 0,
  });
});

router.get("/tag/:idTag", async function (req, res) {
  let topic = "Tag";
  const idTag = +req.params.idTag || 1;
  const ListArticle = await articleModel.ArticleWithIdTag(idTag, 0, 5);
  let id = idTag;
  let notificationResult = `<h4 class='text-success'>Tag: ${ListArticle[0].TagName}</h4>`;
  res.render("vwShow/vwArticles/listArticle", {
    ListArticle,
    topic,
    id,
    notificationResult,
    listEmpty: ListArticle.length === 0,
  });
});

router.get("/search", async function (req, res) {
  const textSearch = req.query.search;
  const ListArticle = await articleModel.ArticleWithFullTextSearch(textSearch);
  let notificationResult;
  if (ListArticle.length == 0) {
    notificationResult = `<h4 class='text-danger'>Không có bài báo nào thuộc: ${textSearch}</h4>`;
  } else {
    notificationResult = `<h4 class='text-success'>Search: ${textSearch}</h4>`;
  }

  res.render("vwShow/vwArticles/listArticle", {
    ListArticle,
    notificationResult,
  });
});

router.get("/register", async function (req, res) {
  res.render("vwShow/vwSubscriber/register");
});

router.post("/register", async function (req, res) {
  const user = await userModel.singleByUserName(req.body.UserName);
  if (user) {
    return res.render("vwShow/vwSubscriber/register", { isExistUser: true });
  } else {
    const DOB = moment(req.body.DOB, "DD/MM/YYYY").format("YYYY-MM-DD");
    const password_hash = bcryptjs.hashSync(
      req.body.Password,
      config.authentication.saltRounds
    );

    let isRegister = false;
    const entity = {
      FullName: req.body.FullName,
      Phone: req.body.Phone,
      Email: req.body.Email,
      Address: req.body.Address,
      DOB,
      NickName: "",
      UserName: req.body.UserName,
      Password: password_hash,
      TypeOfUser: 1,
      Status: 1,
      idFacebook: "",
      avatar: "9.jpg",
    };
    const row = await userModel.addSubscriber(entity);
    if (row.affectedRows > 0) isRegister = true;
    res.render("vwShow/vwSubscriber/register", { isRegister: isRegister });
  }
});

router.get("/forgotPassword", async function (req, res) {
  res.render("vwShare/forgotPassword");
});
router.post("/forgotPassword", async function (req, res) {
  let row = await userModel.UserWithEmail(req.body.email);
  let token = bcryptjs.hashSync("bacon", 8);
  if (row) {
    let entity = {
      IDUser: row["IDUser"],
      token: token,
    };
    await userModel.makeTokenWithUser(entity);
    var mailOptions = {
      from: "dantaliian1@gmail.com",
      to: row["Email"],
      subject: "Sending Email using Node.js",
      text:
        "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
        "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
        "http://" +
        req.headers.host +
        "/reset?token=" +
        token +
        "\n\n" +
        "If you did not request this, please ignore this email and your password will remain unchanged.\n",
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.render("vwShare/forgotPassword", {
      Contain: "Please check your email!!",
    });
  } else {
    res.render("vwShare/forgotPassword", {
      notContain: "Email does not exist ",
    });
  }
});

router.get("/reset", async function (req, res) {
  let token = req.query.token;
  let user = await userModel.existsToken(token);
  if (user) {
    res.render("vwShare/resetPassword", { user });
  } else {
    res.render("vwShare/500");
  }
});
router.post("/reset", async function (req, res) {
  const password_hash = bcryptjs.hashSync(
    req.body.password,
    config.authentication.saltRounds
  );
  let entity = {
    Password: password_hash,
    IDUser: req.body.IDUser,
  };
  await userModel.updatePassword(entity);
  await userModel.DeleteTokenWithIDUser(req.body.IDUser);
  res.render("vwShow/login");
});
router.use("/articles", require("./routes-show/article.route"));
router.use("/subscriber", require("./routes-show/subscriber.route"));

module.exports = router;
