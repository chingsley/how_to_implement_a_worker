const express = require('express');

const {
  fetchAllFailedAccounts
} = require('../controllers/failedAccounts');

const allFailedTrasmissions = require('../database/failedTransmissions');

const router = express();

router.get('/failedAccounts', fetchAllFailedAccounts);

router.post('/retransmit',  (req, res) => {
  try {
    allFailedTrasmissions.push(req.body);
    return res.status(201).json({ allFailedTrasmissions });
  } catch(error) {
    console.log('error = ', error);
    next({ error: 'internal server error' });
  };
});


module.exports = router;
