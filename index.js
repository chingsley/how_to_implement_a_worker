const server = require('./server');
const db = require('./src/database/db');
const defaultThreadPoolSize = 4;
 
// Increase thread pool size by poolMax
process.env.UV_THREADPOOL_SIZE = db.config.hrPool.poolMax + defaultThreadPoolSize;


const port = process.env.PORT || 3000;
let webServer;
async function startServer() {
  try {
    await db.connection.initialize(); 
    webServer = await server.listen(port, () => {
      console.log(`\n*** Server running on port ${port} ***`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}


startServer();


async function shutdown(e) {
  let err = e;
  console.log('Shutting down server...');

  try {
    console.log('Closing web server module...');
    await webServer.close();
  } catch (error) {
    console.log('Encountered error', e);
    err = err || error;
  }

  try {
    console.log('Closing database module...');
    await db.connection.close(); 
  } catch (error) {
    console.log('Encountered error', e);
    err = err || error;
  }

  console.log('Exiting process...');

  if (err) {
    process.exit(1); // Non-zero failure code
  } else {
    process.exit(0);
  }
}

process.on('SIGTERM', () => {
  console.log('Received SIGTERM');
  shutdown();
});

process.on('SIGINT', () => {
  console.log('Received SIGINT');
  shutdown();
});

process.on('uncaughtException', err => {
  console.error(err);
  shutdown(err);
});
