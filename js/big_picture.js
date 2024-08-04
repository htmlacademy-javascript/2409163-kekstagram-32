import {photosData} from './server_api.js';
import {body, picturesContainer, isEscapeKey} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const commentLoaderButton = bigPicture.querySelector('.social__comments-loader');
const bigPictureShowCommentsNum = bigPicture.querySelector('.social__comment-shown-count');
const bigPictureTotalCommentsNum = bigPicture.querySelector('.social__comment-total-count');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const BigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const socialCommentsBlock = bigPicture.querySelector('.social__comments');

const COMMENTS_NUMBER_TO_RENDER = 5;
let renderedComments = 0;

const renderCommentsToCommentsBlock = (item, amount) => {
  for (let i = 0; i < amount; i++) {
    socialCommentsBlock.insertAdjacentHTML('afterbegin', `
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

const renderCommentsFromData = (items) => {
  items.forEach((item) => {
    if (item.id === parseFloat(bigPictureImage.id)) {
      const photoCommentsNumber = item.comments.length;
      const commentsToRender = (photoCommentsNumber - renderedComments) < COMMENTS_NUMBER_TO_RENDER ? item.comments.length - renderedComments : COMMENTS_NUMBER_TO_RENDER;
      renderCommentsToCommentsBlock(item, commentsToRender);
      renderedComments += commentsToRender;

      if (renderedComments >= photoCommentsNumber) {
        commentLoaderButton.classList.add('hidden');
      }
    }
  });
  bigPictureShowCommentsNum.textContent = socialCommentsBlock.querySelectorAll('.social__comment').length;
};

const renderCommentsFromPhotosData = () => renderCommentsFromData(photosData);

function openBigPicture (evt) {
  if (evt.target.matches('.picture__img')) {
    bigPicture.classList.remove('hidden');
    bigPictureImage.src = evt.target.src;
    bigPictureImage.id = evt.target.parentNode.id;
    bigPictureLikes.textContent = evt.target.parentNode.querySelector('.picture__likes').textContent;

    bigPictureShowCommentsNum.textContent = evt.target.parentNode.querySelector('.picture__comments').textContent < COMMENTS_NUMBER_TO_RENDER ?
      evt.target.parentNode.querySelector('.picture__comments').textContent :
      COMMENTS_NUMBER_TO_RENDER;

    bigPictureTotalCommentsNum.textContent = evt.target.parentNode.querySelector('.picture__comments').textContent;
    bigPictureDescription.textContent = evt.target.alt;
    body.classList.add('modal-open');
    socialCommentsBlock.innerHTML = '';
    renderCommentsFromPhotosData();

    if (bigPictureTotalCommentsNum.textContent <= 5) {
      commentLoaderButton.classList.add('hidden');
    }

    BigPictureCloseButton.addEventListener('click', closeBigPicture);
    document.addEventListener('keydown', closeBigPictureOnEscapeKeyClick);
    commentLoaderButton.addEventListener('click', renderCommentsFromPhotosData);
    picturesContainer.removeEventListener('click', openBigPicture);
  }
}

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  BigPictureCloseButton.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', closeBigPictureOnEscapeKeyClick);
  commentLoaderButton.removeEventListener('click', renderCommentsFromPhotosData);
  body.classList.remove('modal-open');
  socialCommentsBlock.innerHTML = '';
  commentLoaderButton.classList.remove('hidden');
  picturesContainer.addEventListener('click', openBigPicture);
  renderedComments = 0;
}

function closeBigPictureOnEscapeKeyClick(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

export {openBigPicture};
