const LRU = require("lru-cache");
const categoryModel = require("../models/category.model");
const articleModel = require("../models/article.model");
const premiumUser = require("../utils/PremiumUser");
const GLOBAL_CATEGORIES = "globalCategories";
const GLOBAL_SubCATEGORIES = "globalSubCategories";
const GLOBAL_Top3View = "globalTop3View";
const GLOBAL_ListLatest = "globalListLatest";
const cache = new LRU({
  max: 500,
  maxAge: 1000 * 60,
});

module.exports = function (app) {
  app.use(async function (req, res, next) {
    const dataCate = cache.get(GLOBAL_CATEGORIES);
    const dataSubCate = cache.get(GLOBAL_SubCATEGORIES);
    const dataTop3View = cache.get(GLOBAL_Top3View);
    const ListLatest = cache.get(GLOBAL_ListLatest);
    if(!ListLatest){
      const rowsTop3View = await articleModel.Top3Views();
      res.locals.ListLatest = rowsTop3View;
      cache.set(ListLatest, rowsTop3View);
    }
    else{
      res.locals.ListLatest = ListLatest;
    }
    if (!dataCate || !dataSubCate || !dataTop3View) {
      const rowsCate = await categoryModel.allCate();
      const rowsSubCate = await categoryModel.allSubCate();
      const rowsTop3View = await articleModel.Top3Views();
      res.locals.lcCategories = rowsCate;
      res.locals.lcSubCategories = rowsSubCate;
      res.locals.lcTop3View = rowsTop3View;
      cache.set(GLOBAL_CATEGORIES, rowsCate);
      cache.set(GLOBAL_SubCATEGORIES, rowsSubCate);
      cache.set(GLOBAL_Top3View, rowsTop3View);
    } else {
      res.locals.lcCategories = dataCate;
      res.locals.lcSubCategories = dataSubCate;
      res.locals.lcTop3View = dataTop3View;
    }
    if (req.session.isAuthenticated === null) {
      req.session.isAuthenticated = false;
    }
    res.locals.lcIsAuthenticated = req.session.isAuthenticated;
    if (req.session.isAuthenticated === true) {
      res.locals.lcAuthUser = req.session.passport.user;
      if (req.session.passport.user.TypeOfUser != 1)
        res.locals.lcIsManager = true;
      else res.locals.lcIsManager = false;
    }
    res.locals.curURL = req.originalUrl;
    if (req.session.isAuthenticated === true)
    {
      if (await premiumUser.Check(req.session.passport.user.IDUser) == 0)
      {
        res.locals.isUserPremium = true;
      }
      else
      {
        res.locals.isUserPremium = false;
      }
    }
    else
    {
      res.locals.isUserPremium = false;
    }

    next();
  });
};
