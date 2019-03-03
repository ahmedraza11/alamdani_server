const express = require('express');
const router = express.Router();
const uuid = require('uuid/v4')
const checkAuth = require('./../middleware/checkAuth');
const connection = require('./../config/db');

//Get All Employees 
router.get('/',checkAuth, function (req, res) {
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

//Get All Employees 
router.get('/admin',checkAuth, function (req, res) {
    connection.query(`
    SELECT 
        employee.id,
        name,
        designation,
        phone,
        department_id as dept_id,
        department.dept_name as department,
        role,
        username,
        password,
        employee.createdAt 
    FROM employee
    INNER JOIN
        department on
    department.id = employee.department_id
       `, (error, results, fields) => {
            if (error) {
                res.status(500).json({
                    error: error
                })
            } else {
                res.status(200).json(results)
            }

        });
});


// Create New Employee
router.post('/',checkAuth, function (req, res) {
    connection.query(`
    INSERT INTO employee 
    (
        id, 
        name, 
        designation, 
        phone, 
        department_id, 
        username, 
        password,
        role, 
        createdAt
    ) values
    
    (
        "${uuid()}",
        "${req.body.name}",
        "${req.body.designation}",
        "${req.body.phoneNumber}",
        ${req.body.department},
        "${req.body.username}",
        "${req.body.password}",
        "${req.body.role}",
        "${new Date().toISOString()}"
    )`, (error, results, fields) => {
            if (error) {
                res.status(500).json({
                    error: error,
                    employeeAddedSuccess: false
                });
            } else {
                res.status(200).json({
                    results: results,
                    employeeAddedSuccess: true
                })
            }
        });
});


// Update Employee
router.patch('/',checkAuth, function (req, res) {
    connection.query(`
    UPDATE employee 
        SET    
    name = "${req.body.name}",
    designation = "${req.body.designation}",
    phone = "${req.body.phoneNumber}",
    department_id = ${req.body.department},
    username = "${req.body.username}",
    password = "${req.body.password}",
    role = "${req.body.role}"
        WHERE
    id = "${req.body.empId}"
    `, (error, results, fields) => {
            if (error) {
                res.status(500).json({
                    error: error,
                    employeeUpdatedSuccess: false
                });
            } else {
                res.status(200).json({
                    results: results,
                    employeeUpdatedSuccess: true
                })
            }
        });
});


module.exports = router;