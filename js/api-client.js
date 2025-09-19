import { BASE_URL } from './constants.js';
import { checkResponse } from './utils.js';

const handleError = (operation, originalError) => {
  const errorInfo = {
    operation,
    message: originalError.message,
    status: originalError.status || 'unknown',
    timestamp: new Date().toISOString()
  };

  // eslint-disable-next-line no-console
  console.error('ERROR DETAILS:', errorInfo);

  const userMessage = `Ошибка при ${operation}: ${originalError.message}`;
  throw new Error(userMessage);
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
