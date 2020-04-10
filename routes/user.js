var express = require('express');
var router = express.Router();
const User = require('../models/UserModel')


//remove this GET route before deploy!
router.get('/', function(req,res,next){
   User.find()
   .then(users=>{
      res.json(users)
   })
   .catch(err=>res.json({message:err}))
})

router.post('/edit', function(req,res,next) {
   User.findOneAndUpdate({_id:req.body._id}, {
      username:req.body.username,
      email:req.body.email,
      tel:req.body.tel
   })
   .then(user=>{
      User.findOne({_id:req.body._id})
      .then(gotuser=> {
         res.json(gotuser)
      })
   })
   .catch(err=>res.json({message:err}))
})

module.exports = router;
