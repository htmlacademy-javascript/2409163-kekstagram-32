import {body, imageUploadForm, isEscapeKey} from './util';
import {onDocumentEscapeKeyDown, onFormCloseButtonClick} from './form-close';

const formCloseButton = imageUploadForm.querySelector('.img-upload__cancel');

const errorMessage = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const errorButton = errorMessage.querySelector('.error__button');
const successMessage = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const successButton = successMessage.querySelector('.success__button');

const removeErrorAlert = () => {
  document.addEventListener('keydown', onDocumentEscapeKeyDown);
  errorMessage.remove();
  errorButton.removeEventListener('click', onErrorButtonClick);
  window.removeEventListener('keydown',onWindowEscapeKeyDown);
  window.removeEventListener('click', onDocumentClick);
  formCloseButton.addEventListener('click', onFormCloseButtonClick);
};

const showErrorAlert = () => {
  document.removeEventListener('keydown', onDocumentEscapeKeyDown);
  errorButton.addEventListener('click', onErrorButtonClick);
  window.addEventListener('keydown',onWindowEscapeKeyDown);
  document.addEventListener('click', onDocumentClick);
  body.appendChild(errorMessage);
  formCloseButton.removeEventListener('click', onFormCloseButtonClick);
};

const removeSuccessAlert = () => {
  successMessage.remove();
  successButton.removeEventListener('click', onSuccesButtonClick);
  window.removeEventListener('keydown',onWindowEscapeKeyDown);
  window.removeEventListener('click', onDocumentClick);
};

const showSuccessAlert = () => {
  successButton.addEventListener('click', onSuccesButtonClick);
  window.addEventListener('keydown',onWindowEscapeKeyDown);
  document.addEventListener('click', onDocumentClick);
  body.appendChild(successMessage);
};

function onErrorButtonClick () {
  removeErrorAlert();
}

function onSuccesButtonClick () {
  removeSuccessAlert();
}

function onWindowEscapeKeyDown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removeErrorAlert();
    removeSuccessAlert();
  }
}

function onDocumentClick (evt) {
  if (!evt.target.matches('.error__inner') && !evt.target.matches('.error__title')) {
    evt.preventDefault();
    removeErrorAlert();
  }

  if (!evt.target.matches('.success__inner') && !evt.target.matches('.success__title')) {
    evt.preventDefault();
    removeSuccessAlert();
  }
}

export {showErrorAlert, removeErrorAlert, showSuccessAlert, removeSuccessAlert};
