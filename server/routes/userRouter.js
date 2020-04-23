const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js'); // importing middleware for user login, data and creation

// post request from client to signup and create new user for app
router.post('/login', userController.userLogin, (req, res) => {
  res.status(200).json({
    _id: res.locals.user._id,
    username: res.locals.user.username,
    cash: res.locals.user.cash,
    stocks: res.locals.user.stocks,
  });
});

// post request from client to login to account
router.post('/signup', userController.createNewUser, (req, res) => {
  res.status(200).json({
    _id: res.locals.user._id,
    username: res.locals.user.username,
    cash: res.locals.user.cash,
    stocks: res.locals.user.stocks,
  });
});

// get request from client to access stored user data
router.post('/getdata', userController.getUserData, (req, res) => {
  res.status(200).json(res.locals.user);
});

module.exports = router;
