//
//
//

import express from 'express';
import {
  encrypt
} from 'db_encrypt';

const router = express.Router();

import db from 'db';


router.post('/api/v1/exists', async function(req, res, next) {

  if (!req.body.mobile) {
    return next({
      status: 400,
      err: new Error('low args')
    });
  }

  let mobile = encrypt(req.body.mobile);

  console.log(mobile);

  let user = await db.users.findOne({
    mobile
  }, {
    _id: true
  });



  if (user && user._id) {
    return res.json({
      exists: true
    });
  }

  return res.json({
    exists: false
  });
});

module.exports = router;
