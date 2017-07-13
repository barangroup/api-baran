//
//
//
const dirs = require('require-dir')('./');

module.exports = function(app) {


  app.use(dirs['_auth']);

  // load all files (routers) in this folder
  for (let index in dirs) {

    // if first char was not _
    if (index.indexOf('_') != 0) {
      app.use('/', dirs[index]);
    }
  }
};
