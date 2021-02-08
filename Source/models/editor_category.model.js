const db = require("../utils/db");

const TBL_editor_categories = "editor_categories";

module.exports = {
  add_editor_categories: function(entity)
  {
      return db.add(TBL_editor_categories, entity);
  },
  list_editor_categories: function(id)
  {
      return db.load(`select * from ${TBL_editor_categories} where IDUser = ${id}`);
  },
  delete_editor_categories_by_id: function(id)
  {
    const condition = {
      IDUser: id
    }
      return db.del(TBL_editor_categories,condition);
  },
  singleByID: async function (id) {
    return db.load(
      `select IDCategory from ${TBL_editor_categories} where IDUser = '${id}'`
    );
  },
}