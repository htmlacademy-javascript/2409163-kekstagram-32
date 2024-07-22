import {photosData} from './data.js';
import {picturesContainer} from './thumbnails.js';
import {isEscapeKey} from './util.js';

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const socialCommentLoader = bigPicture.querySelector('.social__comments-loader');
const bigPictureShowCommentsNum = bigPicture.querySelector('.social__comment-shown-count');
const bigPictureTotalCommentsNum = bigPicture.querySelector('.social__comment-total-count');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const BigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const socialCommentsBlock = bigPicture.querySelector('.social__comments');


const onEscapeKeyClick = (evt) => {
  if (isEscapeKey(evt)) {
    bigPicture.classList.add('hidden');
  }
};

const renderFiveComments = (items) => {
  const renderedComments = socialCommentsBlock.querySelectorAll('.social__comment').length;
  const commentsToRender = (bigPictureTotalCommentsNum.textContent - renderedComments) < 5 ? bigPictureTotalCommentsNum.textContent - renderedComments : 5;

  items.forEach((item) => {
    if (item.id === parseInt(bigPictureImage.id, 10)) {
      for (let i = 0; i < commentsToRender; i++) {
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
    }
  });
  bigPictureShowCommentsNum.textContent = socialCommentsBlock.querySelectorAll('.social__comment').length;
  if (commentsToRender < 5) {
    socialCommentLoader.classList.add('hidden');
  }

};

const renderFiveCommentsFromData = () => renderFiveComments(photosData);

const openBigPicture = (evt) => {
  if (evt.target.matches('.picture__img')) {
    bigPicture.classList.remove('hidden');
    bigPictureImage.src = evt.target.src;
    bigPictureImage.id = evt.target.parentNode.id;
    bigPictureLikes.textContent = evt.target.parentNode.querySelector('.picture__likes').textContent;
    bigPictureShowCommentsNum.textContent = evt.target.parentNode.querySelector('.picture__comments').textContent < 5 ? evt.target.parentNode.querySelector('.picture__comments').textContent : 5;
    bigPictureTotalCommentsNum.textContent = evt.target.parentNode.querySelector('.picture__comments').textContent;
    bigPictureDescription.textContent = evt.target.alt;
    body.classList.add('modal-open');
    socialCommentsBlock.innerHTML = '';

    if (parseInt(bigPictureTotalCommentsNum.textContent, 10) <= 5) {
      socialCommentLoader.classList.add('hidden');
    }

    document.addEventListener('keydown', onEscapeKeyClick);
    renderFiveCommentsFromData();
    socialCommentLoader.addEventListener('click', renderFiveCommentsFromData);
  }
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onEscapeKeyClick);
  body.classList.remove('modal-open');
  socialCommentsBlock.innerHTML = '';
};


picturesContainer.addEventListener('click', openBigPicture);
BigPictureCloseButton.addEventListener('click', closeBigPicture);

