const express = require('express');
const cors = require('cors');
const { getEmployees, getEmployeeById } = require('./controllers');

const app = express();
const port = 3010;

app.use(cors());
app.use(express.json());

app.get('/employees', (req, res) => {
  const employees = getEmployees();
  res.status(200).json({ employees });
});

app.get('/employees/details/:id', (req, res) => {
  const employeeId = parseInt(req.params.id);
  const employee = getEmployeeById(employeeId);

  if (employee) {
    res.status(200).json({ employee });
  } else {
    res.status(404).send('Employee not found');
  }
});
module.exports = {
  app,
  port,
};
