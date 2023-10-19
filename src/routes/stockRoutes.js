const express = require('express');
const stockController = require('./../controllers/stockController');

const router = express.Router();

router.get('/', stockController.getStocks);
router.get('/:searchId', stockController.getStockDetails);
router.get(
  '/:exchange/:scripCode/:duration',
  stockController.getStockChartData
);

module.exports = router;
