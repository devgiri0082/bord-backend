let jwt = require("jsonwebtoken");
const checkAuthorization = (req, res, next) => {
  let header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: "invalid token" });
  let token = header.split(" ")[1];
  if (!token) {
    return res.status(400).json({ message: "invalid token" });
  } else {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
      if (err) {
        console.log("bad jwt afdafdku", err);
        return res.status(400).json({ message: "invalid token" });
      }
      req.userInfo = decoded;
      next();
    });
  }
};
module.exports = checkAuthorization;
