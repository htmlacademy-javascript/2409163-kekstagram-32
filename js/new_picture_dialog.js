const body = document.querySelector('body');
const imgUploadController = document.querySelector('.img-upload__input');
const formEditPhoto = document.querySelector('.img-upload__overlay');

const uploadNewImage = () => {
  formEditPhoto.classList.remove('hidden');
  body.classList.add('modal-open');
};


