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

  encrypt.hash(req.body.password, async(hash) => {

    let result = await db.users.update({
      mobile
    }, {
      $set: {
        password: hash
      }
    });

    if (result && result.ok && result.nModified && result.n) {
      return res.json({
        "new_password": true
      });
    }

    return res.json({
      "new_password": false
    });
  });
});

module.exports = router;
