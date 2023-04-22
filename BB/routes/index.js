var express = require('express');
var router = express.Router();

// Models
const User = require('../models/user');
const Beverage = require('../models/beverage');
const Ingredient = require('../models/ingredient');
const BevIng = require('../models/beving');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "Exopresso" });
});

router.get('/home', async function(req, res, next) {
  const bevFeatured = await Beverage.findAll()
  res.render('home', { bevFeatured: bevFeatured });
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


router.get('/create', async function(req, res, next) {
    res.render('bev_create');
});
router.post('/create', async function(req, res, next) {
  let drinkName = req.body.drinkName;
  
  const Bev = await Beverage.create(
    {
      name: req.body.drinkName,
      // username: req.body.username,
      description: req.body.drinkDesc
    });
  res.redirect('beverage/' + Bev.id);
});

module.exports = router;
