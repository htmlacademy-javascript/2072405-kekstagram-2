import { BASE_URL } from './constants.js';

const getData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/data`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Ошибка при загрузке данных: ${error.message}`);
  }
};

const sendData = async (formData) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Ошибка при отправке данных: ${error.message}`);
  }
};

export { getData, sendData };
