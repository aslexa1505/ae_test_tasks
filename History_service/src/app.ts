import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import historyRoutes from './routes/historyRoutes';
import sequelize from './config/database';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(bodyParser.json());

// Маршруты
app.use('/api/history', historyRoutes);

// Проверка подключения к базе данных
sequelize
  .authenticate()
  .then(() => {
    console.log('Подключение к базе данных успешно установлено.');
  })
  .catch((err: any) => {
    console.error('Невозможно подключиться к базе данных:', err);
  });

// Обработка ошибок
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Внутренняя ошибка сервера' });
});

// Запуск сервера
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`History Service запущен на порту ${PORT}`);
});
