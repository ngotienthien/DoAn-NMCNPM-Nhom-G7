const exphbs = require("express-handlebars");
const hbs_sections = require("express-handlebars-sections");
const numeral = require("numeral");
const moment = require("moment");
module.exports = function (app) {
  app.engine(
    "hbs",
    exphbs({
      layoutsDir: "views/_layouts",
      defaultLayout: false,
      partialsDir: "views/_partials",
      extname: ".hbs",
      helpers: {
        section: hbs_sections(),
        format_number: function (value) {
          return numeral(value).format("0,0");
        },
        compare_id: function (value1, value2, options) {
          return value1 == value2 ? options.fn(this) : options.inverse(this);
        },
        format_date_time: function (value) {
          return moment(value,'YYYY-MM-DD HH:mm:ss').format("DD/MM/YYYY HH:mm:ss");
        },
        format_date_pass: function (value) {
          return moment(value).format("YYYY-MM-DD");
        },
        format_date: function (value) {
          return moment(value).format("DD/MM/YYYY HH-mm-ss");
        },
        compare: function (value1, value2, options) {
          return value1 == value2
            ? '<p class="badge badge-danger">' + value1 + "</p>"
            : '<p class="badge badge-info">' + value1 + "</p>";
        },
      },
    })
  );
  app.set("view engine", "hbs");
};
