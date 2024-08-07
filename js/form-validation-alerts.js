import {body, imageUploadForm, isEscapeKey} from './util';
import { closeImageUploadForm, onDocumentEscapeKeyDownForm } from './form-close';

const formCloseButton = imageUploadForm.querySelector('.img-upload__cancel');

const errorMessage = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const errorButton = errorMessage.querySelector('.error__button');
const successMessage = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const successButton = successMessage.querySelector('.success__button');

const removeErrorAlert = () => {
  body.removeChild(errorMessage);
  errorButton.removeEventListener('click', removeErrorAlert);
  document.removeEventListener('keydown',onDocumentEscapeKeyDownErrorAlert);
  document.removeEventListener('click', onErrorMessageClickOutside);
  document.addEventListener('keydown', onDocumentEscapeKeyDownForm);
  formCloseButton.addEventListener('click', closeImageUploadForm);
};

const showErrorAlert = () => {
  errorButton.addEventListener('click', removeErrorAlert);
  document.addEventListener('keydown',onDocumentEscapeKeyDownErrorAlert);
  document.addEventListener('click', onErrorMessageClickOutside);
  body.appendChild(errorMessage);
  formCloseButton.removeEventListener('click', closeImageUploadForm);
  document.removeEventListener('keydown', onDocumentEscapeKeyDownForm);
};

const removeSuccessAlert = () => {
  body.removeChild(successMessage);
  successButton.removeEventListener('click', removeSuccessAlert);
  document.removeEventListener('keydown',onDocumentEscapeKeyDownSuccessAlert);
  document.removeEventListener('click', onSuccessMessageClickOutside);
};

const showSuccessAlert = () => {
  successButton.addEventListener('click', removeSuccessAlert);
  document.addEventListener('keydown',onDocumentEscapeKeyDownSuccessAlert);
  document.addEventListener('click', onSuccessMessageClickOutside);
  body.appendChild(successMessage);
};

function onDocumentEscapeKeyDownErrorAlert (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removeErrorAlert();
  }
}
function onErrorMessageClickOutside (evt) {
  if (!evt.target.matches('.error__inner') && !evt.target.matches('.error__title')) {
    evt.preventDefault();
    removeErrorAlert();
  }
}

function onDocumentEscapeKeyDownSuccessAlert (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removeSuccessAlert();
  }
}

function onSuccessMessageClickOutside (evt) {
  if (!evt.target.matches('.error__inner') && !evt.target.matches('.error__title')) {
    evt.preventDefault();
    removeSuccessAlert();
  }
}

export {showErrorAlert, removeErrorAlert, showSuccessAlert, removeSuccessAlert};
