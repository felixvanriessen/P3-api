var express = require('express');
var router = express.Router();
var MsgModel = require('../models/MsgModel')

//get messages for a user
router.get('/get/:ownerid', function(req,res,next){
   MsgModel.find({msg_to:req.params.ownerid})
   .then(msgs=>{
      res.json(msgs)
   })
   .catch(err=>console.log(err))
})

//create a new message
router.post('/new', function(req,res,next){
   MsgModel.create({
      msg_to:req.body.msg_to,
      msg:req.body.msg
   })
   .then(msg=>{
      res.json({message:'success'})
   })
   .catch(err=>console.log(err))
})


module.exports = router