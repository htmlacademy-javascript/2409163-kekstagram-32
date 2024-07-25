const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture'); //шаблон picture, который будем клонировать
const picturesContainer = document.querySelector('.pictures'); //контейнер, куда будем вставлять клоны шаблона с данными
const pictureFragment = document.createDocumentFragment();

const renderThumbnails = (items) => {
  items.forEach((item) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.id = item.id;
    const pictureImage = pictureElement.querySelector('.picture__img');
    pictureImage.src = item.url;
    pictureImage.alt = item.description;

    const pictureLikes = pictureElement.querySelector('.picture__likes');
    pictureLikes.textContent = item.likes;

    const pictureComments = pictureElement.querySelector('.picture__comments');
    pictureComments.textContent = item.comments.length;

    pictureFragment.appendChild(pictureElement);

  });
  picturesContainer.appendChild(pictureFragment);
};
export {renderThumbnails, picturesContainer};
