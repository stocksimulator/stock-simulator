const mongoose = require('mongoose') 

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true}, 
    password: {type: String, required: true},
    cash: {type: Number},
    stocks: {type: Array}, 
})

const User = mongoose.model('user', userSchema);
module.exports = User