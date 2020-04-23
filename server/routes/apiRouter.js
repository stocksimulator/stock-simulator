const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController.js') // importing middleware for stock info APIs

/* --------------------------- Stock Info HTTP Requests -------------------------- */
// get request for getting stock info from API
router.get('/:symbol', apiController.getStockValue, (req, res) => {
  res.status(200).json(res.locals.stockInfo);
});

// post request for getting stock info from API
router.post('/buy', apiController.buyStock, (req, res) => {
  res.status(200).json(res.locals.user);
});

// post request to sell shares of stock, check stock value from API
router.post('/sell', apiController.sellStock, (req, res) => {
  res.status(200).json(res.locals.user);
});

module.exports = router;