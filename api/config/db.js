const mysql = require('mysql');


module.exports = mysql.createConnection({
    // host: 'localhost',
    // user: 'root',
    // password: '',
    // database: 'taskmanagementsystem'


    host: '185.38.44.227',
    user: 'citykaro_ahmed',
    password: 'attari11',
    database: 'citykaro_task_manage'
});