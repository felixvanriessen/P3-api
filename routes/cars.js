var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('router getting /cars')
  res.json({msg:'ok, u got cars'})
});

router.get('/p', function(req, res, next) {
  console.log('router getting /cars/p')
  res.json({msg:'ok, u got p in cars'})
});

module.exports = router;
