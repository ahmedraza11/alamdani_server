const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')

const employeeRoute = require('./api/routes/employee');
const projectRoute = require('./api/routes/project');
const taskRoute = require('./api/routes/task');
const authRoute = require('./api/routes/auth');
const kpiRoute = require('./api/routes/kpi');
const reportRoute = require('./api/routes/report');
const departmentRoute = require('./api/routes/department');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/employee', employeeRoute);
app.use('/project', projectRoute);
app.use('/task', taskRoute);
app.use('/auth', authRoute);
app.use('/kpi', kpiRoute);
app.use('/report', reportRoute);
app.use('/department', departmentRoute);

module.exports = app;