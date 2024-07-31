const imgUploadForm = document.querySelector('.img-upload__form');
const scaleControlSmallerButton = imgUploadForm.querySelector('.scale__control--smaller');
const scaleControlBiggerButton = imgUploadForm.querySelector('.scale__control--bigger');
const scaleControlValueInput = imgUploadForm.querySelector('.scale__control--value');
const imgUploadPreview = imgUploadForm.querySelector('.img-upload__preview');


let SCALE_VALUE = 100;


const zoomInImage = (evt) => {
  evt.preventDefault();
  if (SCALE_VALUE <= 75) {
    SCALE_VALUE += 25;
    scaleControlValueInput.value = `${SCALE_VALUE}%`;
    imgUploadPreview.style = `transform: scale(${SCALE_VALUE / 100})`;
  }
};

const zoomOutImage = (evt) => {
  evt.preventDefault();
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

export {imgUploadForm, imgUploadPreview, addScaleControlButtonListeners, removeScaleControlButtonListeners};
