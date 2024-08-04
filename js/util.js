const body = document.querySelector('body');
const picturesContainer = document.querySelector('.pictures');
const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadPreview = imageUploadForm.querySelector('img');
const submitButton = document.querySelector('.img-upload__submit');

const imageUploadController = imageUploadForm.querySelector('.img-upload__input');
const imageUploadOverlay = document.querySelector('.img-upload__overlay');
const formCloseButton = imageUploadOverlay.querySelector('.img-upload__cancel');
const hashtagField = imageUploadOverlay.querySelector('.text__hashtags');
const commentField = imageUploadOverlay.querySelector('.text__description');

const scaleControlSmallerButton = imageUploadForm.querySelector('.scale__control--smaller');
const scaleControlBiggerButton = imageUploadForm.querySelector('.scale__control--bigger');
const scaleControlValueInput = imageUploadForm.querySelector('.scale__control--value');

const ErrorDataMessage = document.querySelector('#data-error').content.querySelector('.data-error').cloneNode(true);

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

const transformStringToArray = (string) => string
  .trim()
  .split(' ')
  .filter((tag) => Boolean(tag.length));

function ignoreEscape (evt) {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
}


function blockSubmitButton () {
  submitButton.disabled = true;
  submitButton.textContent = 'ФОТО ОТПРАВЛЯЕТСЯ';
}

function unblockSubmitButton () {
  submitButton.disabled = false;
  submitButton.textContent = 'ОПУБЛИКОВАТЬ';
}

function showErrorDataMessage () {
  body.appendChild(ErrorDataMessage);
  setTimeout(() => {
    body.removeChild(ErrorDataMessage);
  }, 5000);
}

export {body, picturesContainer, imageUploadForm, imageUploadPreview, imageUploadController, imageUploadOverlay, formCloseButton, hashtagField, commentField, scaleControlValueInput, scaleControlSmallerButton, scaleControlBiggerButton, generateArray, getRandomInteger, getRandomArrayElement, isEscapeKey, transformStringToArray, blockSubmitButton, unblockSubmitButton, ignoreEscape, showErrorDataMessage};


