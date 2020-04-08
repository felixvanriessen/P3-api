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
   User.findOneAndUpdate({username:req.body.username})
   .then(user=>{
      res.json(user)
   })
   .catch(err=>res.json({message:err}))
})

module.exports = router;
