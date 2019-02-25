const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const checkAuth = require('./../middleware/checkAuth');
const connection = require('./../config/db');

//Get All Employees
router.post('/login', function (req, res) {
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
        where 
    username="${req.body.username}" AND
    password="${req.body.password}"`,
        (error, results, fields) => {
            if (error) {
                res.status(500).json({
                    message: "Error in Auth",
                    loggedIn: false,
                    error: error
                });
            } else {
                if (results.length <= 0) {
                    res.status(500).json(
                        {
                            message: "invalid username or password",
                            loggedIn: false,
                        }
                    );
                } else {
                    const token = jwt.sign({
                        username: req.body.username,
                        userId: results[0].id
                    }, "secret", { expiresIn: '5h' });
                    res.status(200).json(
                        {
                            message: "user successfull logged in",
                            loggedIn: true,
                            result: results,
                            token: token
                        }
                    )
                }
            }

        });
});

// Get User Detail
router.get('/getUser/:id', checkAuth, function (req, res) {
    const userId = req.params.id;
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
        where 
    employee.id="${userId}"`,
        (error, result, fields) => {
            if (error) {
                res.status(500).json({
                    message: "Error in fetch user Detail",
                    getUserDetail: false
                })
            } else {
                res.status(200).json({
                    getUserDetail: true,
                    message: "Fetch User Detail Success",
                    result: result
                })
            }
        });
})



// Update User Credentials
router.put('/authUpdate', checkAuth, function (req, res) {
    connection.query(`
    UPDATE employee 
        SET 
    username="${req.body.newUsername}",
    password= "${req.body.newPassword}" 
        WHERE
    id="${req.body.userId}"`, function (error, results, fields) {
            if (error) {
                res.status(500).json({
                    error: error
                })
            } else {
                res.status(201).json({
                    message: "User successfully updated!",
                    userUpdated: true,
                    result: results
                })
            }
        });
});

module.exports = router;