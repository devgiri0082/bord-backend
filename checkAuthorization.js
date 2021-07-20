let jwt = require("jsonwebtoken");
const checkAuthorization = (req, res, next) => {
  let header = req.headers.authorization;
  console.log("checking");
  if (!header)
    return res
      .status(401)
      .json({ message: "authorization token not provided" });
  let token = header.split(" ")[1];
  if (!token) {
    return res
      .status(400)
      .json({ message: "authorization token not provided" });
  } else {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
      if (err) {
        console.log(err);
        return res.status(400).json({ message: "invalid token" });
      }
      req.userInfo = decoded;
      console.log("going to next");
      next();
    });
  }
};
module.exports = checkAuthorization;
