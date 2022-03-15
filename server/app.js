const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const eventRouter = require(`../routes/event-routes`);
const usertRouter = require(`../routes/user-routes`);
const imgRouter = require(`../routes/img-routes`);
const authenticationRouter = require(`../routes/authentication-routes`);
const app = express();
require('dotenv').config();
var bodyParser = require('body-parser');


mongoose
  .connect(process.env.DATA_BASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to the database!'))
  .catch((err) => console.log(err.message));

app.listen(process.env.PORT, err => {
  err ? console.log(err) : console.log(`Server started, port:${process.env.PORT}!`);
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms')); //логер
//app.use(express.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(eventRouter);
app.use(usertRouter);
app.use(authenticationRouter);
app.use(imgRouter);