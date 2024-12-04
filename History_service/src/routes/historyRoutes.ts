import express from 'express';
import { addHistory, getHistories } from '../controllers/historyController';
import asyncHandler from '../middleware/asyncHandler';

const router = express.Router();

router.post('/', asyncHandler(addHistory));
router.get('/', asyncHandler(getHistories));

export default router;
