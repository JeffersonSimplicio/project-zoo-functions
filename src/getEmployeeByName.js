const data = require('../data/zoo_data');

function getEmployeeByName(employeeName) {
  // seu código aqui
  let result = {};
  data.employees.forEach((employee) => {
    if (employee.firstName === employeeName || employee.lastName === employeeName) {
      result = employee;
    }
  });
  return result;
}

module.exports = getEmployeeByName;
