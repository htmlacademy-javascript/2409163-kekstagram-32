import {body, generateRandomTenElementsFromArray} from './util.js';
import {renderThumbnails} from './thumbnails-render.js';
import {getData} from './server_api.js';

const thumbnailsListFiltersContainer = body.querySelector('.img-filters');

const comparePhotoCommentsLength = (photoA, photoB) => photoB.comments.length - photoA.comments.length;

const getPhotosData = async() => {
  try {
    const response = getData();
    return await response;
  } catch {
    return 0;
  }
};

const photosData = await getPhotosData();

const FilterTypes = {
  DEFAULT: 'filter-default',
  RANDOM_TEN: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const showThumbnailsFiltersContainer = () => {
  thumbnailsListFiltersContainer.classList.remove('img-filters--inactive');
};

const onFilterButtonSubmit = (evt) => {


  if (evt.target.classList.contains('img-filters__button--active') || evt.target.classList.contains('img-filters')) {
    return;
  }
  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');
  switch (evt.target.id) {

    case FilterTypes.DEFAULT:
      renderThumbnails(photosData);
      return;

    case FilterTypes.RANDOM_TEN:
      renderThumbnails(generateRandomTenElementsFromArray(photosData));
      return;

    case FilterTypes.DISCUSSED:
      renderThumbnails(photosData.slice().sort(comparePhotoCommentsLength));
  }
};

const addThumbnailsFilterButtonsListeners = () => {
  thumbnailsListFiltersContainer.addEventListener('click', onFilterButtonSubmit);
};

export {showThumbnailsFiltersContainer, addThumbnailsFilterButtonsListeners, onFilterButtonSubmit};

