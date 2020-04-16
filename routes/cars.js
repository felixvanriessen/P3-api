var express = require('express');
var router = express.Router();
const Cars = require('../models/CarModel')

//get all cars
router.get('/all', function(req, res, next) {
  Cars.find()
  .populate('owner')
  .then(cars=>{
    res.json(cars)
  })
  .catch(err=>console.log(err))
});

//get one car by id
router.get('/find/:id', function(req,res,next) {
  Cars.findById(req.params.id)
  .populate('owner')
  .then(car=>{
    res.json(car)
  })
  .catch(err=>res.json({message:err}))
})

//post new car
router.post('/new', function(req,res,next) {
  Cars.create({
    name:req.body.name, 
    price:req.body.price,
    kilometers:req.body.kilometers,
    year:req.body.year,
    image:req.body.image,
    owner:req.body.owner
  })
  .then(car => {
    res.json(car)
  })
  .catch(err=>console.log(err))
})

//remove car
router.get('/remove/:id', function(req,res,next) {
  Cars.findOneAndDelete({_id:req.params.id})
  .then(response => {
    console.log(response)
    res.json({message:'success'})
  })
  .catch(err=>res.json({message:err}))
})

router.get('/owned/:id', function(req,res,next) {
  Cars.find({owner:req.params.id})
  .then(cars=>{
    res.json(cars)
  })
  .catch(err=>console.log(err))
})

module.exports = router;
