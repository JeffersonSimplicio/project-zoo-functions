const data = require('../data/zoo_data');

const selectAnimalList = (employeeId) => {
  const infoEmployee = data.employees.find((employee) => employee.id === employeeId);
  const speciesID = infoEmployee.responsibleFor[0];
  const species = data.species.find((speciesId) => speciesId.id === speciesID);
  return species.residents;
};

const olderAnimal = (arrayAnimals) => {
  let olderAge = 0;
  let selectedAnimal;
  arrayAnimals.forEach((animal) => {
    if (animal.age > olderAge) {
      olderAge = animal.age;
      selectedAnimal = animal;
    }
  });
  return selectedAnimal;
};

function getOldestFromFirstSpecies(id) {
  let result = selectAnimalList(id);
  result = olderAnimal(result);
  return [result.name, result.sex, result.age];
}

module.exports = getOldestFromFirstSpecies;
