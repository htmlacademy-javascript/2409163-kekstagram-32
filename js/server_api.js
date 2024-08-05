import {showErrorDataMessage} from './util.js';

const SERVER_URL_POST = 'https://32.javascript.htmlacademy.pro/kekstagram';
const SERVER_URL_GET = `${SERVER_URL_POST}/data`;

const getDataFromServer = async () => {
  let response;
  try {
    response = await fetch(SERVER_URL_GET);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error('Сервер прислал что-то не то');
  } catch (err) {
    showErrorDataMessage();
  }
};

const photosData = await(getDataFromServer());

const sendDataToServer = (onSuccess, onFail, body) => {
  fetch(
    SERVER_URL_POST,
    {
      method: 'POST',
      body: body,
    },
  )
    .then(()=> {
      if (response.ok) {
        onSuccess();
      } else {
        throw new Error('Данные невалидны');
      }
    })
    .catch((err) => {
      onFail();
    });
};

export {photosData, sendDataToServer};
