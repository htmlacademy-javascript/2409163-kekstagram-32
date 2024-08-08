import {thumbnailsContainer, findAndRemoveAllElementsFromContainer, debounce} from './util.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture'); //шаблон picture, который будем клонировать
const pictureFragment = document.createDocumentFragment();

const renderThumbnails = (items) => {
  debounce(() => {
    findAndRemoveAllElementsFromContainer(document, '.picture');
    items.forEach((item) => {
      const pictureElement = pictureTemplate.cloneNode(true);
      const pictureImage = pictureElement.querySelector('.picture__img');
      const pictureLikes = pictureElement.querySelector('.picture__likes');
      const pictureComments = pictureElement.querySelector('.picture__comments');
      pictureElement.id = item.id;
      pictureImage.src = item.url;
      pictureImage.alt = item.description;
      pictureLikes.textContent = item.likes;
      pictureComments.textContent = item.comments.length;
      pictureFragment.appendChild(pictureElement);
    });
    thumbnailsContainer.appendChild(pictureFragment);
  },
  500,
  )();
};

export {renderThumbnails};
