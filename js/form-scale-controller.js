import {imageUploadForm} from './util';

const imageUploadPreview = imageUploadForm.querySelector('img');
const scaleControlValueInput = imageUploadForm.querySelector('.scale__control--value');
const scaleControlZoomOutButton = imageUploadForm.querySelector('.scale__control--smaller');
const scaleControlZoomInButton = imageUploadForm.querySelector('.scale__control--bigger');

const SCALE_VALUE_MIN = 25;
const SCALE_VALUE_MAX = 100;
const SCALE_VALUE_STEP = 25;

const onScaleControlZoomInButton = () => {
  if (parseFloat(scaleControlValueInput.value) < SCALE_VALUE_MAX) {
    scaleControlValueInput.value = `${parseFloat(scaleControlValueInput.value) + SCALE_VALUE_STEP}%`;
    imageUploadPreview.style.transform = `scale(${parseFloat(scaleControlValueInput.value) / 100})`;
  }
};

const onScaleControlZoomOutButton = () => {
  if (parseFloat(scaleControlValueInput.value) > SCALE_VALUE_MIN) {
    scaleControlValueInput.value = `${parseFloat(scaleControlValueInput.value) - SCALE_VALUE_STEP}%`;
    imageUploadPreview.style.transform = `scale(${parseFloat(scaleControlValueInput.value) / 100})`;
  }
};

const addScaleControlButtonListeners = () => {
  scaleControlZoomInButton.addEventListener('click', onScaleControlZoomInButton);
  scaleControlZoomOutButton.addEventListener('click', onScaleControlZoomOutButton);
};

const removeScaleControlButtonListeners = () => {
  scaleControlZoomInButton.removeEventListener('click', onScaleControlZoomInButton);
  scaleControlZoomOutButton.removeEventListener('click', onScaleControlZoomOutButton);
};

export {addScaleControlButtonListeners, removeScaleControlButtonListeners};
