const express = require('express');
const cors = require('cors');
const cron = require('node-cron');

const router = require('./src/router');

const server = express();
server.use(cors());
server.use(express.json());


cron.schedule('* * * * *', function () {
    console.log('Running Cron Job');
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
