import {body, imageUploadForm, imageUploadPreview, imageUploadOverlay, imageUploadController, formCloseButton, scaleControlValueInput, hashtagField, commentField, isEscapeKey, ignoreEscape} from './util.js';
import {addScaleControlButtonListeners, removeScaleControlButtonListeners} from './form_scale_controller';
import {addFilterListeners, removeFilterListeners, switchFilterToOriginal} from './form_filters.js';

function onEscapeKeyClickModal(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    imageUploadController.addEventListener('change', openImageUploadForm);
    closeImageUploadForm();
  }
}

function openImageUploadForm () {
  imageUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscapeKeyClickModal);
  formCloseButton.addEventListener('click', closeImageUploadForm);
  imageUploadController.removeEventListener('change', openImageUploadForm);
  imageUploadController.value = '';
  switchFilterToOriginal();
  hashtagField.addEventListener('keydown', ignoreEscape);
  commentField.addEventListener('keydown', ignoreEscape);
  addScaleControlButtonListeners();
  addFilterListeners();
}

function closeImageUploadForm () {
  imageUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  formCloseButton.removeEventListener('click', closeImageUploadForm);
  document.removeEventListener('keydown', onEscapeKeyClickModal);
  removeScaleControlButtonListeners();
  removeFilterListeners();
  imageUploadController.addEventListener('change', openImageUploadForm);
  scaleControlValueInput.value = '100%';
  imageUploadPreview.style = '';
  imageUploadForm.querySelector('#effect-none').checked = true;
  hashtagField.value = '';
  commentField.value = '';
}

export {openImageUploadForm, closeImageUploadForm, onEscapeKeyClickModal};
