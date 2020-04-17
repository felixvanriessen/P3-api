var express = require('express');
var router = express.Router();
const User = require('../models/UserModel')


//only used in testing
// router.get('/', function(req,res,next){
//    User.find()
//    .then(users=>{
//       res.json(users)
//    })
//    .catch(err=>res.json({message:err}))
// })


//edit user details
router.post('/edit', function(req,res,next) {
   console.log('EDITING USER')
   console.log(req.session.currentUser)
   User.findOneAndUpdate({_id:req.body._id}, {
      username:req.body.username,
      email:req.body.email,
      tel:req.body.tel
   })
   .then(user=>{
      console.log(req.session.currentUser)
      User.findOne({_id:req.body._id})
      .then(gotuser=> {
         console.log(req.session.currentUser)
         res.json(gotuser)
      })
   })
   .catch(err=>res.json({message:err}))
})

module.exports = router;
