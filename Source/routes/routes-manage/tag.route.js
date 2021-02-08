const express = require("express");
const ModelTag = require("../../models/tag.model");
const router = express.Router();

router.get("/list", async function (req, res) {
  let success = ""
  if (req.query.success)
  {
    success = 'Success !!!'
  }
  let listTag = await ModelTag.SelectAll();
  res.render("vwManage/vwTags/list", { listTag,success});
});

router.post("/delete", async function (req, res) {
  const obj = {
    Status: 2
  } 
  await ModelTag.updateTag(obj,req.query.id)
  res.redirect("/manage/tags/list?success=1");
});

router.get("/edit", async function (req, res) {
  let listTag = await ModelTag.SingleTag(req.query.id)
  listTag = listTag[0]
  res.render("vwManage/vwTags/edit",{listTag});
});

router.post("/edit", async function (req, res) {
  const obj = {
    TagName: req.body.TagName
  } 
  await ModelTag.updateTag(obj,req.body.TagID);
  res.redirect("/manage/tags/list?success=1");
});
module.exports = router;
