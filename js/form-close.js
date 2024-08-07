import {body, imageUploadForm, isEscapeKey} from './util.js';
import {removeScaleControlButtonListeners} from './form-scale-controller';
import {removeFilterListeners} from './form-filters.js';
import {pristine} from './form-validation-submit.js';
import { addImageUploadControllerListener, onImageUploadControllerChange } from './form-open.js';

const imageUploadPreview = imageUploadForm.querySelector('img');
const imageUploadOverlay = document.querySelector('.img-upload__overlay');
const imageUploadController = imageUploadForm.querySelector('.img-upload__input');
const formCloseButton = imageUploadOverlay.querySelector('.img-upload__cancel');
const scaleControlValueInput = imageUploadForm.querySelector('.scale__control--value');
const hashtagField = imageUploadOverlay.querySelector('.text__hashtags');
const commentField = imageUploadOverlay.querySelector('.text__description');

const closeImageUploadForm = () => {
  imageUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  formCloseButton.removeEventListener('click', closeImageUploadForm);
  document.removeEventListener('keydown', onDocumentEscapeKeyDownForm);
  removeScaleControlButtonListeners();
  removeFilterListeners();
  addImageUploadControllerListener();
  scaleControlValueInput.value = '100%';
  imageUploadPreview.style = '';
  imageUploadForm.querySelector('#effect-none').checked = true;
  hashtagField.value = '';
  commentField.value = '';
  imageUploadController.value = '';
  pristine.reset();
};

function onDocumentEscapeKeyDownForm (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    imageUploadController.addEventListener('change', onImageUploadControllerChange);
    closeImageUploadForm();
  }
}

export {closeImageUploadForm, onDocumentEscapeKeyDownForm};
