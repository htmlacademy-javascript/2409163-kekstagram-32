import {body, thumbnailsContainer} from './util.js';
import {onBigPictureCloseButtonClick, onDocumentEscapeKeyDown} from './big-picture-close.js';

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

const commentFragment = document.createDocumentFragment();

const insertCommentsToContainer = (item, amount, container) => {
  for (let i = 0; i < amount; i++) {
    const socialComment = document.createElement('li');
    socialComment.classList.add('social__comment');

    const socialPicture = document.createElement('img');
    socialPicture.classList.add('social__picture');
    socialPicture.src = `${item.comments[i].avatar}`;
    socialPicture.alt = `${item.comments[i].name}`;
    socialPicture.width = 35;
    socialPicture.height = 35;

    const socialText = document.createElement('p');
    socialText.classList.add('social__text');
    socialText.textContent = `${item.comments[i].message}`;

    socialComment.appendChild(socialPicture);
    socialComment.appendChild(socialText);

    commentFragment.appendChild(socialComment);
  }
  container.appendChild(commentFragment);
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

const onCommentsLoaderButtonClick = (data) => renderCommentsFromData(data);

const addCommentLoaderListener = (data) => {
  commentLoaderButton.addEventListener('click', () => onCommentsLoaderButtonClick(data));
};

const onThumbnailsClick = (evt, data) => {
  if (evt.target.matches('.picture__img')) {
    body.classList.add('modal-open');
    bigPicture.classList.remove('hidden');
    bigPictureImage.src = `photos/${parseFloat(evt.target.parentNode.id) + 1}.jpg`;
    bigPictureImage.id = evt.target.parentNode.id;
    bigPictureLikes.textContent = evt.target.parentNode.querySelector('.picture__likes').textContent;
    bigPictureTotalCommentsCounter.textContent = evt.target.parentNode.querySelector('.picture__comments').textContent;
    bigPictureDescription.textContent = evt.target.alt;
    socialCommentsBlock.innerHTML = '';
    renderCommentsFromData(data);
    BigPictureCloseButton.addEventListener('click', onBigPictureCloseButtonClick);
    document.addEventListener('keydown', onDocumentEscapeKeyDown);
  }
};

const addThumbnailsListener = (data) => {
  thumbnailsContainer.addEventListener('click',(evt) => onThumbnailsClick(evt, data));
};

export {addThumbnailsListener, onThumbnailsClick, addCommentLoaderListener};
