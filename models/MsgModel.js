const mongoose = require('mongoose')

const MsgModel = mongoose.model('msgs', {
   msg_to: { type: mongoose.Types.ObjectId, ref: 'users' },
   msg:String
})

module.exports = MsgModel