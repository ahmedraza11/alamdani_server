const express = require('express');
const router = express.Router();
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
    `, function (error, results, fields) {
            if (error) throw error;
            res.send(results)
        });
});

module.exports = router;