const mongoose = require('mongoose') // importing the mongo module for database use

// create schema for new app users to store in database
const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    cash: {type: Number},
    stockList: {type: Array}, 
})

const User = mongoose.model('user', userSchema);
module.exports = User