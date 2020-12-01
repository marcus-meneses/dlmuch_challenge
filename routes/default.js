'use strict';
const express = require('express');
const router = express.Router();
const Broker = require('../classes/Broker');

/*
according to the challenge specifications, the implementation of the API
must be in the root route of the path <host>/recipes. This router must be
instantiated in the main js file as "recipes" route, however, all the
request and data handling logic is implemented as a broker object
*/

router.get('/', async(req, res) => {
  const broker = new Broker(req);

  try {
    let returnData = await broker.run();
    res.json(returnData);
  } catch (err) {
    // console.log(err);
    res.status(500).json({message: err.message });
  }
});

module.exports = router;
