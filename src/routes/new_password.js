//
//
//

import express from 'express';
import db_encrypt from 'db_encrypt';
import encrypt from 'encrypt';

const router = express.Router();

import db from 'db';


router.post('/api/v1/new_password', async function(req, res, next) {

  if (!req.body.mobile || !req.body.password) {
    return next({
      status: 400,
      err: new Error('low args')
    });
  }

  let mobile = db_encrypt.encrypt(req.body.mobile);

  console.log(mobile);

  encrypt.hash(req.body.password, async(password) => {

    console.log(password);

    let result = await db.users.update({
      mobile
    }, {
      $set: {
        password: password
      }
    });


    // if (result) {
    res.json(result);
  });

  // return res.json({
  // exists: true
  // });
  // }

  // return res.json({
  // exists: false
  // });
});

module.exports = router;
