import {generateArray, getRandomInteger, getRandomArrayElement} from './util.js';

const PHOTOS_NUMBER = 25;
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = ['messi', 'ronaldo', 'mbappe', 'kroos', 'kane', 'modric', 'donnaruma', 'pickford', 'bellingham', 'vinicius', 'rooney', 'beckham', 'khvicha', 'griezmann', 'nababkin'];
const DESCRIPTIONS = ['#отпуск', '#работа', '#спорт', 'На прогулке', 'в музее', 'семья', 'выходные', '#море', 'на даче', '#горы'];

const idArray = generateArray(1, 25);
const likesArray = generateArray(15, 200);
const commentsArray = generateArray (0, 30);
const commentsIDArray = generateArray(1, 9999);
const avatarsArray = generateArray(1, 5);

const generateRandomPhotoID = getRandomArrayElement(idArray);
const generateDescription = getRandomArrayElement(DESCRIPTIONS);
const generateLikesNum = getRandomArrayElement(likesArray);
const generateCommentsNum = getRandomArrayElement(commentsArray);
const generateCommentsID = getRandomArrayElement(commentsIDArray);
const generateAvatarsNum = getRandomArrayElement(avatarsArray);
const generateMessageText = getRandomArrayElement(MESSAGES);
const generateName = getRandomArrayElement(NAMES);

const getRandomCommentMessage = () => {
  const sentenceNumber = getRandomInteger(1, 2);
  const firstSentence = generateMessageText();
  if (sentenceNumber === 2) {
    let secondSentence = generateMessageText();
    while (secondSentence === firstSentence) {
      secondSentence = generateMessageText();
    }
    return `${firstSentence} ${secondSentence}`;
  } else {
    return firstSentence;
  }
};

const createComment = function() {
  return {
    id: generateCommentsID(),
    avatar: `img/avatar-${ generateAvatarsNum() }.svg`,
    message: getRandomCommentMessage(),
    name: generateName()
  };

};

const createNewPhoto = function(index) {

  return {
    id: index,
    url: `photos/${ generateRandomPhotoID() }.jpg`,
    description: generateDescription(),
    likes: generateLikesNum(),
    comments: Array.from({length: generateCommentsNum()}, createComment)
  };
};

const getPhotos = () => Array.from(
  {length: PHOTOS_NUMBER},
  (_, index) => createNewPhoto(index + 1)
);

const photosDataMock = getPhotos();

export {photosDataMock};

