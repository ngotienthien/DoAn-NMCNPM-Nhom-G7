const express = require("express");
const moment = require("moment");
const config = require("../../config/default.json");
const bcryptjs = require("bcryptjs");
const router = express.Router();
const userModel = require("../../models/user.model");
const restrict = require("../../middlewares/auth.mdw");

router.get("/register", async function (req, res) {
  res.render("vwShow/vwSubscriber/register");
});

router.post("/checkUserName", async function (req, res) {
  const user = await userModel.singleByUserName(req.body.UserName);

  if (!user) {
    return res.status(200).send(false);
  }

  return res.status(200).send(true);
});

router.get("/registerpremium", restrict, async function (req, res) {
  res.render("vwShow/vwSubscriber/registerPremium");
});

router.post("/registerpremium", async function (req, res) {
    let user = req.user.IDUser
    let url = req.query.retURL || '/';
    url = url + "?success=1";
    let checkIsManager = false;
    if (req.query.id){
      user = req.query.id;
      url = '/manage/users/list?success=1';
      checkIsManager = true;
    }
    var DateEnd = new Date();

    DateEnd =  moment(DateEnd).add(config.premium.timeout, 'minutes');
    
    DateEnd = moment(DateEnd).format("YYYY-MM-DD HH:mm:ss");
    
    const entity = {
      IDUser: user,
      DateEnd
    }
    await userModel.AddNewUserPremium(entity);
    if (checkIsManager)
    {
      res.redirect(url);
    }
    else
    {
      let retURL = req.query.retURL || '/';
      res.status(200).send(retURL);
    }
});

router.get("/extendpremium", restrict, async function (req, res) {
  res.render("vwShow/vwSubscriber/extendPremium");
});

router.post("/extendpremium", async function (req, res) {
    var DateEnd = new Date();
    DateEnd =  moment(DateEnd).add(config.premium.timeout, 'minutes');
    DateEnd = moment(DateEnd).format("YYYY-MM-DD HH:mm:ss");
    const entity = {
      IDUser: req.user.IDUser,
      DateEnd
    }
    const row = await userModel.UpdateUserPremium(entity);
    let retURL = req.query.retURL || '/';
    res.status(200).send(retURL);
});

router.get("/addDurationPremium", async function (req, res) {
  res.render("vwShow/vwSubscriber/extendPremium");
});

router.post("/addDurationPremium", async function (req, res) {
  const row = await userModel.addDurationPremium(req.user.IDUser);
  let retURL = req.query.retURL || '/';
    res.status(200).send(retURL);
});

module.exports = router;
