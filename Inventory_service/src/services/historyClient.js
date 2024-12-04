// src/services/historyClient.js
const axios = require('axios');
const axiosRetry = require('axios-retry'); // Убедитесь, что импорт правильный
const logger = require('../utils/logger');
require('dotenv').config();

const HISTORY_SERVICE_URL = process.env.HISTORY_SERVICE_URL || 'http://localhost:5000/api/history';
const MAX_RETRIES = 3; // Максимальное количество попыток
const RETRY_DELAY = 2000; // Задержка между попытками в миллисекундах

// Настройка повторных попыток для axios
axiosRetry(axios, {
  retries: MAX_RETRIES,
  retryDelay: (retryCount) => {
    const delay = retryCount * RETRY_DELAY; // Увеличивающаяся задержка (2s, 4s, 6s)
    logger.warn(`Попытка повторной отправки (${retryCount}) через ${delay / 1000} секунд...`);
    return delay;
  },
  retryCondition: (error) => {
    // Повторять запросы только при сетевых ошибках или 5xx статусах
    return axiosRetry.isNetworkOrIdempotentRequestError(error) || (error.response && error.response.status >= 500);
  },
});

/**
 * Функция для отправки истории в History Service с логированием и повторными попытками
 * @param {Object} data - Данные события для отправки
 */
const sendHistory = async (data) => {
  try {
    logger.info(`Отправка события в History Service: ${JSON.stringify(data)}`);

    const response = await axios.post(HISTORY_SERVICE_URL, data, {
      timeout: 5000, // Таймаут запроса (например, 5 секунд)
    });

    logger.info(`Событие успешно отправлено. Статус: ${response.status}`);
  } catch (error) {
    if (error.response) {
      // Сервер ответил с кодом состояния, указывающим на ошибку
      logger.error(`Ошибка при отправке события. Статус: ${error.response.status}. Сообщение: ${JSON.stringify(error.response.data)}`);
    } else if (error.request) {
      // Запрос был сделан, но ответ не получен
      logger.error(`Не удалось получить ответ от History Service. Ошибка: ${error.message}`);
    } else {
      // Произошла ошибка при настройке запроса
      logger.error(`Ошибка при настройке запроса: ${error.message}`);
    }

    // Дополнительная обработка после всех попыток
    logger.error('Не удалось отправить событие после всех попыток.');
    // Здесь можно реализовать сохранение события для последующей отправки или другие меры
  }
};

module.exports = { sendHistory };
