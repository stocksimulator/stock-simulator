const User = require('../models/userModel.js');
const bcrypt = require('bcrypt');

// middleware for user sign up, data, and login POST requests
const userController = {
    
  // middleware for POST '/user/signup'
  createNewUser(req, res, next) {
    User.create(
      { username: req.body.username, password: req.body.password, cash: 100000, stocks: [] },
      (err, user) => {
      if (err) return res.json({success: false})
      res.locals.user = user;
      return next();
    });
  },

  // middleware for POST '/user/login'
  userLogin(req, res, next) {
    const { username, password } = req.body

    User.findOne({username: username})
      .then(user => {
        if(!user) res.json({success: false})
        res.locals.user = user
        bcrypt.compare(password, res.locals.user.password)
          .then(passwordMatch=> {
            if(passwordMatch) return next()
            else res.json({success: false})
          })
      })
      .catch(err => {
        next({
          log: `userController.userLogin: login find user error: ${err}`,
          message: { err: `userController.userLogin: login find user error: ${err}`}
        });
      })
  },

  // middleware for POST '/user/getdata'
  getUserData(req, res, next) {
    User.findOne({_id: req.body._id}, (err, user) => {
      if (err) return next(err)
      if (!user) return next('User not found')
      res.locals.user = {
        username: user.username,
        _id: user._id,
        stocks: user.stocks,
        cash: user.cash,
      };
      return next();
    });
  },
}

module.exports = userController;