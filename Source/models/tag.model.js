const db = require("../utils/db");
const e = require("express");

const TBL_tags = "tags";
module.exports = {
  SelectAll: function () {
    return db.load(`SELECT IDTag, TagName FROM ${TBL_tags} where status = 1`);
  },
  TagsWithIDpost(idPost){
    return db.load(`SELECT tag.IDTag,tag.TagName
    FROM article_tag artTag JOIN ${TBL_tags} tag ON artTag.IDTag = tag.IDTag
    WHERE artTag.IDArticle = ${idPost}`);
  },
  Add:function(entity){
    return db.add(TBL_tags,entity)
  },
  IDSingleLast: function () {
    return db.load(`select a.IDTag from ${TBL_tags} a where a.status = 1 ORDER BY a.IDTag DESC LIMIT 1`);
  },
  
  updateTag:function(entity,condition){
    condition = {
      IDTag:condition
    }
    return db.patch(TBL_tags,entity,condition)
  },
  SingleTag: function (id) {
    return db.load(`select a.IDTag,a.TagName from ${TBL_tags} a where a.status = 1 and a.IDTag = ${id}`);
  },
  IDSingleLast11: function () {
    return db.load(`select a.IDTag from ${TBL_tags} a ORDER BY a.IDTag DESC LIMIT 1`);
  },
  GetNameByID: async function(id){
    const result = await db.load(`SELECT TagName FROM ${TBL_tags} WHERE IDTag = ${id}`);
    return result[0].TagName;
  }
};
