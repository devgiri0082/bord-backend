require("dotenv").config();
let express = require("express");
let mongoose = require("mongoose");
let jwt = require("jsonwebtoken");
let app = express();
(async () =>
  await mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }))();
//middlewares
app.use(express.json());

//importing routers
let authRouter = require("./Routes/authRouter.js");
app.use("/auth", authRouter);

const PORT = 3300;
app.listen(PORT, () => console.log(`listening to port ${PORT}`));
