const data = require('../data/zoo_data');

function isManager(id) {
  let result = false;
  const managersArray = data.employees.map((employee) => employee.managers);
  managersArray.forEach((manager) => {
    if (manager.indexOf(id) !== -1) {
      result = true;
    }
  });
  return result;
}

function getRelatedEmployees(managerId) {
  const result = [];
  if (isManager(managerId)) {
    data.employees.forEach((employee) => {
      const contains = employee.managers.indexOf(managerId);
      if (contains !== -1) {
        const managed = [employee.firstName, employee.lastName];
        result.push(managed.join(' '));
      }
    });
    return result;
  }

  throw new Error('O id inserido não é de uma pessoa colaboradora gerente!');
}

module.exports = { isManager, getRelatedEmployees };
