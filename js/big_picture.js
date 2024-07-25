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

const COMMENTS_NUMBER_TO_RENDER = 5;
let renderedComments = 0;


const generateCommentElements = (item, amount) => {
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

const generateCommentsFromData = (items) => {

  items.forEach((item) => {

    const commentsToRender = (item.comments.length - renderedComments) < COMMENTS_NUMBER_TO_RENDER ? item.comments.length - renderedComments : COMMENTS_NUMBER_TO_RENDER;
    if (item.id === parseInt(bigPictureImage.id, 10)) {

      generateCommentElements(item, commentsToRender);
      renderedComments += commentsToRender;
      console.log(`Всего комментов: ${item.comments.length}`);
      console.log(`Отрисовано комментов: ${renderedComments}`);
      console.log(`Нужно отрисовать: ${commentsToRender}`);
      if (renderedComments >= item.comments.length) {
        socialCommentLoader.classList.add('hidden');
      }
    }

  });
  bigPictureShowCommentsNum.textContent = socialCommentsBlock.querySelectorAll('.social__comment').length;

};

const generatePhotoComments = () => generateCommentsFromData(photosData);

const onEscapeKeyClick = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const openBigPicture = (evt) => {
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

    if (bigPictureTotalCommentsNum.textContent <= 5) {
      socialCommentLoader.classList.add('hidden');
    }

    document.addEventListener('keydown', onEscapeKeyClick);
    generatePhotoComments();
    socialCommentLoader.addEventListener('click', generatePhotoComments);
    picturesContainer.removeEventListener('click', openBigPicture);
  }
};


const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onEscapeKeyClick);
  socialCommentLoader.removeEventListener('click', generatePhotoComments);
  body.classList.remove('modal-open');
  socialCommentsBlock.innerHTML = '';
  socialCommentLoader.classList.remove('hidden');
  picturesContainer.addEventListener('click', openBigPicture);
  renderedComments = 0;
};


picturesContainer.addEventListener('click', openBigPicture);
BigPictureCloseButton.addEventListener('click', closeBigPicture);

