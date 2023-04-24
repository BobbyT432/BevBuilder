var express = require('express');
var router = express.Router();

// Models
const User = require('../models/user');
const Beverage = require('../models/beverage');
const Ingredient = require('../models/ingredient');
const BevIng = require('../models/beving');

const sessionChecker = (req, res, next)=> {
    if(req.session.user) {
      next()
    } else {
      res.redirect("/?msg=raf")
    }
}

router.use(sessionChecker)

router.get('/', async function(req, res, next) {
    console.log("User Session:")
    console.log(req.session.user)
   // res.render('index', { title: 'Express' });

    const bevFeatured = await Beverage.findAll()
    const currentUser = req.session.user
    res.render('index', { bevFeatured: bevFeatured, currentUser: currentUser });
});
  
module.exports = router;