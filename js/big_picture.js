import {photosData} from './data.js';
import {picturesContainer} from './thumbnails.js';
import {isEscapeKey} from './util.js';

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
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

const renderComments = (items) => {
  //1 Сопоставить блок с комментариями выбранной миниатюре, если урл bigpicture соответствует массиву миниатюр, подставить данные через innerHTML
  //2 Сгенерировать количество элементво списса равное bigPictureShowCommentsNum.textContent
  socialCommentsBlock.innerHTML = '';
  items.forEach((item) => {
    // console.log(item.id, bigPictureImage.id);
    if (item.id === parseInt(bigPictureImage.id, 10)) {
      for (let i = 0; i <= bigPictureShowCommentsNum.textContent - 1; i++) {
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
};

const openBigPicture = (evt) => {
  if (evt.target.matches('.picture__img')) {
    bigPicture.classList.remove('hidden');
    bigPictureImage.src = evt.target.src;
    bigPictureImage.id = evt.target.parentNode.id;
    bigPictureLikes.textContent = evt.target.parentNode.querySelector('.picture__likes').textContent;
    bigPictureShowCommentsNum.textContent = 5;
    bigPictureTotalCommentsNum.textContent = evt.target.parentNode.querySelector('.picture__comments').textContent;
    bigPictureDescription.textContent = evt.target.alt;
    body.classList.add('modal-open');
    socialCommentCount.classList.add('hidden');
    socialCommentLoader.classList.add('hidden');
    document.addEventListener('keydown', onEscapeKeyClick);
    renderComments(photosData);
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

