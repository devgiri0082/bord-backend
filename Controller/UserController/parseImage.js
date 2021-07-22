const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "static/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const multiPart = multer({ storage: storage });
module.exports = multiPart;
