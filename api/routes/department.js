const express = require('express');
const router = express.Router();
const connection = require('./../config/db');

//Get All Departments 
router.get('/', function (req, res) {
    connection.query(
        `SELECT * FROM department`, function (error, results, fields) {
            if (error) {
                res.status(500).json({
                    error: error
                })
            } else {
                res.send(results)
            }

        });
});

module.exports = router;