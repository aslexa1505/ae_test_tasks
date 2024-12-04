import { RequestHandler } from 'express';
import History from '../models/history';
import { Op } from 'sequelize';

export const addHistory: RequestHandler = async (req, res, next) => {
  const { shopId, plu, action, timestamp } = req.body;

  if (!plu || !action) {
    res.status(400).json({ message: 'shopId, plu и action обязательны' });
    return;
  }

  const history = await History.create({
    shopId,
    plu,
    action,
    timestamp: timestamp || new Date(),
  });

  res.status(201).json(history);
};

export const getHistories: RequestHandler = async (req, res, next) => {
  const {
    shop_id,
    plu,
    action,
    date_from,
    date_to,
    page = 1,
    limit = 20,
  } = req.query;

  const where: any = {};

  if (shop_id) {
    where.shopId = shop_id;
  }

  if (plu) {
    where.plu = plu;
  }

  if (action) {
    where.action = action;
  }

  if (date_from || date_to) {
    where.timestamp = {};
    if (date_from) {
      where.timestamp[Op.gte] = new Date(date_from as string);
    }
    if (date_to) {
      where.timestamp[Op.lte] = new Date(date_to as string);
    }
  }

  const offset = (Number(page) - 1) * Number(limit);
  const histories = await History.findAndCountAll({
    where,
    order: [['timestamp', 'DESC']],
    limit: Number(limit),
    offset: offset,
  });

  res.json({
    total: histories.count,
    page: Number(page),
    pages: Math.ceil(histories.count / Number(limit)),
    data: histories.rows,
  });
};
