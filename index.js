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
const checkRefresh = require("./checkRefresh.js");
app.use("/auth", authRouter);
app.use("/post", checkAuthorization, postRouter);
app.use("/action", checkAuthorization, followRouter);
app.get("/", (req, res) => {
  res.status(200).send("Hello world");
});
app.use("/refresh", checkRefresh, refreshRouter);
app.use("/authorize", checkAuthorization, (req, res) => {
  res.status(200).json({ message: req.userInfo });
});
const PORT = process.env.PORT || 3300;
app.listen(PORT, () => console.log(`listening to port ${PORT}`));
