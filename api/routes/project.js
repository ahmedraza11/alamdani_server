const express = require('express');
const router = express.Router();
const connection = require('./../config/db');

// Get All Projects
router.get('/', function (req, res, next) {
    connection.query('SELECT * FROM project', (err, result) => {
        if (err) {
            res.status(500).json({ message: "Error in fetching Projects", error: err });
        } else {
            res.status(200).json(result);
        }
    });
})

// Get Users Projects
router.get('/:userId', function (req, res, next) {
    const userId = req.params.userId;
    connection
        .query(`
        SELECT 
            p.id,
            p.projectName,
            a.name as assignTo,
            p.assignTo as assignToId,
            p.startDate,
            p.assignDate,
            p.targetedDate,
            p.fileSource,
            p.fileSource,
            b.name as assignedBy,
            p.assignedBy as assignedById,
            p.fileQuantity,
            p.fileQuantity,
            p.pageQuantity,
            p.createdAt,
            p.status,
            p.comment 
        FROM project as p 
        INNER JOIN 
            employee a on p.assignTo=a.id
        INNER JOIN
            employee b on p.assignedBy=b.id
        WHERE p.assignedBy='${userId}'
        `, (err, result) => {
                if (err) {
                    res.status(500).json({ message: err, getProjectSuccess: false });
                } else {
                    res.status(200).json({ result: result });
                }
            })
})

// Create a New Project
router.post('/', function (req, res) {
    connection
        .query(`
    INSERT INTO project
        (
            projectName,
            emailSubject, 
            assignTo, 
            startDate, 
            endDate, 
            assignDate, 
            targetedDate, 
            fileSource, 
            assignedBy, 
            fileQuantity, 
            pageQuantity, 
            createdAt, 
            status, 
            comment
            ) values (
                "${req.body.projectName}",
                "${req.body.emailSub}",
                "${req.body.assignTo}",
                "${req.body.startDate}",
                "${req.body.endDate}",
                "${req.body.assignDate}",
                "${req.body.targetedDate}",
                "${req.body.fileSource}",
                "${req.body.assignedBy}",
                ${req.body.fileQuantity},
                ${req.body.pageQuantity},
                "${new Date().toISOString()}",
                "${req.body.status}",
                "${req.body.comment}"
                )`, (err, result) => {
                if (err) {
                    res.status(500).json({ message: err, projectCreated: false });
                } else {
                    res.status(200).json({
                        projectCreated: true,
                        result: result
                    });
                }
            });
});

// update Project
router.post('/update/:id', function (req, res) {
    connection.query('update project set projectName="' + req.body.projectName + '",ownerId="' + req.body.ownerId + '",startDate="' + req.body.startDate + '",endDate="' + req.body.endDate + '",assignDate="' + req.body.assignDate + '",targetedDate="' + req.body.targetedDate + '",fileSource="' + req.body.fileSource + '",assignedBy="' + req.body.assignedBy + '",fileQuantity="' + req.body.fileQuantity + '",pageQuantity="' + req.body.pageQuantity + '",status="' + req.body.status + '",comment="' + req.body.comment + '" where id= ' + req.params.id + '', (err, result) => {
        if (err) {
            res.status(500).json({ message: "some errors in update project", error: err });
        } else {
            res.status(200).json({ message: "update successully done", result: result });
        }
    });
});



module.exports = router;