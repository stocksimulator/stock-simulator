const express = require('express');
const router = express.Router();
const userController =  require('../controllers/userController.js') // importing middleware for user login, data and creation

// post request from client to signup and create new user for app - edited on April 19th 
router.post('/login', userController.userLogin, (req, res) => {
  // Check with Tristen for Authentication 
  res.status(200).json({_id: res.locals.user._id});
});

// post request from client to login to account 
router.post('/signup', userController.createNewUser, (req,res) => {
  res.status(200).json({_id: res.locals.user._id});
});

// get request from client to access stored user data - added on April 19th
router.post('/getdata', userController.getUserData, (req, res) => {
  res.status(200).json(res.locals.user);
})

module.exports = router;