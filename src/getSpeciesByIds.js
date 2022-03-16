const data = require('../data/zoo_data');

function getSpeciesByIds(...ids) {
  // seu código aqui
  if (ids === []) {
    return undefined;
  }
  const description = [];
  ids.forEach((param) => {
    data.species.forEach((animal) => {
      if (animal.id === param) {
        description.push(animal);
      }
    });
  });
  return description;
}
// console.log(getSpeciesByIds('0938aa23-f153-4937-9f88-4858b24d6bce'));

module.exports = getSpeciesByIds;
