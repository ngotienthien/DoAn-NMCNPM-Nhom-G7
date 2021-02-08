const db = require("../utils/db");

const TBL_censorship = "censorship";

module.exports = {
  addCensorship: function(entity)
  {
      return db.add(TBL_censorship, entity);
  }
}