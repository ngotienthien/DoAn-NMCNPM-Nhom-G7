/** START import library */

const express = require("express");
const path = require("path");
const passport = require("passport");
const app = express();
const restrict = require("./middlewares/auth.mdw");
const acl = require("./utils/acl");
require("express-async-errors");

/** END import library */

/** START config app */

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/public", express.static("public"));
app.use("/assets", express.static("assets"));

require("./middlewares/session.mdw")(app);
require("./middlewares/view.mdw")(app);
require("./middlewares/locals.mdw")(app);

app.use(passport.initialize());
app.use(passport.session());

/** END config app */

/** START router */

app.use(
  "/manage",
  restrict,
  acl.middleware(1),
  require("./routes/manage.route")
);
app.use("/", require("./routes/show.route"));
app.use("/", require("./routes/share.route"));

//Error
app.use(function (req, res) {
  res.render("vwShare/404", { layout: "show" });
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).render("vwShare/500", { layout: "show" });
});
/** END router */

/** START catch error */
/** END catch error */

/** START Server */
const PORT = 3000;

app.listen(PORT, function () {
  console.log(`Server is running at http://localhost:${PORT}`);
});
/** END Server */
