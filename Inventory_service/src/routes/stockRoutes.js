const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

// Создание остатка
router.post('/', stockController.createStock);

// Увеличение остатка
router.put('/increase', stockController.increaseStock);

// Уменьшение остатка
router.put('/decrease', stockController.decreaseStock);

// Получение остатков по фильтрам
router.get('/', stockController.getStocks);

module.exports = router;
