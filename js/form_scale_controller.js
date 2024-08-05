import {imageUploadPreview, scaleControlValueInput, scaleControlSmallerButton, scaleControlBiggerButton} from './util.js';

let SCALE_VALUE = 100;

const zoomInImage = (evt) => {
  evt.preventDefault();
  if (scaleControlValueInput.value === '100%') {
    SCALE_VALUE = 100;
  }

  if (SCALE_VALUE <= 75) {
    SCALE_VALUE += 25;
    scaleControlValueInput.value = `${SCALE_VALUE}%`;
    imageUploadPreview.style.transform = `scale(${SCALE_VALUE / 100})`;
  }
};

const zoomOutImage = (evt) => {
  evt.preventDefault();
  if (scaleControlValueInput.value === '100%') {
    SCALE_VALUE = 100;
  }

  if (SCALE_VALUE >= 50) {
    SCALE_VALUE -= 25;
    scaleControlValueInput.value = `${SCALE_VALUE}%`;
    imageUploadPreview.style.transform = `scale(${SCALE_VALUE / 100})`;
  }
};

const addScaleControlButtonListeners = () => {
  scaleControlBiggerButton.addEventListener('click', zoomInImage);
  scaleControlSmallerButton.addEventListener('click', zoomOutImage);
};

const removeScaleControlButtonListeners = () => {
  scaleControlBiggerButton.removeEventListener('click', zoomInImage);
  scaleControlSmallerButton.removeEventListener('click', zoomOutImage);
};

export {addScaleControlButtonListeners, removeScaleControlButtonListeners};
