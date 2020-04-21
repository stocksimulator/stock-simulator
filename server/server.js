const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userController =  require('./controllers/userController.js') // importing middleware for user login, data and creation - added on April 19th
const apiController = require('./controllers/apiController.js') // importing middleware for stock info APIs

require('dotenv').config()
const PORT = 3000;

/* --------------------------- MongoDB Connection -------------------------- */
// setting up connection to our MongoDB - added on April 19th
mongoose.connect(
  'mongodb+srv://tshen815:Google.com3420!@stock-simulater-userdb-jmva0.mongodb.net/test?retryWrites=true&w=majority',
  {useNewUrlParser: true}
  );
mongoose.connection
  .once('open', () => console.log('Connection to DB succesful'))
  .on('error', err => console.log("Your error", err))


/* --------------------------- Serve Static Assets -------------------------- */
// serve static files
app.use('/build', express.static(path.join(__dirname, '../build')));
// set up json body parser for incoming client requests 
app.use(bodyParser.json());
// serve entry point to app (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

/* --------------------------- User HTTP Requests -------------------------- */
// post request from client to signup and create new user for app - edited on April 19th 
app.post('/user/login', userController.userLogin, (req, res) => {
  // Check with Tristen for Authentication 
  res.status(200).json({_id: res.locals.user._id});
});

// post request from client to login to account 
app.post('/user/signup', userController.createNewUser, (req,res) => {
  res.status(200).json({_id: res.locals.user._id});
});

// get request from client to access stored user data - added on April 19th
app.post('/user/getdata', userController.getUserData, (req, res) => {
  res.status(200).json(res.locals.user);
})

// for handling client side routing
app.get('/app/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

/* --------------------------- Stock Info HTTP Requests -------------------------- */
// get request for getting stock info from API
app.get('/api/:symbol', apiController.getStockValue, (req, res) => {
  res.status(200).json(res.locals.stockInfo);
});

// post request for getting stock info from API - Added on April 19th
app.post('/api/buy', apiController.buyStock, (req, res) => {
  res.status(200).json(res.locals.stockInfo);
});

// post request to sell shares of stock, check stock value from API
app.post('/api/sell', apiController.sellStock, (req, res) => {
  res.status(200).json(res.locals.stockInfo);
});


// setting up global error handler 
app.use((err, req, res, next) => {
  console.log(err);
  res.status(404).json({err: 'An error occured, you request could not be completed'})
});
// environment and port check 
console.log(process.env.API_KEY)
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

