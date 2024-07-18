const PICTURE_TEMPLATE = document.querySelector('#picture').content.querySelector('.picture'); //шаблон picture, который будем клонировать
const PICTURES_CONTAINER = document.querySelector('.pictures'); //контейнер, куда будем вставлять клоны шаблона с данными
const pictureFragment = document.createDocumentFragment();

const renderThumbnails = (items) => {
  items.forEach((item) => {
    const pictureElem = PICTURE_TEMPLATE.cloneNode(true);

    const pictureImage = pictureElem.querySelector('.picture__img');
    pictureImage.src = item.url;
    pictureImage.alt = item.description;

    const pictureLikes = pictureElem.querySelector('.picture__likes');
    pictureLikes.textContent = item.likes;

    const pictureComments = pictureElem.querySelector('.picture__comments');
    pictureComments.textContent = item.comments.length;

    pictureFragment.appendChild(pictureElem);

  });
  PICTURES_CONTAINER.appendChild(pictureFragment);
};
export {renderThumbnails};

// На основе временных данных для разработки и шаблона #picture создайте DOM-элементы, соответствующие фотографиям, и заполните их данными:

// Адрес изображения url подставьте как атрибут src изображения.
// Описание изображения description подставьте в атрибут alt изображения.
// Количество лайков likes выведите в блок .picture__likes.
// Количество комментариев comments выведите в блок .picture__comments.
// Отрисуйте сгенерированные DOM-элементы в блок .pictures. Для вставки элементов используйте DocumentFragment.

// Подключите модуль в проект.
