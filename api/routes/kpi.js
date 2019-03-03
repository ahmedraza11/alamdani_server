const express = require('express');
const router = express.Router();
const checkAuth = require('./../middleware/checkAuth');
const connection = require('./../config/db');

//Get All KPI    
router.get('/', function (req, res) {
    connection.query(`
    SELECT 
	    kpi.id,
        kpi.kpi_en,
        kpi.kpi_ar,
        kpi.kpi_ur,
        kpi.dept_id,
        department.dept_name as depart_name,
        kpi.showInFilter,
        kpi.enabled
    FROM kpi INNER JOIN
	    department on
    department.id = kpi.dept_id
    `, function (error, result, fields) {
            if (error) {
                throw error;
            } else {
                res.send(result)
            }
        });
});

router.post('/',checkAuth, function (req, res) {
    console.log("insert kpi::::", req.body);
    connection.query(`
    INSERT INTO kpi
        (
            kpi_en, 
            kpi_ar, 
            kpi_ur, 
            dept_id, 
            showInFilter, 
            enabled
        ) 
        values
        (  
            "${req.body.kpi_en}",
            "${req.body.kpi_ar}",
            "${req.body.kpi_ur}",
            ${req.body.dept_id},
            ${req.body.showInFilter},
            ${req.body.enabled}
        )`, (error, result) => {
            if (error) {
                res.status(500).json({
                    kpiAddedSuccess: false,
                    error: error
                })
            } else {
                res.status(200).json({
                    kpiAddedSuccess: true,
                    result: result
                })
            }
        });
});

router.patch('/:id', checkAuth,function (req, res) {
    console.log("update kpi::::", req.body);
    const { id } = req.params;
    connection.query(`
        UPDATE kpi
            SET 
        kpi_en='${req.body.kpi_en}',
        kpi_ar='${req.body.kpi_ar}',
        kpi_ur='${req.body.kpi_ur}',
        dept_id=${req.body.dept_id},
        showInFilter=${req.body.showInFilter},
        enabled=${req.body.enabled}
            WHERE
        id=${id}
    `, function (error, result) {
            if (error) {
                res.status(500).json({
                    kpiUpdatedSuccess: false,
                    error: error
                })
            } else {
                res.status(200).json({
                    kpiAddedSuccess: true,
                    result: result
                })
            }
        });
});

module.exports = router;