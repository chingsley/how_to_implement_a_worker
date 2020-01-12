// const db = require('../database/db');
const failedAccounts = require('../database/failedAccounts');

const fetchAllFailedAccounts = async (req, res, next) => {
  try {
    const context = {};

    context.id = parseInt(req.params.id, 10);
    const rows = await failedAccounts.find(context);

    if (req.params.id) {
      if (rows.length === 1) {
        res.status(200).json(rows[0]);
      } else {
        res.status(404).json({
          error: 'account not found'
        });
      }
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    console.log(err);
    next(err);
  }

};


// INSERT A NEW FAILED ACCOUNT INTO THE FAILED TABLE
/**
 * There is no endpoint to perform this operation because a new row for
 * a failed account is programmatically inserted into the failed table 
 * when the response from NIBSS API is 'failed' and 
 */


// DELETING AN ACCOUNT FROM MY FAILED TABLE
/**
 * There is no endpoint to delete an account from my failed table because
 * an account should not be removed from the failed table untill its being
 * accepted by NIBSS API. 
 * When the response from NIBSS is successful (00), then I will programmatically
 * delete that account from the failed table. If the response from NIBSS is 'failed',
 * then save the account in the failed table, unless the account already exists AND 
 * the error message remains the same. NOTE: if the account already exists in the
 * failed table but the error message has changed, then perform a put to replace 
 * the old instance of the account with the new one.
 */


module.exports = {
  fetchAllFailedAccounts,
};
