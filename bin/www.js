const app = require('../app');
const config = require('../config/auth');
const http = require('http');
const server = http.createServer(app);
const logger = require('../config/logger');
var debug = require('debug')('giant-fl:server');



const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};
  
  const unexpectedErrorHandler = (error) => {
    logger.error(error);
    exitHandler();
  };
  
  process.on('uncaughtException', unexpectedErrorHandler);
  process.on('unhandledRejection', unexpectedErrorHandler);
  
  process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    if (server) {
      server.close();
    }
  });
 
 var port = normalizePort(process.env.PORT || '3001');
 app.set('port', port);
 

 server.on('error', onError);
 server.on('listening', onListening);
 
 /**
  * Normalize a port into a number, string, or false.
 */
 
function normalizePort(val) {
   var port = parseInt(val, 10);
   
   if (isNaN(port)) {
     // named pipe
     return val;
    }
    
    if (port >= 0) {
        // port number
        return port;
    }
    
    return false;
}


function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
   
    var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;
     
     // handle specific listen errors with friendly messages
   switch (error.code) {
       case 'EACCES':
           logger.error(bind + ' requires elevated privileges');
       process.exit(1);
       break;
     case 'EADDRINUSE':
       logger.error(bind + ' is already in use');
       process.exit(1);
       break;
       default:
           throw error;
        }
   }
   
  
  
  function onListening() {
      var addr = server.address();
      var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
      debug('Listening on ' + bind);
 }
 
 
 server.listen(config.port, () => {
   logger.info(`Listening to port ${config.port}`);
 });
 
 module.exports = {
     server
 }
 