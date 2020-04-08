const mongoose = require('mongoose')

const CarModel = mongoose.model('cars', {
   name:String, 
   price:Number,
   kilometers:Number,
   year:String,
   extras:[String],
   image:String,
   owner:{ type: mongoose.Types.ObjectId, ref: 'users' }
})

module.exports = CarModel