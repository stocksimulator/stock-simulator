const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//handling stock data 
//did a 5 min interval look into 1 minute interval 

const stockSchema = new Schema({
  user_id: {type: String, required: true, unique: true},
  cash: {type: Number}

})

//set up user stock data or just stock data?
