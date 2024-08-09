import {thumbnailsContainer} from './util.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureFragment = document.createDocumentFragment();

const renderThumbnails = (items) => {
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
};

export {renderThumbnails};
