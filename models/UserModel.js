const mongoose = require('mongoose')

const UserModel = mongoose.model('users', {
    username:String,
    password:String,
    email:String,
    tel:String
})

module.exports = UserModel