import {body, debounce, findAndRemoveAllElementsFromContainer, generateRandomTenElementsFromArray} from './util.js';
import {renderThumbnails} from './thumbnails-render.js';

const DEBOUNCE_TIME = 500;
const thumbnailsListFiltersContainer = body.querySelector('.img-filters');

const buttonDefault = thumbnailsListFiltersContainer.querySelector('#filter-default');
const buttonRandomTen = thumbnailsListFiltersContainer.querySelector('#filter-random');
const buttonDiscussed = thumbnailsListFiltersContainer.querySelector('#filter-discussed');

const showThumbnailsFiltersContainer = () => {
  thumbnailsListFiltersContainer.classList.remove('img-filters--inactive');
};

const comparePhotoCommentsLength = (photoA, photoB) => photoB.comments.length - photoA.comments.length;

const changeActiveButton = (button) => {
  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  button.classList.add('img-filters__button--active');
};

const filterThumbnails = (button, data) => {
  findAndRemoveAllElementsFromContainer(document, '.picture');

  if (button === buttonRandomTen) {
    renderThumbnails(generateRandomTenElementsFromArray(data));
    return;
  }

  if (button === buttonDiscussed) {
    renderThumbnails(data.slice().sort(comparePhotoCommentsLength));
  } else {
    renderThumbnails(data);
  }
};

const addThumbnailsFiltersListeners = (data) => {
  const filterThumbnailsDebounce = debounce(filterThumbnails, DEBOUNCE_TIME);
  buttonDefault.addEventListener('click', () => {
    changeActiveButton(buttonDefault);
    filterThumbnailsDebounce.call(this, buttonDefault, data);
  });

  buttonRandomTen.addEventListener('click', () => {
    changeActiveButton(buttonRandomTen);
    filterThumbnailsDebounce.call(this, buttonRandomTen, data);
  });

  buttonDiscussed.addEventListener('click', () => {
    changeActiveButton(buttonDiscussed);
    filterThumbnailsDebounce.call(this, buttonDiscussed, data);
  });
};

export {showThumbnailsFiltersContainer, addThumbnailsFiltersListeners};

