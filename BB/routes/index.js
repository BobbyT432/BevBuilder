var express = require('express');
var router = express.Router();

const bcrypt = require('bcryptjs');
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
router.get('/', function (req, res, next) {
  res.render('login');
});

router.post('/login', async function (req, res, next) {
  console.log(req.body.username + " - " + req.body.password);
  const user = await User.findByPk(req.body.username)

  if (user !== null && bcrypt.compareSync(req.body.password, user.password) == true) {
    req.session.user = user
    res.redirect("/home")
  } else {
    res.redirect("/?msg=fail")
  }
});

/* Register */
router.post('/signup', function (req, res, next) {
  res.render('register')
});

router.post('/create-user', async function (req, res, next) {
  console.log(req.body.username + " - " + req.body.password);

  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(req.body.password, salt);

  console.log(hash)

  const user = await User.create({
    username: req.body.username,
    password: hash
  });

  res.redirect('/')
});
/**/

const sessionChecker = (req, res, next) => {
  if (req.session.user) {
    next()
  } else {
    res.redirect("/?msg=raf")
  }
}

router.use(sessionChecker)
/**/

router.get('/contact', function (req, res, next) {
  res.render('contact')
});

router.post('/contact', function (req, res, next) {
  console.log("Name: " + req.body.name + " - Email: " + req.body.email + " - Subject: " + req.body.subject + " - Message: " + req.body.message)
  res.redirect('/home')
});

// Global Variables (not sure if this is the best approach, we could store this in the session but that seems overkill)
let ingredList = []

router.post('/login', async function (req, res, next) {
  console.log(req.body.username + " - " + req.body.password);

  const user = await User.find_user(req.body.username, req.body.password)

  if (user !== null) {
    req.session.user = user
    res.redirect("/home")
  } else {
    res.redirect("/?msg=fail")
  }

});

router.get('/drinks', async function (req, res, next) {
  const currentUser = req.session.user
  const drinks = await Beverage.findAll()
  const ingredients = await Ingredient.findAll()

  let ingArray = []
  let ingNames = []
  for (let i = 0; i < ingredients.length; i++) {
    //console.log(ingredients[i].name)
    if (!ingNames.includes(ingredients[i].name)) {
      ingArray.push(ingredients[i])
    }
    ingNames.push(ingredients[i].name)

  }

  const count = 0

  res.render('drinks', { drinks: drinks, currentUser: currentUser, ingredients: ingArray, count: count });
});

router.post('/drinks', async function (req, res, next) {
  const currentUser = req.session.user
  const drinks = await Beverage.findAll()
  const ingredients = await Ingredient.findAll()
  const drinkType = req.body.drinkType

  let ingArray = []
  let ingNames = []
  for (let i = 0; i < ingredients.length; i++) {
    //console.log(ingredients[i].name)
    if (!ingNames.includes(ingredients[i].name)) {
      ingArray.push(ingredients[i])
    }
    ingNames.push(ingredients[i].name)

  }

  //const ingredientList = req.body.ingredientList

  const count = 0
  let bevs = []
  let ingList = req.body.ingredient
  let isExist = false

  if (ingList) {
    if (!Array.isArray(ingList)) {
      ingList = [req.body.ingredient]
    }

    for (let i = 0; i < ingList.length; i++) {
      isExist = false
      const ing = await Ingredient.findOne({
        where: {
          name: ingList[i]
        }
      });
      console.log("TESTINGSSSSS")
      console.log(ing.id)
      
      const bev = await BevIng.findOne({
        where: {
          ing_id: ing.id
        }
      });
      
      if (bev != null){
        const newDrink = await Beverage.findByPk(bev.bev_id)
      

      // Contains
      for (let i = 0; i < bevs.length; i++) {
        if (bevs[i].id == newDrink.id) {
          isExist = true
        }

      }
      if (!isExist) {
        bevs.push(newDrink)
      }
    }
    }

    console.log(bevs)
    res.render('drinks', { drinks: bevs, currentUser: currentUser, ingredients: ingArray, drinkType: drinkType, ingredList: ingredList, count: count });
  }
  res.render('drinks', { drinks: drinks, currentUser: currentUser, ingredients: ingArray, drinkType: drinkType, ingredList: ingredList, count: count });
});

module.exports = router;
