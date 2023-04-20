var express = require('express');
var router = express.Router();

// Models
const User = require('../models/user');
const Beverage = require('../models/beverage');
const Ingredient = require('../models/ingredient');
const BevIng = require('../models/beving');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Not sure if this should be in separate file
// split up our router into CRUD format
router.get('/beverage/:bev_id', async function(req, res, next) {
  // Find specific beverage
  const bev = await Beverage.find_bev(req.params.bev_id)
  if (bev) {
    res.render('bev_info', { beverage: bev });
  }
  else {
    res.redirect('/');
  }
  
});
router.post('/beverage/:bev_id', function(req, res, next) {
  res.render('bev_info', { title: 'Express' });
});
router.put('/beverage/:bev_id', function(req, res, next) {
  res.render('bev_info', { title: 'Express' });
});
router.delete('/beverage/:bev_id', function(req, res, next) {
  res.render('bev_info', { title: 'Express' });
});

module.exports = router;
