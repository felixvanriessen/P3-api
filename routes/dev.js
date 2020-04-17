var express = require('express');
var router = express.Router();
const User = require('../models/UserModel')
const Cars = require('../models/CarModel')

const genUser = require('../creators/usercreator')
const scrapeCars = require('../creators/scraper')
const genCar = require('../creators/carcreator')

//add randomly generated user to the database
router.get('/adduser', function(req,res,next){
   let newUser = genUser()
   User.create({
      username:newUser.username,
      password:newUser.password,
      email:newUser.email,
      tel:newUser.tel
   })
   .then(response=>{
      res.json({message:response})
   })
   .catch(err=>console.log(err))
})

//add 20 cars from autoscout24.nl, param selects page number for site
router.get('/addcar/:page', function(req,res,next){
   User.find()
   .then(userList=>{
      scrapeCars(req.params.page,500,20000).then((data)=>{
         let cars = genCar(userList,data)
         cars.forEach(car=>{
            Cars.create({
               name:car.name,
               price:car.price,
               kilometers:car.km,
               year:car.year,
               image:car.image,
               owner:car.owner
            })
            .then(response=>{
               console.log('car created: ' + car.name)
               res.json({message:`Success! Added ${cars.length} cars to the database`})
            })
            .catch(err=>console.log(err))
         })
      })
   })
   .catch(err=>console.log(err))
})

module.exports = router