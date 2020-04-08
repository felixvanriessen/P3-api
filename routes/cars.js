var express = require('express');
var router = express.Router();
const Cars = require('../models/CarModel')

/* GET home page. */
router.get('/all', function(req, res, next) {
  Cars.find()
  .populate('owner')
  .then(cars=>{
    res.json(cars)
  })
  .catch(err=>console.log(err))
});

router.post('/new', function(req,res,next) {
  Cars.create({
    name:req.body.name, 
    price:req.body.price,
    kilometers:req.body.kilometers,
    year:req.body.year,
    extras:req.body.extras,
    image:req.body.image,
    owner:"5e8da85f3a60372203880e89"
  })
  .then(newCar => {
    res.json(newCar)
  })
  .catch(err=>console.log(err))
})


module.exports = router;
