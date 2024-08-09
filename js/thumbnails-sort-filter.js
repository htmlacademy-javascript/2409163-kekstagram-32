import {body, debounce, findAndRemoveAllElementsFromContainer, generateRandomTenElementsFromArray} from './util.js';
import {renderThumbnails} from './thumbnails-render.js';

const thumbnailsListFiltersContainer = body.querySelector('.img-filters');

const comparePhotoCommentsLength = (photoA, photoB) => photoB.comments.length - photoA.comments.length;
const FilterTypes = {
  DEFAULT: 'filter-default',
  RANDOM_TEN: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const showThumbnailsFiltersContainer = () => {
  thumbnailsListFiltersContainer.classList.remove('img-filters--inactive');
};

const onFilterButtonSubmit = (evt, data) => {
  if (evt.target.classList.contains('img-filters__button--active') || evt.target.classList.contains('img-filters')) {
    return;
  }

  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');

  if (evt.target.id === FilterTypes.RANDOM_TEN) {
    debounce(() => {
      findAndRemoveAllElementsFromContainer(document, '.picture');
      renderThumbnails(generateRandomTenElementsFromArray(data));
    },
    500
    )();
    return;

  }
  if (evt.target.id === FilterTypes.DISCUSSED) {
    debounce(() => {
      findAndRemoveAllElementsFromContainer(document, '.picture');
      renderThumbnails(data.slice().sort(comparePhotoCommentsLength));
    },
    500
    )();

  } else {
    debounce(() => {
      findAndRemoveAllElementsFromContainer(document, '.picture');
      renderThumbnails(data);
    },
    500
    )();
  }
};

const addThumbnailsFiltersListener = (cb) => {
  thumbnailsListFiltersContainer.addEventListener('click',(evt) => onFilterButtonSubmit(evt, cb));
};
export {showThumbnailsFiltersContainer, addThumbnailsFiltersListener};

