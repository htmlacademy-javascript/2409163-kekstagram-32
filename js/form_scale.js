
const imgUploadForm = document.querySelector('.img-upload__form');
const scaleControlSmallerButton = imgUploadForm.querySelector('.scale__control--smaller');
const scaleControlBiggerButton = imgUploadForm.querySelector('.scale__control--bigger');
const scaleControlValueInput = imgUploadForm.querySelector('.scale__control--value');
const imgUploadPreview = imgUploadForm.querySelector('img');


let SCALE_VALUE = 100;


const zoomInImage = (evt) => {
  evt.preventDefault();
  if (scaleControlValueInput.value === '100%') {
    SCALE_VALUE = 100;
  }

  if (SCALE_VALUE <= 75) {
    SCALE_VALUE += 25;
    scaleControlValueInput.value = `${SCALE_VALUE}%`;
    imgUploadPreview.style = `transform: scale(${SCALE_VALUE / 100})`;
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
    imgUploadPreview.style = `transform: scale(${SCALE_VALUE / 100})`;
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

export {imgUploadForm, imgUploadPreview, scaleControlValueInput, addScaleControlButtonListeners, removeScaleControlButtonListeners};
