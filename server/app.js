const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const eventRouter = require(`../routes/event-routes`);
const usertRouter = require(`../routes/user-routes`);
const imgRouter = require(`../routes/img-routes`);
const messageRouter = require(`../routes/message-routes`);
const authenticationRouter = require(`../routes/authentication-routes`);
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const chalk = require('chalk');

const ErrorMsg = chalk.bgWhite.red;
const SuccessMsg = chalk.bgWhite.green;

mongoose
  .connect(process.env.DATA_BASE_URL, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log(SuccessMsg('Connected to the database!')))
  .catch((err) => console.log(ErrorMsg(err.message)));

app.listen(process.env.PORT, err => {
  err ? console.log(ErrorMsg(err)) : console.log(SuccessMsg(`Server started, port:${chalk.red(process.env.PORT)}!`));
});
app.use(morgan(SuccessMsg(':method :url :status :res[content-length] - :response-time ms')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(eventRouter);
app.use(usertRouter);
app.use(authenticationRouter);
app.use(imgRouter);
app.use(messageRouter);