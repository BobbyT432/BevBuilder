var express = require('express');
var router = express.Router();

// Models
const User = require('../models/user');
const Beverage = require('../models/beverage');
const Ingredient = require('../models/ingredient');
const BevIng = require('../models/beving');
const Comment = require('../models/comment');
const BevCom = require('../models/bevcom');
const UserSaveBev = require('../models/usersavebev');

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

/* Register */
router.post('/signup', function(req, res, next) {
  res.render('register')
});

router.post('/create-user', async function(req, res, next) {
  console.log(req.body.username+" - "+req.body.password);

  const user = await User.create({
    username: req.body.username,
    password: req.body.password
  });

  res.redirect('/')
});
/**/

const sessionChecker = (req, res, next)=> {
  if(req.session.user) {
    next()
  } else {
    res.redirect("/?msg=raf")
  }
}

router.use(sessionChecker)
// /**/

router.get('/drinks', async function(req, res, next) {
  const currentUser = req.session.user
  const drinks = await Beverage.findAll()
  const ingredients = await Ingredient.findAll()

  res.render('drinks', {drinks: drinks, currentUser: currentUser, ingredients: ingredients});
});



module.exports = router;
