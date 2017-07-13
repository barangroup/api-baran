//
//
//

require('babel-polyfill');


const express = require('express');
const bodyParser = require('body-parser');

const route_handler = require('./src/routes/handler');

// run test file
require('./src/test');

let app = express();

// app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

route_handler(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
app.use(function(err, req, res, next) {

  let error = {};

  if (err && err.status) {
    error.status = err.status;
  }

  if (err && err.err && err.err.message) {
    error.text = err.err.message;
  }

  res.json(error);
  // throw err.err;
});

module.exports = app;
