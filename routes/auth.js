var express = require('express');
var router = express.Router();
var User = require('../models/UserModel')
const bcrypt = require('bcrypt')

router.post('/signup', function(req, res, next) {
   User.findOne({username:req.body.username})
   .then(existingUser=>{
      if (existingUser){
         res.json({message:'Username is already taken'})
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
            .catch(err=>res.json({message:err}))
         })
      }
   })
});

router.post('/login', function(req,res,next) {
   User.findOne({username:req.body.username})
   .then(user=>{
       if (!user) {
          res.json({message:"This user does not exist"})
      } else {
         bcrypt.compare(req.body.password, user.password, function(err,result){
            if (!result) res.json({message:"Invalid credentials"})
            else {
               req.session.currentUser = user
               console.log('LOGGED IN & CURRENT USER =', req.session.currentUser)
               res.json({message:'Logged in', user:user})
            }
         })
      }
   })
   .catch(err=>{
       console.log(err)
   })
})

// router.post('', function(req,res,next){
//    User.findOne({})
// })

router.get('/logout', function(req,res,next) {
   console.log(req.session.currentUser)
   req.session.destroy(()=>{
   res.json({message:'Logged out'})
  })
})

module.exports = router