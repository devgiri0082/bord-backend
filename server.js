require("dotenv").config();
let express = require("express");
let mongoose = require("mongoose");
// let jwt = require("jsonwebtoken");
let app = express();
let cors = require("cors");
(async () =>
  await mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }))();
//middlewares
app.use(express.json());
app.use(cors());
//importing routers
let authRouter = require("./Routes/authRouter.js");
const checkAuthorization = require("./checkAuthorization.js");
const postRouter = require("./Routes/postRouter");
const followRouter = require("./Routes/FollowRouter");
const refreshRouter = require("./Routes/refreshRouter");
const userRouter = require("./Routes/userRouter");
const checkRefresh = require("./checkRefresh.js");
const UserModel = require("./Model/UserModel.js");
app.use("/auth", authRouter);
app.use("/post", checkAuthorization, postRouter);
app.use("/action", checkAuthorization, followRouter);
app.use("/profile", userRouter);
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.status(200).send("This is working");
});
app.use("/refresh", checkRefresh, refreshRouter);
app.get("/authorize", checkAuthorization, async (req, res) => {
  try {
    let givenUser = await UserModel.findOne(
      { username: req.userInfo.username },
      { username: 1, _id: 1 }
    );
    if (!givenUser) return res.status(400).json({ message: "invalid user" });
    console.log(givenUser);
    res.status(200).json({ message: givenUser });
  } catch (err) {
    console.log(err);
    res.status(500, json({ message: err }));
  }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening to port ${PORT}`));
