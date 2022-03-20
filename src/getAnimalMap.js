const data = require('../data/zoo_data');

// Função base

const selectorByRegion = (place) => data.species.filter((animal) => animal.location === place);

// <-- Quando nada é passado ou quando o includeName é 'false' -->

const pattern = (place) => selectorByRegion(place).map((animal) => animal.name);

const standard = () => {
  const result = {
    NE: pattern('NE'),
    NW: pattern('NW'),
    SE: pattern('SE'),
    SW: pattern('SW'),
  };
  return result;
};

// <-- Quando o genero do animal não é passado -->

const concatenationNames = (animal, sorted) => {
  const nomes = [];
  const specieAndNames = {};
  animal.residents.forEach((item) => nomes.push(item.name));
  if (sorted) {
    specieAndNames[animal.name] = nomes.sort();
    return specieAndNames;
  }
  specieAndNames[animal.name] = nomes;
  return specieAndNames;
};

const namePicker = (place, sorted = false) => {
  const result = [];
  selectorByRegion(place).forEach((animal) => {
    const returned = concatenationNames(animal, sorted);
    result.push(returned);
  });
  return result;
};

const namesOnly = (obj) => {
  if (obj.sorted) {
    const orderly = obj.sorted;
    return {
      NE: namePicker('NE', orderly),
      NW: namePicker('NW', orderly),
      SE: namePicker('SE', orderly),
      SW: namePicker('SW', orderly),
    };
  }
  return {
    NE: namePicker('NE'),
    NW: namePicker('NW'),
    SE: namePicker('SE'),
    SW: namePicker('SW'),
  };
};

// <-- Funções para qnd o genero dos animais é setado -->

const animalSweep = (animal, gender, sorted) => {
  const names = [];
  const specieAndNames = {};
  animal.residents.forEach((item) => {
    if (item.sex === gender) {
      names.push(item.name);
    }
  });
  if (sorted) {
    specieAndNames[animal.name] = names.sort();
    return specieAndNames;
  }
  specieAndNames[animal.name] = names;
  return specieAndNames;
};

const selectorBySex = (place, gender, sorted = false) => {
  const result = [];
  selectorByRegion(place).forEach((animal) => {
    const returned = animalSweep(animal, gender, sorted);
    result.push(returned);
  });
  return result;
};

const concatenateBySex = (obj) => {
  const gender = obj.sex;
  if (obj.sorted) {
    const orderly = obj.sorted;
    return {
      NE: selectorBySex('NE', gender, orderly),
      NW: selectorBySex('NW', gender, orderly),
      SE: selectorBySex('SE', gender, orderly),
      SW: selectorBySex('SW', gender, orderly),
    };
  }
  return {
    NE: selectorBySex('NE', gender),
    NW: selectorBySex('NW', gender),
    SE: selectorBySex('SE', gender),
    SW: selectorBySex('SW', gender),
  };
};

// <-- Função principal do programa -->
function getAnimalMap(options) {
  if (typeof options === 'object' && options.includeNames) {
    if (options.sex) {
      return concatenateBySex(options);
    }
    return namesOnly(options);
  }
  return standard();
}

module.exports = getAnimalMap;
