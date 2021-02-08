const express = require("express");
const config = require("../config/default.json");
const bcryptjs = require("bcryptjs");
const restrict = require("../middlewares/auth.mdw");
const userModel = require("../models/user.model");
const moment = require("moment");
const router = express.Router();

const arrPosition = ["", "Subscriber", "Writer", "Editor", "Admin"];

router.use(function (req, res, next) {
  req.app.locals.layout = "show"; // set your layout here
  next(); // pass control to the next handler
});

router.get("/showProfile", async function (req, res) {
  res.render("vwShare/showProfile");
});

router.get("/updateProfile", restrict, async function (req, res) {
  let notificationPassword = req.query.notificationPassword;
  let notificationProfileUpdated = req.query.notificationProfileUpdated;
  let notificationOldPassword = req.query.notificationOldPassword;
  let notificationConfirmPassword = req.query.notificationConfirmPassword;
  let notificationPasswordUpdated = req.query.notificationPasswordUpdated;

  const infoUser = await userModel.infoUserByID(req.user.IDUser);

  infoUser.Position = arrPosition[infoUser.TypeOfUser];

  if (infoUser.TypeOfUser === 2) infoUser.isWriter = true;
  res.render("vwShare/updateProfile", {
    infoUser,
    notificationPassword,
    notificationProfileUpdated,
    notificationOldPassword,
    notificationConfirmPassword,
    notificationPasswordUpdated,
  });
});

router.post("/updateProfile", restrict, async function (req, res) {
  const user = await userModel.singleByUserName(req.user.UserName);
  let notificationPassword = "";
  let notificationProfileUpdated = "";

  const rs = bcryptjs.compareSync(req.body.Password, user.Password);

  if (!rs) {
    notificationPassword = "Password was wrong";
    notificationProfileUpdated =
      "<h2 class='text-danger'>Update is not successful</h2>";
  } else {
    const DOB = moment(req.body.DOB, "DD/MM/YYYY").format("YYYY-MM-DD");

    const entity = {
      FullName: req.body.FullName,
      NickName: req.body.NickName,
      Email: req.body.Email,
      DOB,
      IDUser: req.user.IDUser,
      Phone: req.body.Phone,
      Address: req.body.Address
    };

    const row = await userModel.updateInfoUser(entity);

    if (row.affectedRows < 1)
      notificationProfileUpdated =
        "<h2 class='text-danger'>Update is not successful</h2>";
    else
      notificationProfileUpdated =
        "<h2 class='text-success'>Update is successful</h2>";
  }

  const infoUser = await userModel.infoUserByID(req.user.IDUser);
  infoUser.Position = arrPosition[infoUser.TypeOfUser];

  // res.render("vwShare/updateProfile", {
  //     infoUser,
  //     notificationPassword,
  //     notificationProfileUpdated,
  // });

  res.redirect(
    `/updateProfile/?id=nav-profile&notificationPassword=${notificationPassword}&notificationProfileUpdated=${notificationProfileUpdated}`
  );
});

router.get("/updatePassword", restrict, async function (req, res) {
  res.render("vwShare/updatePassword");
});

router.post("/updatePassword", restrict, async function (req, res) {
  let notificationOldPassword = "";
  let notificationConfirmPassword = "";
  let notificationPasswordUpdated = "";

  const user = await userModel.singleByUserName(req.user.UserName);

  const rs = bcryptjs.compareSync(req.body.OldPassword, user.Password);

  if (!rs) {
    notificationOldPassword = "Password was wrong";
    notificationPasswordUpdated =
      "<h2 class='text-danger'>Update is not successful</h2>";
  } else if (req.body.NewPassword != req.body.ConfirmPassword) {
    notificationConfirmPassword =
      "New Password and Confirm Password is not like";
    notificationPasswordUpdated =
      "<h2 class='text-danger'>Update is not successful</h2>";
  } else {
    const password_hash = bcryptjs.hashSync(
      req.body.NewPassword,
      config.authentication.saltRounds
    );
    const entity = {
      Password: password_hash,
      IDUser: req.user.IDUser,
    };

    const row = await userModel.updatePasswordUser(entity);

    if (row.affectedRows < 1)
      notificationPasswordUpdated =
        "<h2 class='text-danger'>Update is not successful</h2>";
    else
      notificationPasswordUpdated =
        "<h2 class='text-success'>Update is successful</h2>";
  }

  // res.render("vwShare/updateProfile",{
  //     notificationOldPassword,
  //     notificationConfirmPassword,
  //     notificationPasswordUpdated
  // });

  res.redirect(
    `/updateProfile/?id=nav-password&notificationOldPassword=${notificationOldPassword}&notificationConfirmPassword=${notificationConfirmPassword}&notificationPasswordUpdated=${notificationPasswordUpdated}`
  );
});

router.get("/forgottenPassword", async function (req, res) {
  res.render("vwShare/forgottenPassword");
});

router.get("/updatePassword", async function (req, res) {
  res.render("vwShare/updatePassword");
});

module.exports = router;
