const ModelArticle = require("../../models/article.model");
const ModelCategory = require("../../models/category.model");
const ModelTag = require("../../models/tag.model");
const ModelCensorship = require("../../models/censorship.model");
const ModelEditorCate = require("../../models/editor_category.model");
const express = require("express");
const upload = require("../../utils/uploadMiddleware");
const Resize = require("../../utils/resize");
const path = require("path");
const { filename } = require("../../utils/resize");
const { none } = require("../../utils/uploadMiddleware");
const moment = require("moment")
const router = express.Router();
const acl = require("../../utils/acl");

function filter(List,list_Editor_Cate)
{
  let temp = []
  if(list_Editor_Cate != null)
  {
    List.forEach(element => {
      let index = list_Editor_Cate.filter(e => e.IDCategory == element.IDCate).length
      if(index > 0)
        {
          temp.push(element)
        }
    });
  }
  List = temp
  return List
}

function filter_writer(List,id)
{
  let temp = []
  List.forEach(element => {
    if(element.Writter == id)
      {
        temp.push(element)
      }
  });
  List = temp
  return List
}

router.get("/", function (req, res) {
  res.render("vwManage/vwArticles/listDraft");
});

router.get("/listdraft", acl.middleware(3), async function (req, res) {

  let ListDraft = await ModelArticle.ListDraft();
  let ListDraftCategory = await ModelArticle.ListDraftCategory();
  let ListDraftTag = await ModelArticle.ListDraftTag();
  
  if(req.user.TypeName == 'editor')
  {
    let Editor_Cate = await ModelEditorCate.singleByID(req.user.IDUser)
    ListDraft = filter(ListDraft,Editor_Cate)
  }
  else if(req.user.TypeName == 'writer')
  {
    ListDraft = filter_writer(ListDraft,req.user.IDUser)
  }
  let success = ""
  if (req.query.success)
  {
    success = 'Success !!!'
  }
  if (req.query.success == '3')
  {
    success = 'Approve Success !!!'
  }
  res.render("vwManage/vwArticles/listDraft", {
    ListDraft,
    ListDraftCategory,
    ListDraftTag,
    success
  });
});


router.get("/listdenied", acl.middleware(3), async function (req, res) {
  let ListDenied  = await ModelArticle.ListDenied();
  let success = ""
  if (req.query.success)
  {
    success = 'Success !!!'
  }
  if(req.user.TypeName == 'editor')
  {
    let Editor_Cate = await ModelEditorCate.singleByID(req.user.IDUser)
    ListDenied = filter(ListDenied,Editor_Cate)
  }
  else if(req.user.TypeName == 'writer')
  {
    ListDenied = filter_writer(ListDenied,req.user.IDUser)
  }
  if (req.query.success == '3')
  {
    success = 'Approve Success !!!'
  }
  res.render("vwManage/vwArticles/listDenied", {
    ListDenied,
    success
  });
});

router.get("/listpublished", acl.middleware(3), async function (req, res) {
  let ListPublished = await ModelArticle.ListPublished();
  if(req.user.TypeName == 'editor')
  {
    let Editor_Cate = await ModelEditorCate.singleByID(req.user.IDUser)
    ListPublished = filter(ListPublished,Editor_Cate)
  }
  else if(req.user.TypeName == 'writer')
  {
    ListPublished = filter_writer(ListPublished,req.user.IDUser)
  }
  res.render("vwManage/vwArticles/listPublished", { ListPublished });
});

router.get("/listapproved", acl.middleware(3), async function (req, res) {
  let ListApproved = await ModelArticle.ListApproved();
  if(req.user.TypeName == 'editor')
  {
    let Editor_Cate = await ModelEditorCate.singleByID(req.user.IDUser)
    ListApproved = filter(ListApproved,Editor_Cate)
  }
  else if(req.user.TypeName == 'writer')
  {
    ListApproved = filter_writer(ListApproved,req.user.IDUser)
  }
  res.render("vwManage/vwArticles/ListApproved", { ListApproved });
});

router.get("/write", acl.middleware(3), async function (req, res) {
  let listCate = await ModelCategory.LoadCate();
  let listSubCate = await ModelCategory.LoadSubCate();
  res.render("vwManage/vwArticles/write",{listCate,listSubCate});
});


router.get("/edit", acl.middleware(3), async function (req, res) {
  let listCate = await ModelCategory.LoadCate();
  let listSubCate = await ModelCategory.LoadSubCate();
  let article = await ModelArticle.single(req.query.id)
  article = article[0]
  let articleWithTag = await ModelArticle.singleWithTag(req.query.id)
  res.render("vwManage/vwArticles/edit",{article,listCate,listSubCate,articleWithTag});
});

router.post("/edit", acl.middleware(3), upload.single("image"), async function (req, res) {
  //Handing file image and upload file
  const imagePath = path.join(__dirname, "../../public/images");
  const fileUpload = new Resize(imagePath);
    //filename is URL of IMG
  const URLofIMG = await fileUpload.save(req.file.buffer);
    //insert Article into table Article
    const idCate = await ModelCategory.SingleSubCate(req.body.sub_category)
  const obj = {
    Title: req.body.title,
    Content: req.body.FullDes,
    Abstract: req.body.abstract,
    Writter: req.user.IDUser,
    IsPremium: req.body.Pre || 0 ,
    Status: 6,
    Views: 0,
    Ranks: 0,
    IDCate: idCate[0].IDCategory,
    IDSubCategory: req.body.sub_category,
    Avatar: URLofIMG,
    BigAvatar: URLofIMG
  };
  await ModelArticle.updateArticle(obj,req.body.id)
  await ModelArticle.deleteArticleTag(req.body.id)

  req.body.tag = req.body.tag.split(',');

  
  const AllTag = await ModelTag.SelectAll()
  for (let index = 0; index < req.body.tag.length; index++) {
    const element = req.body.tag[index].toLowerCase()
    let IDelement = 0

    for (let index = 0; index < AllTag.length; index++) {
      const el = AllTag[index]
      if(el.TagName === element)
      {
        IDelement = el.IDTag
        break
      }
    }
    if(IDelement == 0)
    {
      const objT = {
        TagName: element.toLowerCase()
      }
      await ModelTag.Add(objT)
      IDelement = await ModelTag.IDSingleLast()
      IDelement = IDelement[0].IDTag
    }
    const objAWT = {
      IDArticle: req.body.id,
      IDTag: IDelement
    }
    await ModelArticle.addArticleWithTag(objAWT)
  }
  res.redirect("/manage/articles/listdraft?success=1")
});

router.post("/write", acl.middleware(3), upload.single("image"), async function (req, res) {
  //Handing file image and upload file
  const imagePath = path.join(__dirname, "../../public/images");
  const fileUpload = new Resize(imagePath);
  const URLofIMG = await fileUpload.save(req.file.buffer);
    //filename is URL of IMG
   const idCate = await ModelCategory.SingleSubCate(req.body.sub_category)
    
   const obj = {
    Title: req.body.title,
    Content: req.body.FullDes,
    Abstract: req.body.abstract,
    Writter: req.user.IDUser,
    IsPremium: req.body.Pre || 0 ,
    Status: 6,
    Views: 0,
    Ranks: 0,
    IDCate: idCate[0].IDCategory,
    IDSubCategory: req.body.sub_category,
    Avatar: URLofIMG,
    BigAvatar: URLofIMG
  };
  const add = await ModelArticle.add(obj)
//insert Article into table Article
  
  const AllTag = await ModelTag.SelectAll()
  const id = await ModelArticle.IDSingleLast()
  let tags = req.body.tag
  // if(typeof req.body.tag == 'string')
  // {
          
  // }

  tags = tags.split(',');
  
  for (let index = 0; index < tags.length; index++) {
    const element = tags[index].toLowerCase()
    let IDelement = 0

    for (let index = 0; index < AllTag.length; index++) {
      const el = AllTag[index]
      if(el.TagName === element)
      {
        IDelement = el.IDTag
        break
      }
    }
    if(IDelement == 0)
    {
      const objT = {
        TagName: element.toLowerCase()
      }
      await ModelTag.Add(objT)
      IDelement = await ModelTag.IDSingleLast()
      IDelement = IDelement[0].IDTag
    }
    const objAWT = {
      IDArticle: id[0].IDArticle,
      IDTag: IDelement
    }
    await ModelArticle.addArticleWithTag(objAWT)
  }
  res.redirect("/manage/articles/listdraft?success=1")
});

router.post("/delete", acl.middleware(3), async function (req, res) {
  const obj = {
    Status: 2
  } 
  await ModelArticle.updateArticle(obj,req.query.id)
  res.redirect("/manage/articles/listdraft?success=1")
})

// router.get("/detail", function (req, res) {
//   res.render("vwManage/vwArticles/detail");
// });

router.post("/publish", acl.middleware(3), async function (req, res) {
  let d = new Date()
  let id = req.user.IDUser
  d = moment(d).format('YYYY-MM-DD HH-mm-ss')
  let status = req.body.status
  if(status == 3)
  {
    status = 4
  }
  const obj = {
    Status: status,
    TimePublish: moment(req.body.Date + " "+ req.body.Time).format('YYYY-MM-DD HH-mm-ss')
  }
  await ModelArticle.updateArticle(obj,req.body.IDArticle)
  //insert censorship table 
  const obj2 = {
    IDArticle: parseInt(req.body.IDArticle),
    IDUser: id,
    IDStatus: parseInt(status),
    Date:d
  }
  const row = await ModelCensorship.addCensorship(obj2)
    res.redirect("/manage/articles/listdraft?success=3")
});

router.post("/publishNow", acl.middleware(3), async function (req, res) {
  let d = new Date()
  let id = req.user.IDUser
  d = moment(d).format('YYYY-MM-DD HH-mm-ss')
  const obj = {
    Status: req.body.status,
    TimePublish: d
  }
  await ModelArticle.updateArticle(obj,req.body.IDArticle)
  //insert censorship table 
  const obj2 = {
    IDArticle: parseInt(req.body.IDArticle),
    IDUser: id,
    IDStatus: parseInt(req.body.status),
    Date:d
  }
  const row = await ModelCensorship.addCensorship(obj2)
    res.redirect("/manage/articles/listdraft?success=3")
});
router.post("/deny", acl.middleware(3), async function (req, res) {
  let d = new Date()
  let id = req.user.IDUser
  d = moment(d).format('YYYY-MM-DD HH-mm-ss')
  const obj = {
    IDArticle: parseInt(req.body.IDArticle),
    IDUser: id,
    IDStatus: parseInt(req.body.status),
    Date:d,
    Reason: req.body.Reason
  }
  const row = await ModelCensorship.addCensorship(obj)
  //update status table Article
  const obj2 = {
    Status: req.body.status
  }
  await ModelArticle.updateArticle(obj2,req.body.IDArticle)
  res.redirect("/manage/articles/listdraft?success=4")
});
router.get("/details", acl.middleware(3), async function (req, res) {
  let article = await ModelArticle.single(req.query.id)
  article = article[0]
  let articleWithTag = await ModelArticle.singleWithTag(req.query.id)
  res.render("vwManage/vwArticles/detail",{Post: article,Tags: articleWithTag});
});
module.exports = router;
