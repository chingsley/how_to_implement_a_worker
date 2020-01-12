const axios = require('axios')
const cron = require('node-cron');

const getNewAccounts = async () => {
  // try {
  //   return await axios.get('https://chingsley-accounts.herokuapp.com/api/new_accounts')
  // } catch (error) {
  //   console.error(error)
  // }
}

cron.schedule('* * * * *', function () {
  console.log('Running Cron Job\n');
  console.log(Date.now(), '\n');
  try {
    return await axios.get('https://chingsley-accounts.herokuapp.com/api/new_accounts')
  } catch (error) {
    console.error(error)
  }
});

module.exports = {
  getNewAccounts,
};
