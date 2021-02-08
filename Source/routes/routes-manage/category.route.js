const express = require("express");
const ModelCategory = require("../../models/category.model");

const router = express.Router();

router.get("/list", async function (req, res) {
  let listCate = await ModelCategory.LoadCate();
  let success = ""
  if (req.query.success)
  {
    success = 'Success !!!'
  }
  res.render("vwManage/vwCategories/list",{listCate,success});
});
router.post("/delete", async function (req, res) {
  const obj = {
    Status: 2
  } 
  await ModelCategory.updateCate(obj,req.query.id)
  res.redirect("/manage/categories/list?success=1");
});

router.get("/add", async function (req, res) {
  res.render("vwManage/vwCategories/add");
});

router.post("/add", async function (req, res) {
  const obj = {
    CategoryName: req.body.CategoryName
  } 
  await ModelCategory.InsertCate(obj);
  res.redirect("/manage/categories/list?success=1");
});

router.get("/edit", async function (req, res) {
  let listCate = await ModelCategory.SingleCate(req.query.id)
  listCate = listCate[0]
  res.render("vwManage/vwCategories/edit",{listCate});
});

router.post("/edit", async function (req, res) {
  const obj = {
    CategoryName: req.body.CategoryName
  } 
  await ModelCategory.UpdateCate(obj,req.body.CategoryID);
  res.redirect("/manage/categories/list?success=1");
});

router.get("/listSub", async function (req, res) {
  let success = ""
  if (req.query.success)
  {
    success = 'Success !!!'
  }
  let listSubCate = await ModelCategory.LoadSubCate();
  res.render("vwManage/vwCategories/listSub",{listSubCate,success});
});
router.post("/deleteSub", async function (req, res) {
  const obj = {
    Status: 2
  } 
  await ModelCategory.updateSubCate(obj,req.query.id)
  res.redirect("/manage/categories/listSub?success=1");
});

router.get("/addSub", async function (req, res) {
  let listCate = await ModelCategory.LoadCate();
  res.render("vwManage/vwCategories/addSub",{listCate});
});

router.post("/addSub", async function (req, res) {
  const obj = {
    IDCategory: req.body.category,
    SubCategoryName: req.body.SubCategoryName
  } 
  await ModelCategory.InsertSubCate(obj);
  res.redirect("/manage/categories/listSub?success=1");
});

router.get("/editSub", async function (req, res) {
  let listSubCate = await ModelCategory.SingleSubCate(req.query.id)
  listSubCate = listSubCate[0]
  let listCate = await ModelCategory.LoadCate();
  res.render("vwManage/vwCategories/editSub",{listSubCate,listCate});
});

router.post("/editSub", async function (req, res) {
  const obj = {
    IDCategory: req.body.category,
    SubCategoryName: req.body.SubCategoryName
  }
  await ModelCategory.updateSubCate(obj,req.body.SubCategoryID);
  res.redirect("/manage/categories/listSub?success=1");
});

module.exports = router;
