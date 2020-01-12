const oracledb = require('oracledb');
const config = require('./config');
 
async function initialize() {
  console.log('Initializing database connection...');
  const pool = await oracledb.createPool(config.hrPool);
}

async function close() {
  await oracledb.getPool().close();
}

const connection = { initialize, close };
module.exports = connection;

