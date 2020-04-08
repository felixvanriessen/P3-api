var express = require('express');
var router = express.Router();
const User = require('../models/UserModel')
const bcrypt = require('bcrypt')

router.get('/', function(req,res,next){
   User.find()
   .then(users=>{
      res.json(users)
   })
   .catch(err=>console.log(err))
})


router.post('/signup', function(req, res, next) {
   User.findOne({username:req.body.username})
   .then(existingUser=>{
      if (existingUser){
         res.json({message:'This username is already taken.'})
      } else {
         bcrypt.hash(req.body.password, 10, function(err,hash){
            User.create({
               username:req.body.username,
               password:hash,
               email:req.body.email,
               tel:req.body.tel
            })
            .then(newUser=>{
               res.json(newUser)
            })
            .catch(err=>console.log(err))
         })
      }
   })
});



module.exports = router;
