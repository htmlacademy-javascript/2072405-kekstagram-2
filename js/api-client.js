import { BASE_URL } from './constants.js';
import { checkResponse } from './utils.js';

const handleError = (operation, originalError) => {
  throw new Error(`Ошибка при ${operation}: ${originalError.message}`);
};

const getData = async (endpoint = '/data') => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    return await checkResponse(response);
  } catch (error) {
    handleError('загрузке данных', error);
  }
};


const sendData = async (formData) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      body: formData
    });
    return await checkResponse(response);
  } catch (error) {
    handleError('отправке данных', error);
  }
};

export { getData, sendData };
