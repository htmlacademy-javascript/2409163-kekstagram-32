import {imageUploadForm} from './util';

const imageUploadPreview = imageUploadForm.querySelector('img');
const scaleControlValueInput = imageUploadForm.querySelector('.scale__control--value');
const scaleControlSmallerButton = imageUploadForm.querySelector('.scale__control--smaller');
const scaleControlBiggerButton = imageUploadForm.querySelector('.scale__control--bigger');

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
  scaleControlBiggerButton.addEventListener('click', onScaleControlZoomInButton);
  scaleControlSmallerButton.addEventListener('click', onScaleControlZoomOutButton);
};

const removeScaleControlButtonListeners = () => {
  scaleControlBiggerButton.removeEventListener('click', onScaleControlZoomInButton);
  scaleControlSmallerButton.removeEventListener('click', onScaleControlZoomOutButton);
};

export {addScaleControlButtonListeners, removeScaleControlButtonListeners};
