const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Создание товара
router.post('/', productController.createProduct);

// Получение товаров по фильтрам
router.get('/', productController.getProducts);

module.exports = router;
