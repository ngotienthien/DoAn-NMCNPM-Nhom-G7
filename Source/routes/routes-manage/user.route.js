const express = require('express');
const ModelUser = require("../../models/user.model");
const ModelEditorCate = require("../../models/editor_category.model");
const ModelCate = require("../../models/category.model");
const { list_editor_categories } = require('../../models/editor_category.model');
const config = require("../../config/default.json");
const router = express.Router();
const moment = require("moment")


router.get('/list', async function (req, res) {
    let listUser = await ModelUser.SelectAll()
    let success = ""
    if (req.query.success)
    {
        success = 'Success !!!'
    }
    
    res.render("vwManage/vwUsers/list",{listUser,success});
})

router.get('/add', async function (req, res) {
    let listTypeOfUser = await ModelUser.SelectTypeOfUser()
    res.render("vwManage/vwUsers/add",{listTypeOfUser});
})

router.post('/add', async function (req, res) {
    const obj = {
        fullname: req.body.fullname,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        DOB: req.body.DOBirth,
        phone: req.body.phone,
        address:req.body.address,
        typeofuser: req.body.typeofuser,       
        status: 1
    }
    await ModelUser.AddUser(obj)
    res.redirect("/manage/users/list?success=1");
})
router.post('/edit', async function (req, res) {
    const obj = {
        fullname: req.body.fullname,
        email: req.body.email,
        DOB: req.body.DOBirth,
        phone: req.body.phone,
        address:req.body.address,
        typeofuser: req.body.typeofuser
    }
    await ModelUser.updateUser(obj,req.body.IDUser)
    res.redirect("/manage/users/list?success=1");
})

router.get('/edit', async function (req, res) {
    let user = await ModelUser.SingleUser(req.query.id)
    user = user[0]
    let listTypeOfUser = await ModelUser.SelectTypeOfUser()
    res.render("vwManage/vwUsers/edit",{user,listTypeOfUser});
})

router.post('/delete', async function (req, res) {
  const obj = {
    Status: 2
  } 
  await ModelUser.updateUser(obj,req.query.id)
  res.redirect("/manage/users/list?success=1")
})


router.post("/checkUserName", async function (req, res) {
  const user = await ModelUser.singleByUserName(req.body.UserName);

  if (!user) {
    return res.status(200).send(false);
  }

  return res.status(200).send(true);
});
router.get('/editor', async function (req, res) {
    const list_editor_cate = await ModelEditorCate.list_editor_categories(req.query.id)
    const editor = await ModelUser.singleByID(req.query.id)
    const list_cate = await ModelCate.allCate()
    let isOkay = true;
    if(list_editor_cate.length == 0)
    {
      isOkay = false;
    }
    res.render("vwManage/vwUsers/assignEditor",{list_editor_cate,editor,list_cate, isOkay});
})

router.post('/editor', async function (req, res) {
  const list_editor_cate = await ModelEditorCate.list_editor_categories(req.body.IDUser)
  if(list_editor_cate.length != 0)
  {
    await ModelEditorCate.delete_editor_categories_by_id(req.body.IDUser)
  }
  const list_add_editor_cate = req.body.IDCate
  if (typeof list_add_editor_cate == 'undefined')
  {
  }
  else if(typeof list_add_editor_cate == 'string')
  {
    let obj = {
      IDUser: req.body.IDUser,
      IDCategory: list_add_editor_cate
    }
    await ModelEditorCate.add_editor_categories(obj)
  }
  else
  {
    list_add_editor_cate.forEach(async function(element) {
      let obj = {
        IDUser: req.body.IDUser,
        IDCategory: element
      }
    await ModelEditorCate.add_editor_categories(obj)
    })
  }
  res.redirect("/manage/users/list?success=1")
})

router.post('/registerpremium', async function (req, res) {
  const result = await ModelUser.SingleUserPremium(req.query.IDUser);
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
  var DateEnd = new Date();
    DateEnd =  moment(DateEnd).add(config.premium.timeout, 'minutes');
    DateEnd = moment(DateEnd).format("YYYY-MM-DD HH:mm:ss");
  const entity = {
    IDUser: req.query.IDUser,
    DateEnd
  }
  if(type == 2)
  {
    await ModelUser.AddNewUserPremium(entity);
    res.redirect("/manage/users/list?success=9")
  }
  else if(type == 1)
  {
    await ModelUser.UpdateUserPremium(entity);
    res.redirect("/manage/users/list?success=9")
  }
  else{
    await ModelUser.addDurationPremium(req.query.IDUser);
    res.redirect("/manage/users/list?success=9")
  }
  res.redirect("/manage/users/list")
})
module.exports = router;