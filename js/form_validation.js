import {body, imageUploadForm, hashtagField, transformStringToArray, isEscapeKey, blockSubmitButton, unblockSubmitButton, formCloseButton} from './util.js';
import {sendDataToServer} from './server_api.js';
import {closeImageUploadForm, onEscapeKeyClickModal} from './form_open_close.js';

const MAX_HASHTAG_NUMBER = 5;
const HASHTAG_REG_EXP_VALIDATION = /^#[a-zа-яё0-9]{1,19}$/i;
const HASHTAG_ERROR_TEXT = {
  INVALID_PATTERN: 'Хэштег введён неверно',
  NOT_UNIQUE: 'Хэштеги не должны повторяться',
};

const errorMessage = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const errorButton = errorMessage.querySelector('.error__button');
const successMessage = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const successButton = successMessage.querySelector('.success__button');

const hasValidPattern = (inputValue) => transformStringToArray(inputValue).every((tag) => HASHTAG_REG_EXP_VALIDATION.test(tag));
const hasValidNumber = (inputValue) => transformStringToArray(inputValue).length <= MAX_HASHTAG_NUMBER;
const hasUniqueTags = (inputValue) => {
  const lowerCaseArray = transformStringToArray(inputValue).map((tag) => tag.toLowerCase());
  return lowerCaseArray.length === new Set(lowerCaseArray).size;
};

const pristine = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'

});

pristine.addValidator(hashtagField, hasValidPattern, HASHTAG_ERROR_TEXT.INVALID_PATTERN, 3, false);
pristine.addValidator(hashtagField, hasValidNumber, HASHTAG_ERROR_TEXT.TOO_MANY_HASHTAGS, 2, false);
pristine.addValidator(hashtagField, hasUniqueTags, HASHTAG_ERROR_TEXT.NOT_UNIQUE, 1 , false);

function onEscapeKeyClickErrorAlert (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removeErrorAlert();
  }
}
function onClickOutsideErrorAlert (evt) {
  if (!evt.target.matches('.error__inner') && !evt.target.matches('.error__title')) {
    evt.preventDefault();
    removeErrorAlert();
  }
}

function onEscapeKeyClickSuccessAlert (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removeSuccessAlert();
  }
}

function onClickOutsideSuccessAlert (evt) {
  if (!evt.target.matches('.error__inner') && !evt.target.matches('.error__title')) {
    evt.preventDefault();
    removeSuccessAlert();
  }
}

function showErrorAlert () {
  errorButton.addEventListener('click', removeErrorAlert);
  document.addEventListener('keydown',onEscapeKeyClickErrorAlert);
  document.addEventListener('click', onClickOutsideErrorAlert);
  body.appendChild(errorMessage);
  formCloseButton.removeEventListener('click', closeImageUploadForm);
  document.removeEventListener('keydown', onEscapeKeyClickModal);

}

function removeErrorAlert () {
  body.removeChild(errorMessage);
  errorButton.removeEventListener('click', removeErrorAlert);
  document.removeEventListener('keydown',onEscapeKeyClickErrorAlert);
  document.removeEventListener('click', onClickOutsideErrorAlert);
  document.addEventListener('keydown', onEscapeKeyClickModal);
  formCloseButton.addEventListener('click', closeImageUploadForm);
}

function showSuccessAlert () {
  successButton.addEventListener('click', removeSuccessAlert);
  document.addEventListener('keydown',onEscapeKeyClickSuccessAlert);
  document.addEventListener('click', onClickOutsideSuccessAlert);
  body.appendChild(successMessage);
}

function removeSuccessAlert () {
  body.removeChild(successMessage);
  successButton.removeEventListener('click', removeSuccessAlert);
  document.removeEventListener('keydown',onEscapeKeyClickSuccessAlert);
  document.removeEventListener('click', onClickOutsideSuccessAlert);
}

const setUserFormSubmit = (onSuccess) => {
  imageUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendDataToServer(() => {
        onSuccess();
        unblockSubmitButton();
        showSuccessAlert();
      },
      () => {
        showErrorAlert();
        unblockSubmitButton();
      },
      new FormData(evt.target));
    }
  });
};

export {setUserFormSubmit};
