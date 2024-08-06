import {body, thumbnailsContainer, debounce, generateRandomTenElementsFromArray, RemoveAllElementsFromArray} from './util.js';
import {renderThumbnails} from './thumbnails-render.js';

const ThumbnailsListFilters = body.querySelector('.img-filters');
const ThumbnailsFilterDefaultButton = ThumbnailsListFilters.querySelector('#filter-default');
const ThumbnailsFilterRandomButton = ThumbnailsListFilters.querySelector('#filter-random');
const ThumbnailsFilterSortDiscussedButton = ThumbnailsListFilters.querySelector('#filter-discussed');
const renderedThumbnails = thumbnailsContainer.getElementsByClassName('picture');

const addThumbnailsFilterDefaultButtonListener = (dataToFilter) => {
  ThumbnailsFilterDefaultButton.addEventListener('click', debounce(
    (evt) => {
      evt.preventDefault();
      RemoveAllElementsFromArray(renderedThumbnails);
      renderThumbnails(dataToFilter);
    },
    500,
  ));
};

const addThumbnailsFilterRandomButtonListener = (dataToFilter) => {
  ThumbnailsFilterRandomButton.addEventListener('click', debounce(
    (evt) => {
      evt.preventDefault();
      RemoveAllElementsFromArray(renderedThumbnails);
      renderThumbnails(generateRandomTenElementsFromArray(dataToFilter));
    },
    500,
  ));
};

const addThumbnailsFilterSortDiscussedButtonListener = (dataToFilter) => {
  const comparePhotoCommentsLength = (photoA, photoB) => photoB.comments.length - photoA.comments.length;
  ThumbnailsFilterSortDiscussedButton.addEventListener('click', debounce(
    (evt) => {
      evt.preventDefault();
      RemoveAllElementsFromArray(renderedThumbnails);
      renderThumbnails(dataToFilter.slice().sort(comparePhotoCommentsLength));
    },
    500,
  ));
};

const addThumbnailsFilterButtonsListeners = (dataToFilter) => {
  addThumbnailsFilterDefaultButtonListener(dataToFilter);
  addThumbnailsFilterRandomButtonListener(dataToFilter);
  addThumbnailsFilterSortDiscussedButtonListener(dataToFilter);
};

export {ThumbnailsListFilters, addThumbnailsFilterButtonsListeners};


