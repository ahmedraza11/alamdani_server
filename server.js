const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3001;
const connection = require('./api/config/db');

connection.connect((err) => {
    if (err) {
        console.error("Error in Connection", err);
    } else {
        console.log("Connected as id", connection.threadId);
    }
})

const server = http.createServer(app);




server.listen(port, () => {
    console.log("Port is running", port);
})