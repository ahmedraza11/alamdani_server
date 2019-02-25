const express = require('express');
const router = express.Router();
const uuid = require('uuid/v4')
const connection = require('./../config/db');

//Get All Employees 
router.get('/', function (req, res) {
    connection.query(`
    SELECT 
        employee.id,
        name,
        designation,
        phone,
        department.dept_name as department,
        role,
        employee.createdAt 
    FROM employee
    INNER JOIN
        department on
    department.id = employee.department_id
    `, function (error, results, fields) {
            if (error) {
                res.status(500).json({
                    error: error
                })
            } else {
                res.send(results)
            }

        });
});


// Create New Employee
router.post('/', function (req, res) {
    connection.query('INSERT INTO employee (id, name, designation, phone, department_id, username, password, createdAt) values ("' + uuid() + '","' + req.body.name + '","' + req.body.designation + '","' + req.body.phoneNumber + '",6,"' + req.body.username + '","' + req.body.password + '","' + new Date().toISOString() + '")', function (error, results, fields) {
        if (error) throw error;
        res.send(results)
    });
});

module.exports = router;