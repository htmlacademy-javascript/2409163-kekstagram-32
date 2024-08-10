import {body, isEscapeKey} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const commentLoaderButton = bigPicture.querySelector('.social__comments-loader');
const BigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const socialCommentsBlock = bigPicture.querySelector('.social__comments');

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  BigPictureCloseButton.removeEventListener('click', onBigPictureCloseButtonClick);
  document.removeEventListener('keydown', onDocumentEscapeKeyDown);
  body.classList.remove('modal-open');
  socialCommentsBlock.innerHTML = '';
  commentLoaderButton.classList.remove('hidden');
  socialCommentsBlock.innerHTML = '';
};

function onDocumentEscapeKeyDown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

function onBigPictureCloseButtonClick () {
  closeBigPicture();
}

export {onBigPictureCloseButtonClick, onDocumentEscapeKeyDown};
