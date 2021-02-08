module.exports = function (req, res, next) {
    //console.log(req.isAuthenticated());
    if (!req.isAuthenticated()) {       
      return res.redirect(`/login?retURL=${req.originalUrl}`);
    }
  
    next();
}