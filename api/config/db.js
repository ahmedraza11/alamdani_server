const mysql = require('mysql');


module.exports = mysql.createConnection({
    // host: 'localhost',
    // user: 'root',
    // password: '',
    // database: 'taskmanagementsystem'


    host: '173.82.245.150',
    user: 'almadani_admin',
    password: 'almadaniadmin',
    database: 'almadani_task_manage'
});