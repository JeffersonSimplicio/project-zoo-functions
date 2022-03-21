const data = require('../data/zoo_data');

// Array do nome dos animais do ZOO
const animais = data.species.map((animal) => animal.name);

// Array dos dias da semana
const daysOfTheWeek = Object.keys(data.hours);

// Array dos dias que o animal esta em exibição
const animalDays = (specie) => {
  const infoSpecie = data.species.find((animal) => animal.name === specie);
  return infoSpecie.availability;
};

// <-- Funções responsaveis pelas informações dos dia da semana -->
const animalsOnDisplay = (day) => {
  if (day === 'Monday') {
    return 'The zoo will be closed!';
  }
  const animals = [];
  data.species.forEach((animal) => {
    if (animal.availability.indexOf(day) !== -1) {
      animals.push(animal.name);
    }
  });
  return animals;
};

const openingHours = (day) => {
  if (day === 'Monday') {
    return 'CLOSED';
  }
  const opening = data.hours[day].open;
  const closure = data.hours[day].close;
  return `Open from ${opening}am until ${closure}pm`;
};

// Object com horario de funcionamento e animais do dia
const infoDays = (day) => {
  const mainObject = {};
  const internalObject = {};
  const time = 'officeHour';
  const display = 'exhibition';
  internalObject[time] = openingHours(day);
  internalObject[display] = animalsOnDisplay(day);
  mainObject[day] = internalObject;
  return mainObject;
};

// Função de resultado padrão
const pattern = () => {
  const mainObject = {};
  const time = 'officeHour';
  const display = 'exhibition';
  daysOfTheWeek.forEach((day) => {
    const internalObject = {};
    internalObject[time] = openingHours(day);
    internalObject[display] = animalsOnDisplay(day);
    mainObject[day] = internalObject;
  });
  return mainObject;
};

// <-- Função principal -->
function getSchedule(scheduleTarget) {
  if (animais.indexOf(scheduleTarget) !== -1) {
    return animalDays(scheduleTarget);
  }
  if (daysOfTheWeek.indexOf(scheduleTarget) !== -1) {
    return infoDays(scheduleTarget);
  }
  return pattern();
}

module.exports = getSchedule;
