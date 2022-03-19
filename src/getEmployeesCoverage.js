const data = require('../data/zoo_data');

// <-- Gestão de identificação -->

const typeIdentification = (obj) => {
  if (Object.keys(obj)[0] === 'name') {
    return 'name';
  }
  return 'id';
};

const searchForInfo = (obj, place) => {
  const namePerson = Object.values(obj)[0];
  const infoPerson = data.employees.find((employee) => employee[place] === namePerson);
  return infoPerson;
};

const searchByName = (obj) => {
  let result = searchForInfo(obj, 'firstName');
  if (!result) {
    result = searchForInfo(obj, 'lastName');
  }
  if (!result) {
    throw new Error('Informações inválidas');
  }
  return result;
};

const infoEmployee = (obj) => {
  let result;
  if (!obj) {
    return 'Deu certo';
  }
  if (typeIdentification(obj) === 'name') {
    result = searchByName(obj);
    return result;
  }
  result = searchForInfo(obj, 'id');
  if (!result) {
    throw new Error('Informações inválidas');
  }
  return result;
};

// <-- Gestão da informação para entrega do resultado -->

// Nome completo do funcionario
const fullName = (infoPerson) => `${infoPerson.firstName} ${infoPerson.lastName}`;

// Identifica os animais tratados pelos ids e retorna seus nomes ou localizações
const animalNames = (arraAnimalsIds, wanted) => {
  const result = [];
  arraAnimalsIds.forEach((id) => {
    data.species.forEach((animal) => {
      if (animal.id === id) {
        result.push(animal[wanted]);
      }
    });
  });
  return result;
};

// Cria array com os ids dos aninais tratados, e chama a função de retornar os nomes ou a localização
const treatedAnimals = (infoPerson, wanted) => {
  const animalIds = infoPerson.responsibleFor.map((animalId) => animalId);
  return animalNames(animalIds, wanted);
};

const personResult = (infoPerson) => {
  const result = {
    id: infoPerson.id,
    fullName: fullName(infoPerson),
    species: treatedAnimals(infoPerson, 'name'),
    locations: treatedAnimals(infoPerson, 'location'),
  };
  return result;
};

// <-- Função principal -->

function getEmployeesCoverage(identification) {
  // seu código aqui
  const identifier = infoEmployee(identification);

  if (typeof identifier === 'object') {
    return personResult(identifier);
  }

  return data.employees.map((person) => personResult(person));
}
// console.log(getEmployeesCoverage());
// console.log(getEmployeesCoverage({ name: 'Sharonda' }));
// console.log(getEmployeesCoverage({ name: 'Spry' }));
// console.log(getEmployeesCoverage({ id: '4b40a139-d4dc-4f09-822d-ec25e819a5ad' }));
// console.log(getEmployeesCoverage({ id: 'Id inválido' }));

module.exports = getEmployeesCoverage;
