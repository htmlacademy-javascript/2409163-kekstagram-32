import { imgUploadPreview } from './form_scale.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const sliderContainer = imgUploadForm.querySelector('.img-upload__effect-level');
const sliderElement = sliderContainer.querySelector('.effect-level__slider');
const sliderValueInput = sliderContainer.querySelector('.effect-level__value');
const effectsList = imgUploadForm.querySelector('.effects__list');
const radioOriginal = effectsList.querySelector('#effect-none');
const radioChrome = effectsList.querySelector('#effect-chrome');
const radioSepia = effectsList.querySelector('#effect-sepia');
const radioMarvin = effectsList.querySelector('#effect-marvin');
const radioPhobos = effectsList.querySelector('#effect-phobos');
const radioHeat = effectsList.querySelector('#effect-heat');

let filterType = '';
sliderContainer.classList.add('hidden');

noUiSlider.create(sliderElement, {
  range: {
    min: 0.1,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      return parseFloat(value);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const updateSliderOptions = (minValue, maxValue, startValue, step) => {
  sliderContainer.classList.remove('hidden');
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: minValue,
      max: maxValue,
    },
    start: startValue,
    step: step,
  });
};

const switchSlider = () => {
  sliderValueInput.value = sliderElement.noUiSlider.get();
  imgUploadPreview.style = `filter: ${filterType}(${sliderElement.noUiSlider.get()})`;
};

const switchOriginal = () => {
  sliderContainer.classList.add('hidden');
  imgUploadPreview.style = '';
  sliderValueInput.value = '';
};

const switchChrome = () => {
  updateSliderOptions(0, 1, 1, 0.1);
  filterType = 'grayscale';
  sliderElement.noUiSlider.on('update', switchSlider);
};


const switchSepia = () => {
  updateSliderOptions(0, 1, 1, 0.1);
  filterType = 'sepia';
  sliderElement.noUiSlider.on('update', switchSlider);
};

const switchMarvin = () => {
  updateSliderOptions(0, 100, 100, 1);
  filterType = 'invert';
  sliderElement.noUiSlider.on('update', () => {
    sliderValueInput.value = sliderElement.noUiSlider.get();
    imgUploadPreview.style = `filter: ${filterType}(${sliderElement.noUiSlider.get()}%)`;
  });
};

const switchPhobos = () => {
  updateSliderOptions(0, 3, 3, 0.1);
  filterType = 'blur';
  sliderElement.noUiSlider.on('update', switchSlider);
};

const switchHeat = () => {
  updateSliderOptions(1, 3, 3, 0.1);
  filterType = 'brightness';
  sliderElement.noUiSlider.on('update', switchSlider);
};

const addFilterListeners = () => {
  radioOriginal.addEventListener('change', switchOriginal);
  radioChrome.addEventListener('change', switchChrome);
  radioSepia.addEventListener('change', switchSepia);
  radioMarvin.addEventListener('change', switchMarvin);
  radioPhobos.addEventListener('change', switchPhobos);
  radioHeat.addEventListener('change', switchHeat);
};

const removeFilterListeners = () => {
  radioOriginal.removeEventListener('change', switchOriginal);
  radioChrome.removeEventListener('change', switchChrome);
  radioSepia.removeEventListener('change', switchSepia);
  radioMarvin.removeEventListener('change', switchMarvin);
  radioPhobos.removeEventListener('change', switchPhobos);
  radioHeat.removeEventListener('change', switchHeat);
};

export {addFilterListeners, removeFilterListeners};
