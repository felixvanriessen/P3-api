const mongoose = require('mongoose')

const CarModel = mongoose.model('vehicles', {
   name:String, 
   price:Number,
   kilometers:Number,
   year:Number,
   image:String,
   owner:{ type: mongoose.Types.ObjectId, ref: 'users' }
})

module.exports = CarModel