import {imageUploadForm} from './util.js';

const SCALE_VALUE_DEFAULT = 100;

const imageUploadPreview = imageUploadForm.querySelector('img');
const scaleControlValueInput = imageUploadForm.querySelector('.scale__control--value');
const sliderContainer = imageUploadForm.querySelector('.img-upload__effect-level');
const sliderElement = sliderContainer.querySelector('.effect-level__slider');
const sliderValueInput = sliderContainer.querySelector('.effect-level__value');
const effectsList = imageUploadForm.querySelector('.effects__list');
const radioOriginal = effectsList.querySelector('#effect-none');
const radioChrome = effectsList.querySelector('#effect-chrome');
const radioSepia = effectsList.querySelector('#effect-sepia');
const radioMarvin = effectsList.querySelector('#effect-marvin');
const radioPhobos = effectsList.querySelector('#effect-phobos');
const radioHeat = effectsList.querySelector('#effect-heat');

const filterUnits = {
  grayscale: '',
  sepia: '',
  invert: '%',
  blur: 'px',
  brightness: ''
};

let filterType = '';

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
  imageUploadPreview.style = `filter: ${filterType}(${sliderElement.noUiSlider.get()}${filterUnits[filterType]})`;
  scaleControlValueInput.value = `${SCALE_VALUE_DEFAULT}%`;
};

const switchFilterToOriginal = () => {
  sliderContainer.classList.add('hidden');
  imageUploadPreview.style = '';
  sliderValueInput.value = '';
  scaleControlValueInput.value = `${SCALE_VALUE_DEFAULT}%`;
};

const switchFilterToChrome = () => {
  updateSliderOptions(0, 1, 1, 0.1);
  filterType = 'grayscale';
  sliderElement.noUiSlider.on('update', switchSlider);
};

const switchFilterToSepia = () => {
  updateSliderOptions(0, 1, 1, 0.1);
  filterType = 'sepia';
  sliderElement.noUiSlider.on('update', switchSlider);
};

const switchFilterToMarvin = () => {
  updateSliderOptions(0, 100, 100, 1);
  filterType = 'invert';
  sliderElement.noUiSlider.on('update', switchSlider);
};

const switchFilterToPhobos = () => {
  updateSliderOptions(0, 3, 3, 0.1);
  filterType = 'blur';
  sliderElement.noUiSlider.on('update', switchSlider);
};

const switchFilterToHeat = () => {
  updateSliderOptions(1, 3, 3, 0.1);
  filterType = 'brightness';
  sliderElement.noUiSlider.on('update', switchSlider);
};

const addFilterListeners = () => {
  radioOriginal.addEventListener('change', switchFilterToOriginal);
  radioChrome.addEventListener('change', switchFilterToChrome);
  radioSepia.addEventListener('change', switchFilterToSepia);
  radioMarvin.addEventListener('change', switchFilterToMarvin);
  radioPhobos.addEventListener('change', switchFilterToPhobos);
  radioHeat.addEventListener('change', switchFilterToHeat);
};

const removeFilterListeners = () => {
  radioOriginal.removeEventListener('change', switchFilterToOriginal);
  radioChrome.removeEventListener('change', switchFilterToChrome);
  radioSepia.removeEventListener('change', switchFilterToSepia);
  radioMarvin.removeEventListener('change', switchFilterToMarvin);
  radioPhobos.removeEventListener('change', switchFilterToPhobos);
  radioHeat.removeEventListener('change', switchFilterToHeat);
};

export {addFilterListeners, removeFilterListeners, SCALE_VALUE_DEFAULT, switchFilterToOriginal};
