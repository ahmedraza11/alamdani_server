const http = require('http');
const app = require('./app');
const mysql = require('mysql');
const port = process.env.PORT || 3001;
// const db_config = require('./api/config/db');

// const db_config = {
//   host: '185.38.44.227',
//   user: 'citykaro_ahmed',
//   password: 'attari11',
//   database: 'citykaro_task_manage'
//   // port:3306,
// }

// var connection;

// function handleDisconnect() {
//   connection = mysql.createPool(db_config);
//   connection.connect(function (err) {
//     if (err) {
//       console.log('error when connecting to db:', err);
//       setTimeout(handleDisconnect, 2000);
//     }
//   });
//   connection.on('error', function (err) {
//     console.log('db error', err);
//     if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//       handleDisconnect();
//     } else {
//       throw err;
//     }
//   });
// }

// handleDisconnect();

const server = http.createServer(app);

server.listen(port, () => {
  console.log("Port is running", port);
})