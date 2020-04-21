const mongoose = require('mongoose') // importing the mongo module for database use

// create schema for new app users to store in database
const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true}, // added unique on April 20th
    password: {type: String, required: true},
    cash: {type: Number},
    stocks: {type: Array}, 
})

const User = mongoose.model('user', userSchema);
module.exports = User