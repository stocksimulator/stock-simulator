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
        // console.log('data', data)
        if (data['Error Message']) {
          res.locals.stockInfo = 'Invalide Search Keyword';
        } else {
          let stockTime;
          const today = new Date();
          let date =
            today.getFullYear() +
            '-' +
            '0' +
            (today.getMonth() + 1) +
            '-' +
            (today.getDate() -1);

          let time =
            today.getHours() +
            ':' +
            today.getMinutes() +
            ':' +
            today.getSeconds();
          let hour = Number(time.slice(0, 2)) + 3;
          if (hour >= 16) {
            time = '16:00:00';
            stockTime = '4. close';
          } 
          else {
            // console.log('in here');
            let minutes = time.slice(3, 5);
            let newMinutes = Number(minutes) - (Number(minutes) % 5);
            if(newMinutes < 10){
              let temp = newMinutes;
              newMinutes = '0' + temp;
            }
            time = hour + ':' + newMinutes + ':00';
            stockTime = '1. open';
            // console.log(time);
          }
          const dateTime = date + ' ' + time;
          // console.log(dateTime);
          //Hard Coded date day - 1;
          // console.log(data['Time Series (5min)']);
          // console.log(data['Time Series (5min)'][dateTime]);
          res.locals.stockInfo = {
            symbol: req.params.symbol,
            price: Math.floor(data['Time Series (5min)'][dateTime][stockTime]),
            graph: data['Time Series (5min)']
          };
          // console.log(res.locals.stockInfo);
        }
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
        return next();
      }
    );
  },

  // redirected from POST '/api/sell' endpoint
  sellStock(req, res, next) {
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
