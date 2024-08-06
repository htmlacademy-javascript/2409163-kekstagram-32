import {body, imageUploadForm, ignoreEscape} from './util.js';
import {addScaleControlButtonListeners} from './form-scale-controller';
import {addFilterListeners, switchFilterToOriginal} from './form-filters.js';
import {closeImageUploadForm, onDocumentEscapeKeyDownForm} from './form-close.js';
import { setFormSubmit } from './form-validation-submit.js';

const imageUploadPreview = imageUploadForm.querySelector('img');
const imageUploadOverlay = document.querySelector('.img-upload__overlay');
const imageUploadController = imageUploadForm.querySelector('.img-upload__input');
const formCloseButton = imageUploadOverlay.querySelector('.img-upload__cancel');
const hashtagField = imageUploadOverlay.querySelector('.text__hashtags');
const commentField = imageUploadOverlay.querySelector('.text__description');

const imageTypes = ['gif', 'jpeg', 'jpg', 'gif', 'png'];

const renderImagePreview = () => {
  const userImage = imageUploadController.files[0];
  const imageName = userImage.name.toLowerCase();
  const matchesToType = imageTypes.some((type) => imageName.endsWith(type));

  if (matchesToType) {
    imageUploadPreview.src = URL.createObjectURL(userImage);
    const imageEffectsPreviewCollection = imageUploadForm.querySelectorAll('.effects__preview');
    imageEffectsPreviewCollection.forEach((image) => {
      image.style = `background-image: url("${imageUploadPreview.src}");`;
    });
  }
};

const onImageUploadControllerChange = () => {
  imageUploadOverlay.classList.remove('hidden');
  renderImagePreview();
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentEscapeKeyDownForm);
  formCloseButton.addEventListener('click', closeImageUploadForm);
  imageUploadController.removeEventListener('change', onImageUploadControllerChange);
  switchFilterToOriginal();
  hashtagField.addEventListener('keydown', ignoreEscape);
  commentField.addEventListener('keydown', ignoreEscape);
  addScaleControlButtonListeners();
  addFilterListeners();
  setFormSubmit();
};

const addImageUploadControllerListener = () => {
  imageUploadController.addEventListener('change', onImageUploadControllerChange);
};

export {onImageUploadControllerChange, addImageUploadControllerListener};
