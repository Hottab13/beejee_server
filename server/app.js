const express = require("express");
const mongoose = require("mongoose");
const chalk = require("chalk");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const eventRouter = require(`../routes/event-routes`);
const usertRouter = require(`../routes/user-routes`);
const authenticationRouter = require(`../routes/authentication-routes`);
const errorsMiddlewares = require(`../middlewares/errors-middlewares`);

const app = express();
const PORT = process.env.PORT || 5000;
const ErrorMsg = chalk.bgWhite.red;
const SuccessMsg = chalk.green;

app.use(express.json());
app.use(cookieParser());

app.use(cors({ credentials: true, origin:[ "http://localhost:3000",`${process.env.CLIENT_URL}`]}));
app.use("/api", eventRouter);
app.use("/api", authenticationRouter);
app.use("/api", usertRouter);
app.use(errorsMiddlewares);

const start = async () => {
  try {
    await mongoose
      .connect(process.env.DATA_BASE_URL, {
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log(SuccessMsg("Connected to the database!")))
      .catch((err) => console.log(ErrorMsg(err.message)));

    app.listen(PORT, (err) => {
      err
        ? console.log(ErrorMsg(err))
        : console.log(SuccessMsg(`Server started, порт:${chalk.red(PORT)}!`));
    });
  } catch (e) {
    console.log(ErrorMsg(e));
  }
};
start();