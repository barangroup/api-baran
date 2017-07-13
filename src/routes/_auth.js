//
//
//

import jwt from 'jwt';

let no_auth_urls = [
  '/'
];

module.exports = auth;

function auth(req, res, next) {


  let url = req.url;

  if (no_auth_urls.indexOf(url) != -1) {
    return next();
  }

  if (!req.body.token) {
    return next({
      status: 403,
      err: new Error('no token')
    });
  }

  if (global.config.tokens.indexOf(req.body.token) == -1) {
    return next({
      status: 403,
      err: new Error('token invalid')
    });
  }

  return next();
}
