import {photosData} from './server_api.js';
import {body, thumbnailsContainer} from './util.js';
import {closeBigPicture, onDocumentEscapeKeyDown} from './big-picture-close.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const commentLoaderButton = bigPicture.querySelector('.social__comments-loader');
const bigPictureRenderedCommentsCounter = bigPicture.querySelector('.social__comment-shown-count');
const bigPictureTotalCommentsCounter = bigPicture.querySelector('.social__comment-total-count');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const BigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const socialCommentsBlock = bigPicture.querySelector('.social__comments');

const COMMENTS_TO_RENDER_BY_DEFAULT = 5;

const insertCommentsToContainer = (item, amount, container) => {
  for (let i = 0; i < amount; i++) {
    container.insertAdjacentHTML('afterbegin', `
      <li class="social__comment">
        <img
          class="social__picture"
          src="${item.comments[i].avatar}"
          alt="${item.comments[i].name}"
          width="35" height="35">
        <p class="social__text">"${item.comments[i].message}"</p>
      </li>
    `);
  }
};

const renderCommentsFromData = (data) => {
  data.forEach((item) => {
    const renderedComments = socialCommentsBlock.querySelectorAll('.social__comment').length;
    if (item.id === parseFloat(bigPictureImage.id)) {
      const commentsNumberOverall = item.comments.length;
      const commentsToRender = (commentsNumberOverall - renderedComments) < COMMENTS_TO_RENDER_BY_DEFAULT ? commentsNumberOverall - renderedComments : COMMENTS_TO_RENDER_BY_DEFAULT;
      insertCommentsToContainer(item, commentsToRender, socialCommentsBlock);
      bigPictureRenderedCommentsCounter.textContent = socialCommentsBlock.querySelectorAll('.social__comment').length;
      bigPictureTotalCommentsCounter.textContent = commentsNumberOverall;

      if (commentsNumberOverall <= COMMENTS_TO_RENDER_BY_DEFAULT || parseFloat(bigPictureRenderedCommentsCounter.textContent) === commentsNumberOverall) {
        commentLoaderButton.classList.add('hidden');
      }
    }
  });
};

const onCommentsLoaderButtonClick = () => renderCommentsFromData(photosData);

const onThumbnailsClick = (evt) => {
  if (evt.target.matches('.picture__img')) {
    body.classList.add('modal-open');
    bigPicture.classList.remove('hidden');
    bigPictureImage.src = evt.target.src;
    bigPictureImage.id = evt.target.parentNode.id;
    bigPictureLikes.textContent = evt.target.parentNode.querySelector('.picture__likes').textContent;
    bigPictureTotalCommentsCounter.textContent = evt.target.parentNode.querySelector('.picture__comments').textContent;
    bigPictureDescription.textContent = evt.target.alt;
    socialCommentsBlock.innerHTML = '';
    renderCommentsFromData(photosData);
    BigPictureCloseButton.addEventListener('click', closeBigPicture);
    document.addEventListener('keydown', onDocumentEscapeKeyDown);
    commentLoaderButton.addEventListener('click', onCommentsLoaderButtonClick);
    thumbnailsContainer.removeEventListener('click', onThumbnailsClick);
  }
};

const addThumbnailsListener = () => {
  thumbnailsContainer.addEventListener('click', onThumbnailsClick);
};

export {addThumbnailsListener, onThumbnailsClick, onCommentsLoaderButtonClick};
