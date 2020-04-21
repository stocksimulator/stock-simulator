const User = require('../models/userModel');
const cookieController = {};

//setCookie - set a cookie with a random number
// cookieController.setCookie = (req, res, next) => {
//   res.cookie("secret", JSON.stringify((Math.floor(Math.random() * 100))), { httpOnly: true })
//   return next();
// }

// setSSIDCookie - store the user id in a cookie
cookieController.setSSIDCookie = (req, res, next) => {
  const username = req.body.username; 
  User.findOne(username, (err, result) => {
    let userId = result._doc._id;
    res.cookie('ssid', userId, {
      maxAge: 30000,
      httpOnly: true
    })
    res.locals.userId = userId;
    return next();
  })
}

module.exports = cookieController;
