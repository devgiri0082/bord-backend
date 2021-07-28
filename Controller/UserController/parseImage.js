const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "static/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + req.body.username);
  },
});
const multiPart = multer({ storage: storage });
module.exports = multiPart;
