var express = require('express');
var router = express.Router();
var MsgModel = require('../models/MsgModel')

router.get('/get/:ownerid', function(req,res,next){
   MsgModel.find({msg_to:req.params.ownerid})
   .then(msgs=>{
      res.json(msgs)
   })
   .catch(err=>console.log(err))
})

router.post('/new', function(req,res,next){
   MsgModel.create({
      msg_to:req.body.msg_to,
      msg:req.body.msg
   })
   .then(msg=>{
      console.log('new message success')
      console.log(msg)
      res.json({message:'success'})
   })
   .catch(err=>console.log(err))
})


module.exports = router