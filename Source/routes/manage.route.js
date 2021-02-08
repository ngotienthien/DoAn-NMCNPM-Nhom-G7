const express = require("express");
const router = express.Router();
const acl = require('../utils/acl');



router.use(function (req, res, next) {
  req.app.locals.layout = "manage"; // set your layout here
  next(); // pass control to the next handler
});

router.get("/", function (req, res) {
  res.render("vwManage/dashboard");
});

// router.get("/profile", function (req, res) {
//   res.redirect("/share/updateProfile");
// });

// router.get("/changePassword", function(req, res){
//   res.redirect("/share/updateProfile?id=nav-password");
// });

router.get("/logout", function(req, res){
  res.redirect("/logout");
});
// router.get("/add", function (req, res) {
//   res.render("vwManage/template/add");
// });
router.use("/articles", acl.middleware(2), require("./routes-manage/article.route"));
router.use("/categories", acl.middleware(2), require("./routes-manage/category.route"));
router.use("/tags", acl.middleware(2), require("./routes-manage/tag.route"));
router.use("/users", acl.middleware(2), require("./routes-manage/user.route"));

module.exports = router;
