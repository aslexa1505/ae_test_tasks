const { Stock, Product, Shop } = require('../models');
const { Op } = require('sequelize');
const { sendHistory } = require('../services/historyClient');

exports.createStock = async (req, res, next) => {
  try {
    const { productId, shopId, quantityOnShelf, quantityInOrder } = req.body;

    if (!productId || !shopId) {
      return res.status(400).json({ message: 'productId и shopId обязательны' });
    }

    // Проверка существования продукта и магазина
    const product = await Product.findByPk(productId);
    const shop = await Shop.findByPk(shopId);

    if (!product || !shop) {
      return res.status(404).json({ message: 'Продукт или магазин не найдены' });
    }

    // Проверка, существует ли уже запись для данного продукта и магазина
    const existingStock = await Stock.findOne({ where: { productId, shopId } });
    if (existingStock) {
      return res.status(409).json({ message: 'Остаток для этого продукта и магазина уже существует' });
    }

    const stock = await Stock.create({
      productId,
      shopId,
      quantityOnShelf: quantityOnShelf || 0,
      quantityInOrder: quantityInOrder || 0
    });

    // Отправка события создания остатка
    await sendHistory({
      shopId,
      plu: product.plu,
      action: 'CREATE_STOCK',
      timestamp: new Date(),
    });

    return res.status(201).json(stock);
  } catch (error) {
    next(error);
  }
};

exports.increaseStock = async (req, res, next) => {
  try {
    const { productId, shopId, quantity } = req.body;

    if (!productId || !shopId || !quantity || quantity <= 0) {
      return res.status(400).json({ message: 'productId, shopId и положительное количество обязательны' });
    }

    const stock = await Stock.findOne({ where: { productId, shopId } });
    if (!stock) {
      return res.status(404).json({ message: 'Остаток не найден' });
    }

    stock.quantityOnShelf += quantity;
    await stock.save();

    // Отправка события увеличения остатка
    await sendHistory({
      shopId,
      plu: (await Product.findByPk(productId)).plu,
      action: 'INCREASE_STOCK',
      timestamp: new Date(),
    });

    return res.json(stock);
  } catch (error) {
    next(error);
  }
};

exports.decreaseStock = async (req, res, next) => {
  try {
    const { productId, shopId, quantity } = req.body;

    if (!productId || !shopId || !quantity || quantity <= 0) {
      return res.status(400).json({ message: 'productId, shopId и положительное количество обязательны' });
    }

    const stock = await Stock.findOne({ where: { productId, shopId } });
    if (!stock) {
      return res.status(404).json({ message: 'Остаток не найден' });
    }

    if (stock.quantityOnShelf < quantity) {
      return res.status(400).json({ message: 'Недостаточно товара на полке' });
    }

    stock.quantityOnShelf -= quantity;
    await stock.save();

    // Отправка события уменьшения остатка
    await sendHistory({
      shopId,
      plu: (await Product.findByPk(productId)).plu,
      action: 'DECREASE_STOCK',
      timestamp: new Date(),
    });

    return res.json(stock);
  } catch (error) {
    next(error);
  }
};

exports.getStocks = async (req, res, next) => {
  try {
    const { plu, shop_id, quantityOnShelfMin, quantityOnShelfMax, quantityInOrderMin, quantityInOrderMax } = req.query;

    const where = {};
    const productWhere = {};

    if (plu) {
      productWhere.plu = { [Op.eq]: plu };
    }

    if (shop_id) {
      where.shopId = shop_id;
    }

    if (quantityOnShelfMin || quantityOnShelfMax) {
      where.quantityOnShelf = {};
      if (quantityOnShelfMin) {
        where.quantityOnShelf[Op.gte] = Number(quantityOnShelfMin);
      }
      if (quantityOnShelfMax) {
        where.quantityOnShelf[Op.lte] = Number(quantityOnShelfMax);
      }
    }

    if (quantityInOrderMin || quantityInOrderMax) {
      where.quantityInOrder = {};
      if (quantityInOrderMin) {
        where.quantityInOrder[Op.gte] = Number(quantityInOrderMin);
      }
      if (quantityInOrderMax) {
        where.quantityInOrder[Op.lte] = Number(quantityInOrderMax);
      }
    }

    const stocks = await Stock.findAll({
      where,
      include: [{
        model: Product,
        where: productWhere,
        attributes: ['plu', 'name']
      }, {
        model: Shop,
        attributes: ['id', 'name', 'location']
      }]
    });

    return res.json(stocks);
  } catch (error) {
    next(error);
  }
};
