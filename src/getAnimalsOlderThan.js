const data = require('../data/zoo_data');

function getAnimalsOlderThan(animal, age) {
  let result;
  data.species.forEach((animalName) => {
    if (animalName.name === animal) {
      result = animalName.residents
        .map((criatura) => criatura.age)
        .every((idade) => idade >= age);
    }
  });
  return result;
}

module.exports = getAnimalsOlderThan;
