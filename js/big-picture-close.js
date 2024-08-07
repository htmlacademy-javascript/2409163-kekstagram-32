import {body, isEscapeKey} from './util.js';
import {addThumbnailsListener, onCommentsLoaderButtonClick} from './big-picture-open.js';

const bigPicture = document.querySelector('.big-picture');
const commentLoaderButton = bigPicture.querySelector('.social__comments-loader');
const BigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const socialCommentsBlock = bigPicture.querySelector('.social__comments');


const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  BigPictureCloseButton.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', onDocumentEscapeKeyDown);
  commentLoaderButton.removeEventListener('click', onCommentsLoaderButtonClick);
  body.classList.remove('modal-open');
  socialCommentsBlock.innerHTML = '';
  commentLoaderButton.classList.remove('hidden');
  addThumbnailsListener();
  socialCommentsBlock.innerHTML = '';
};

function onDocumentEscapeKeyDown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

export {closeBigPicture, onDocumentEscapeKeyDown};
