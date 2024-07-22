//генератор массива целых числе по возрастанию:
const generateArray = (minValue, maxValue) => {
  const newArray = [];
  for (let i = 0; i <= maxValue - minValue; i++) {
    newArray.push(minValue + i);
  }
  return newArray;
};

//генератор случайного целого числа:
const getRandomInteger = (minNum, maxNum) => {
  const lower = Math.ceil(Math.min(minNum, maxNum));
  const upper = Math.floor(Math.max(minNum, maxNum));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//генератор случайного элемента в массиве:
const getRandomArrayElement = (array) => {
  const previousValues = [];
  return function () {
    let currentElement = array[getRandomInteger(0, array.length - 1)];
    while (previousValues.includes(currentElement)) {
      currentElement = array[getRandomInteger(0, array.length - 1)];
    }
    if (array.length >= 25) {
      previousValues.push(currentElement);
    } //уникальные элементы нужны только, если массив >= 25

    return currentElement;
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export {generateArray, getRandomInteger, getRandomArrayElement, isEscapeKey};


