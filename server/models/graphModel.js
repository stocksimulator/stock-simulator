const mongoose = require('mongoose') 
const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true}, 
    password: {type: String, required: true},
    cash: {type: Number},
    stocks: {type: Array}, 
})

//date user id total value 

const User = mongoose.model('user', userSchema);
module.exports = User