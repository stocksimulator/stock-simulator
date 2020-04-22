const fetch = require('node-fetch');
const User = require('../models/userModel.js');


const apiController = {
  // get stock value from alphavantage api
  getStockValue(req, res, next) {
    fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${req.params.symbol}&interval=5min&apikey=${process.env.API_KEY}`)
    .then(res => res.json())
    .then(data => {
      res.locals.stockInfo = {symbol: req.params.symbol, price: Math.floor(data['Time Series (5min)']['2020-04-21 16:00:00']['4. close'])}
      return next()
    })
    .catch(err => {
      next({
        log: `apiController.getStockValue: error: ${err}`,
        message: { err: `Error in apiController.getStockValue: ${err}`}
      });
    })
  },

  // redirected from POST '/api/buy' endpoint
  buyStock(req, res, next) {
    User.findOneAndUpdate({_id: req.body._id}, 
      {
        "$push": {stocks: {stock: req.body.symbol, shares: req.body.shares, currValue: req.body.currValue}},
        "$inc": {cash: -req.body.total}
      },
      {new: true}, 
      (err, user) => {
        if (err) return next(err)
        if (!user) return next("User not found")
        res.locals.user = user;
        return next();
    })
  },

  // redirected from POST '/api/sell' endpoint
  sellStock(req, res, next) {

  }
}

module.exports = apiController;