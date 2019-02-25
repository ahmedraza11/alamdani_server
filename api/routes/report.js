const express = require('express');
const router = express.Router();
const checkAuth = require('./../middleware/checkAuth');
const connection = require('./../config/db');

// Get report for All of Tasks
router.post('/', checkAuth, (req, res) => {
    connection.query(`
        SELECT 
            kpi.kpi_ar as KPI_Name, 
            count(workType) as Count, 
        department.dept_name as Depart 
        FROM task 
        INNER JOIN kpi 
            on kpi.id = task.workType 
        INNER JOIN department 
            on department.id=kpi.dept_id 
        where 
        task.endDate >= "${req.body.startDate}" AND
        task.endDate <= "${req.body.endDate}" AND
        kpi.showInFilter=${req.body.filtered}
        GROUP by workType
    `,
        (err, result) => {
            if (err) res.status(500).json({ message: err });
            res.status(200).json({
                getReportSuccess: true,
                count: result.length,
                result: result
            });
        })
})


// Get Report for Particular user
router.post('/:userId', checkAuth, (req, res) => {
    const { userId } = req.params;
    connection.query(`
        SELECT 
            kpi.kpi_ar as KPI_Name, 
            count(workType) as Count, 
        department.dept_name as Depart 
        FROM task 
        INNER JOIN kpi 
            on kpi.id = task.workType 
        INNER JOIN department 
            on department.id=kpi.dept_id 
        where 
        task.assignTo = "${userId}" AND 
        task.endDate >= "${req.body.startDate}" AND 
        task.endDate <= "${req.body.endDate}"
        GROUP by workType
    `,
        (err, result) => {
            if (err) res.status(500).json({ message: err });
            res.status(200).json({
                getReportSuccess: true,
                count: result.length,
                result: result
            });
        })
})

module.exports = router;