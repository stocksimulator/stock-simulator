const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const apiController = require('./controllers/apiController.js') // importing middleware for stock info APIs
const bodyParser = require('body-parser');

require('dotenv').config()

const PORT = 3000;
mongoose.connect(/* bring in database connection */);
mongoose.connection.once('open', () => {
  console.log('Connection to DB succesful');
});


/* --------------------------- Serve Static Assets -------------------------- */
// serve static files
app.use('/build', express.static(path.join(__dirname, '../build')));

// set up json body parser for incoming client requests 
app.use(bodyParser.json())

// serve entry point to app (index.html)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// post request from client to signup and create new user for app
app.post('/user/signup', (req, res) => {

})

// post request from client to login to account 
app.post('user/login', (req,res) => {

})

app.get('/api/:symbol', apiController.getStockValue, (req, res) => {
  res.status(200).json(res.locals.stockInfo);
})

app.post('/api/sell', apiController.sellStock, (req, res) => {
  
})


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

app.post('user/login', (req, res) => {
  console.log("blah");
})