import {imageUploadForm} from './util.js';

const SCALE_VALUE_DEFAULT = 100;

const imageUploadPreview = imageUploadForm.querySelector('img');
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
  imageUploadPreview.style.filter = `${filterType}(${sliderElement.noUiSlider.get()}${filterUnits[filterType]})`;
};

const switchFilterToOriginal = () => {
  sliderContainer.classList.add('hidden');
  imageUploadPreview.style.filter = '';
  sliderValueInput.value = '';

};

const onRadioOriginalChange = () => switchFilterToOriginal();

const onRadioChromeChange = () => {
  updateSliderOptions(0, 1, 1, 0.1);
  filterType = 'grayscale';
  sliderElement.noUiSlider.on('update', switchSlider);
};

const onRadioSepiaChange = () => {
  updateSliderOptions(0, 1, 1, 0.1);
  filterType = 'sepia';
  sliderElement.noUiSlider.on('update', switchSlider);
};

const onRadioMarvinChange = () => {
  updateSliderOptions(0, 100, 100, 1);
  filterType = 'invert';
  sliderElement.noUiSlider.on('update', switchSlider);
};

const onRadioPhobosChange = () => {
  updateSliderOptions(0, 3, 3, 0.1);
  filterType = 'blur';
  sliderElement.noUiSlider.on('update', switchSlider);
};

const onRadioHeatChange = () => {
  updateSliderOptions(1, 3, 3, 0.1);
  filterType = 'brightness';
  sliderElement.noUiSlider.on('update', switchSlider);
};

const addFilterListeners = () => {
  radioOriginal.addEventListener('change', onRadioOriginalChange);
  radioChrome.addEventListener('change', onRadioChromeChange);
  radioSepia.addEventListener('change', onRadioSepiaChange);
  radioMarvin.addEventListener('change', onRadioMarvinChange);
  radioPhobos.addEventListener('change', onRadioPhobosChange);
  radioHeat.addEventListener('change', onRadioHeatChange);
};

const removeFilterListeners = () => {
  radioOriginal.removeEventListener('change', onRadioOriginalChange);
  radioChrome.removeEventListener('change', onRadioChromeChange);
  radioSepia.removeEventListener('change', onRadioSepiaChange);
  radioMarvin.removeEventListener('change', onRadioMarvinChange);
  radioPhobos.removeEventListener('change', onRadioPhobosChange);
  radioHeat.removeEventListener('change', onRadioHeatChange);
};

export {addFilterListeners, removeFilterListeners, SCALE_VALUE_DEFAULT, switchFilterToOriginal};
