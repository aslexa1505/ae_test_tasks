const { Product } = require('../models');
const { Op } = require('sequelize');
const { sendHistory } = require('../services/historyClient');

exports.createProduct = async (req, res, next) => {
  try {
    const { plu, name } = req.body;
    if (!plu || !name) {
      return res.status(400).json({ message: 'PLU и название обязательны' });
    }

    const existingProduct = await Product.findOne({ where: { plu } });
    if (existingProduct) {
      return res.status(409).json({ message: 'Товар с таким PLU уже существует' });
    }

    const product = await Product.create({ plu, name });

    // Отправка события создания товара
    await sendHistory({
      shopId: null, // Так как товар создается глобально, без привязки к магазину
      plu: product.plu,
      action: 'CREATE_PRODUCT',
      timestamp: new Date(),
    });

    return res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const { name, plu } = req.query;
    const where = {};

    if (name) {
      where.name = { [Op.iLike]: `%${name}%` };
    }

    if (plu) {
      where.plu = { [Op.eq]: plu };
    }

    const products = await Product.findAll({ where });
    return res.json(products);
  } catch (error) {
    next(error);
  }
};
