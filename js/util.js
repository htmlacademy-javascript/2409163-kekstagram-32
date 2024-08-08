const body = document.querySelector('body');
const thumbnailsContainer = document.querySelector('.pictures');
const imageUploadForm = document.querySelector('.img-upload__form');
const submitButton = document.querySelector('.img-upload__submit');
const ErrorDataMessage = document.querySelector('#data-error').content.querySelector('.data-error').cloneNode(true);

const generateArray = (minValue, maxValue) => {
  const data = [];
  for (let i = 0; i <= maxValue - minValue; i++) {
    data.push(minValue + i);
  }
  return data;
};

const getRandomInteger = (minNum, maxNum) => {
  const lower = Math.ceil(Math.min(minNum, maxNum));
  const upper = Math.floor(Math.max(minNum, maxNum));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};


const getRandomArrayElement = (data) => {
  const previousValues = [];
  return function () {
    let currentElement = data[getRandomInteger(0, data.length - 1)];
    while (previousValues.includes(currentElement)) {
      currentElement = data[getRandomInteger(0, data.length - 1)];
    }
    if (data.length >= 25) {
      previousValues.push(currentElement);
    }
    return currentElement;
  };
};

const generateRandomTenElementsFromArray = (data) => {
  const generateElement = getRandomArrayElement(data);
  const randomTenElements = [];
  for (let i = 0; i < 10; i++) {
    const currentElement = generateElement();
    if (!randomTenElements.includes(currentElement)) {
      randomTenElements.push(currentElement);
    } else {
      i--;
    }
  }
  return randomTenElements;
};

const findAndRemoveAllElementsFromContainer = (container, elementClass) => {
  const data = container.querySelectorAll(elementClass);
  for (let i = data.length - 1; i >= 0; i--) {
    data[i].remove();
  }
};
const isEscapeKey = (evt) => evt.key === 'Escape';

const transformStringToArray = (string) => string
  .trim()
  .split(' ')
  .filter((tag) => Boolean(tag.length));

const ignoreEscape = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'ФОТО ОТПРАВЛЯЕТСЯ';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'ОПУБЛИКОВАТЬ';
};

const showErrorDataMessage = () => {
  body.appendChild(ErrorDataMessage);
  setTimeout(() => {
    body.removeChild(ErrorDataMessage);
  }, 5000);
};
const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {body, thumbnailsContainer, imageUploadForm, generateArray, getRandomInteger, getRandomArrayElement, isEscapeKey, transformStringToArray, blockSubmitButton, unblockSubmitButton, ignoreEscape, showErrorDataMessage, debounce, generateRandomTenElementsFromArray, findAndRemoveAllElementsFromContainer};
