// uploadMiddleware.js

const multer = require("multer");

const upload = multer({
  limits: {
    fileSize: 4 * 1024 * 1024,
  },
  
});
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
module.exports = upload;
