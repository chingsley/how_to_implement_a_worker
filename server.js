const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const axios = require('axios');

const router = require('./src/router');

const server = express();
server.use(cors());
server.use(express.json());


cron.schedule('* * * * *', async function () {
  console.log('Running Cron Job\n');
  console.log(new Date(Date.now()), '\n');
  try {
    const result = await axios.get('https://chingsley-accounts.herokuapp.com/api/new_accounts');
    console.log(result.data.slice(0, 2));
  } catch (error) {
    console.error(error)
  }
});

server.get('/', (req, res) => {
  res.send('Welcome to Access ICAD-Data-Transmission Solution');
});

server.use('/api', router);

server.use('/*', (req, res) => {
  res.status(404).json({
    error: "The requested endpoint does not exist on this server"
  })
});

// use this to catch all 'internal server errors
server.use((err, req, res, next) => {
  res.status(500).json({ err });
});

module.exports = server;
