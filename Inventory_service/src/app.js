const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const stockRoutes = require('./routes/stockRoutes');

const app = express();
app.use(bodyParser.json());

// Маршруты
// app.use('/', () => console.log("HELLO WORLD"));
app.use('/api/products', productRoutes);
app.use('/api/stocks', stockRoutes);

// Обработка ошибок
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  });

  // Запуск сервера
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
