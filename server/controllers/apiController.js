const fetch = require('node-fetch');
const User = require('../models/userModel.js');
const stocks = require('../../raw-stock-data');
require('dotenv').config();

// Middleware for Stock GET and POST requests
const apiController = {
  // get stock value from alphavantage api
  getStockValue(req, res, next) {
    fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${req.params.symbol}&interval=5min&apikey=${process.env.API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        let stockTime = '1. open';
        const today = new Date();
        let date =
          today.getFullYear() +
          '-' +
          '0' +
          (today.getMonth() + 1) +
          '-' +
          today.getDate();
        let time =
          today.getHours() +
          ':' +
          today.getMinutes() +
          ':' +
          today.getSeconds();
        const hour = time.slice(0, 2);
        if (Number(hour) >= 16) {
          // console.log('in here');
          time = '16:00:00';
          stockTime = '4. close';
        } else {
          const change = time.slice(0, 2);
          time = change + ':00:00';
          // console.log('in here');
        }

        const dateTime = date + ' ' + time;
        // console.log('dateTime', dateTime);
        // console.log(d);
        res.locals.stockInfo = {
          symbol: req.params.symbol,
          price: Math.floor(data['Time Series (5min)'][dateTime][stockTime]),
        };
        // console.log('symbol:  ', res.locals.stockInfo.price);
        return next();
      })
      .catch((err) => {
        next({
          log: `apiController.getStockValue: error: ${err}`,
          message: { err: `Error in apiController.getStockValue: ${err}` },
        });
      });
  },

  // redirected from POST '/api/buy' endpoint
  buyStock(req, res, next) {
    User.findOneAndUpdate(
      { _id: req.body._id },
      {
        $push: {
          stocks: {
            stock: req.body.symbol,
            shares: req.body.shares,
            currValue: req.body.currValue,
          },
        },
        $inc: { cash: -req.body.total },
      },
      { new: true },
      (err, user) => {
        if (err) return next(err);
        if (!user) return next('User not found');
        res.locals.user = user;
        console.log('after mongo', res.locals.user);
        return next();
      }
    );
  },

  // redirected from POST '/api/sell' endpoint
  sellStock(req, res, next) {
    console.log('sellStock req body', req.body);
    User.findOneAndUpdate(
      { _id: req.body._id },
      {
        $pull: { stocks: { stock: req.body.symbol, shares: req.body.shares } },
        $inc: { cash: req.body.total },
      },
      { new: true },
      (err, user) => {
        if (err) return next(err);
        if (!user) return next('User not found');
        res.locals.user = user;
        return next();
      }
    );
  },
};

module.exports = apiController;
