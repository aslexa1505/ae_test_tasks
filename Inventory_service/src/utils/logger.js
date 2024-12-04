// src/utils/logger.js
const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');

// Форматирование логов
const logFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.printf(
    (info) => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`
  )
);

// Транспорт для записи логов в файл с ежедневной ротацией
const fileTransport = new transports.DailyRotateFile({
  filename: 'logs/application-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d', // Хранить логи за последние 14 дней
});

// Транспорт для вывода логов в консоль (в разработке)
const consoleTransport = new transports.Console({
  format: format.combine(format.colorize(), logFormat),
});

// Создание логгера
const logger = createLogger({
  level: 'info', // Уровень логирования (можно настроить через переменные окружения)
  format: logFormat,
  transports: [
    fileTransport,
    consoleTransport, // Добавьте этот транспорт только в среду разработки
  ],
  exceptionHandlers: [
    new transports.File({ filename: 'logs/exceptions.log' }),
    consoleTransport,
  ],
  rejectionHandlers: [
    new transports.File({ filename: 'logs/rejections.log' }),
    consoleTransport,
  ],
});

module.exports = logger;
