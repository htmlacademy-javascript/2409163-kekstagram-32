import {isEscapeKey} from './util.js';
import {transformStringToArray} from './util.js';

const MAX_HASHTAG_NUMBER = 5;
const HASHTAG_REG_EXP_VALIDATION = /^#[a-zа-яё0-9]{1,19}$/i;
const HASHTAG_ERROR_TEXT = {
  INVALID_PATTERN: 'Хэштег введён неправильно',
  TOO_MANY_HASHTAGS: `Максимум ${MAX_HASHTAG_NUMBER} хэштегов`,
  NOT_UNIQUE: 'Хэштеги не должны повторяться',
};

const body = document.querySelector('body');
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadController = imgUploadForm.querySelector('.img-upload__input');
const modalSubmitPhoto = document.querySelector('.img-upload__overlay');
const formCloseButton = modalSubmitPhoto.querySelector('.img-upload__cancel');
const hashtagField = modalSubmitPhoto.querySelector('.text__hashtags');
const commentField = modalSubmitPhoto.querySelector('.text__description');

const hasValidPattern = (inputValue) => transformStringToArray(inputValue).every((tag) => HASHTAG_REG_EXP_VALIDATION.test(tag));
const hasValidNumber = (inputValue) => transformStringToArray(inputValue).length <= MAX_HASHTAG_NUMBER;
const hasUniqueTags = (inputValue) => {
  const lowerCaseArray = transformStringToArray(inputValue).map((tag) => tag.toLowerCase());
  return lowerCaseArray.length === new Set(lowerCaseArray).size;
};

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'

});

pristine.addValidator(hashtagField, hasValidPattern, HASHTAG_ERROR_TEXT.INVALID_PATTERN, 3, true);
pristine.addValidator(hashtagField, hasValidNumber, HASHTAG_ERROR_TEXT.TOO_MANY_HASHTAGS, 2, true);
pristine.addValidator(hashtagField, hasUniqueTags, HASHTAG_ERROR_TEXT.NOT_UNIQUE, 1 , true);

const onFormSubmit = (evt) => {
  evt.preventDefault();
};

imgUploadForm.addEventListener('submit', onFormSubmit);

function onEscapeKeyClick(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    imgUploadController.addEventListener('change', showModal);
    closeModal();
  }
}

function ignoreEscape (evt) {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
}

function showModal () {
  modalSubmitPhoto.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onEscapeKeyClick);
  formCloseButton.addEventListener('click', closeModal);
  imgUploadController.removeEventListener('change', showModal);
  imgUploadController.value = '';
  hashtagField.addEventListener('keydown', ignoreEscape);
  commentField.addEventListener('keydown', ignoreEscape);
}

function closeModal () {
  modalSubmitPhoto.classList.add('hidden');
  body.classList.remove('modal-open');

  formCloseButton.removeEventListener('click', closeModal);
  document.removeEventListener('keydown', onEscapeKeyClick);
  imgUploadController.addEventListener('change', showModal);
}

imgUploadController.addEventListener('change', showModal);
