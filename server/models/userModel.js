const mongoose = require('mongoose') 
const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true}, 
    password: {type: String, required: true},
    cash: {type: Number},
    stocks: {type: Array}, 
})

userSchema.pre('save', function(next) {
    let user = this;
    bcrypt.hash(user.password, SALT_WORK_FACTOR)
      .then((hash)=> {
        user.password = hash;
      })
      .then(()=> next())
  });

const User = mongoose.model('user', userSchema);
module.exports = User