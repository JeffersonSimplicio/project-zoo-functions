const data = require('../data/zoo_data');

const justKind = (nameAnimal) => {
  let answer = 0;
  data.species.forEach((especie) => {
    if (especie.name === nameAnimal) {
      answer = especie.residents.length;
    }
  });
  return answer;
};

const animalAndSex = (nameAnimal, sexAnimal) => {
  let count = 0;
  data.species.forEach((especie) => {
    if (especie.name === nameAnimal) {
      especie.residents.forEach((infoAnimal) => {
        if (infoAnimal.sex === sexAnimal) {
          count += 1;
        }
      });
    }
  });
  return count;
};

function countAnimals(animal) {
  let result = {};
  if (typeof animal === 'object') {
    const infoAnimal = Object.values(animal);
    if (infoAnimal.length === 1) {
      result = justKind(infoAnimal[0]);
      return result;
    }
    result = animalAndSex(infoAnimal[0], infoAnimal[1]);
    return result;
  }
  data.species.forEach((bicho) => {
    result[bicho.name] = bicho.residents.length;
  });
  return result;
}

module.exports = countAnimals;
