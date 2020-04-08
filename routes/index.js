var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('router getting /')
  res.send('ok')
});

module.exports = router;
