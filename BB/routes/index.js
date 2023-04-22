var express = require('express');
var router = express.Router();

// Models
const User = require('../models/user');
const Beverage = require('../models/beverage');
const Ingredient = require('../models/ingredient');
const BevIng = require('../models/beving');

/* Login */
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/login', async function(req, res, next) {
  console.log(req.body.username+" - "+req.body.password);

  const user = await User.find_user(req.body.username, req.body.password)

  if(user!== null) {
    req.session.user = user
    res.redirect("/home")
  } else {
    res.redirect("/?msg=fail")
  }
});


const sessionChecker = (req, res, next)=> {
  if(req.session.user) {
    next()
  } else {
    res.redirect("/?msg=raf")
  }
}

router.use(sessionChecker)
/**/

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
  let username = req.session.user.username
  res.render('bev_create', {username: username});
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
