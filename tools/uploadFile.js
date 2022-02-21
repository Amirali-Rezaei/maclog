const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const { join, extname } = require("path");

const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, join(__dirname, "../public/uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, `${uuidv4()}${extname(file.originalname)}`);
  },
});

const uploadFile = multer({
  storage: fileStorage,
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb("نوع فایل درست نیست", false);
    }
    cb(null, true);
  },
});

module.exports = uploadFile;
