const data = require('../data/zoo_data');

const countChilds = (object) => {
  let result = 0;
  object.forEach((person) => {
    if (person.age < 18) {
      result += 1;
    }
  });
  return result;
};

const countAdults = (object) => {
  let result = 0;
  object.forEach((person) => {
    if (person.age === 18 && person.age < 50) {
      result += 1;
    }
  });
  return result;
};

const countSeniors = (object) => {
  let result = 0;
  object.forEach((person) => {
    if (person.age >= 50) {
      result += 1;
    }
  });
  return result;
};

function countEntrants(entrants) {
  /*
    Criança: menos de 18 anos;
    Adulto: 18 anos até menor de 50 anos;
    Idoso: 50 anos ou mais.
  */
  const countChild = countChilds(entrants);
  const countAdult = countAdults(entrants);
  const countSenior = countSeniors(entrants);
  const visitors = { child: countChild, adult: countAdult, senior: countSenior };

  return visitors;
}

function calculateEntry(entrants) {
  // seu código aqui
  const priceChild = data.prices.child;
  const priceAdult = data.prices.adult;
  const priceSenior = data.prices.senior;

  if (!entrants || Object.entries(entrants).length === 0) {
    return 0;
  }

  const people = Object.values(countEntrants(entrants));
  const sum = (priceChild * people[0]) + (priceAdult * people[1]) + (priceSenior * people[2]);
  return sum;
}

module.exports = { calculateEntry, countEntrants };
