const db = require("../utils/db");

const TBL_category = "cate";
const TBL_sub_category = "sub_categories";
module.exports = {
  allCate: function () {
    return db.load(`
    SELECT IDCategory, CategoryName
    FROM cate 
    WHERE status = 1`);
  },
  allCateNumber: function () {
    return db.load(`
    SELECT c.IDCategory, c.CategoryName, COUNT(c.IDCategory) Number
    FROM cate c, article a
    WHERE c.Status = 1
    and a.Status = 4
    and c.IDCategory = a.IDCate
    GROUP BY c.IDCategory, c.CategoryName
    ORDER BY Number`);
  },

  allSubCate: function () {
    //use show.route.js with get "/" (home header -> Điểm đến)
    return db.load(
      `SELECT IDSubCategory, IDCategory, SubCategoryName 
      FROM sub_categories WHERE status = 1`
    );
  },

  SingleSubCate: function (id) {
    return db.load(
      `
      SELECT s.IDSubCategory, s.SubCategoryName
      FROM sub_categories s
      WHERE s.Status = 1
      AND s.IDSubCategory = ${id}
      `
    );
  },

  ////////////////////
  Load: function () {
    return db.load(
      `select a.IDArticle id,t.TagName from article a join article_tag art on a.IDArticle = art.IDArticle join tags t on art.IDTag = t.IDTag where a.Status = 6`
    );
  },
  LoadCate: function () {
    return db.load(
      `select IDCategory, CategoryName from ${TBL_category} where status = 1`
    );
  },
  LoadSubCate: function () {
    return db.load(
      `select sc.IDSubCategory,sc.IDCategory, sc.SubCategoryName,c.CategoryName from ${TBL_sub_category} sc join ${TBL_category} c on sc.IDCategory = c.IDCategory where sc.Status = 1`
    );
  },
  updateCate: function (entity, condition) {
    condition = {
      IDCategory: condition,
    };
    return db.patch(TBL_category, entity, condition);
  },
  updateSubCate: function (entity, condition) {
    condition = {
      IDSubCategory: condition,
    };
    return db.patch(TBL_sub_category, entity, condition);
  },
  InsertCate: function (entity) {
    return db.add(TBL_category, entity);
  },
  InsertSubCate: function (entity) {
    return db.add(TBL_sub_category, entity);
  },
  SingleCate: function (id) {
    return db.load(
      `select IDCategory, CategoryName from ${TBL_category} where status = 1 and IDCategory=${id}`
    );
  },

  GetNameByID:async function(id){  
      const result = await db.load(`SELECT CategoryName FROM ${TBL_category} WHERE IDCategory = ${id}`);
      return result[0].CategoryName;
  },
  GetNameByIDSub: async function(id){  
    const result = await db.load(`SELECT SubCategoryName FROM ${TBL_sub_category} WHERE IDSubCategory = ${id}`);
    return result[0].SubCategoryName;
  },

  // loadSubCateByIDcate: function (idCate) {
  //   return db.load(
  //     `SELECT IDSubCategory, IDCategory, SubCategoryName FROM sub_categories WHERE status = 1 and IDCategory = ${idCate}`
  //   );
};
