require("dotenv").config();
let express = require("express");
let mongoose = require("mongoose");
let jwt = require("jsonwebtoken");
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
app.use("/auth", authRouter);
app.get("/", (req, res) => {
  res.status(200).send("Hello world");
});
const PORT = process.env.PORT || 3300;
app.listen(PORT, () => console.log(`listening to port ${PORT}`));
