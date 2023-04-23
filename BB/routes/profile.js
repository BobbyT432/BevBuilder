var express = require('express');
var router = express.Router();

// Models
const User = require('../models/user');
const Beverage = require('../models/beverage');
const Ingredient = require('../models/ingredient');
const BevIng = require('../models/beving');
const UserSaveBev = require('../models/usersavebev');
const { Sequelize } = require('sequelize');
const Comment = require('../models/comment')

const sessionChecker = (req, res, next)=> {
    if(req.session.user) {
      next()
    } else {
      res.redirect("/?msg=raf")
    }
}

router.use(sessionChecker);

router.get('/', async function(req, res, next) {
    const currentUser = req.session.user

    //get the list of beverages by current user
    const myBevs = await Beverage.findAll({
      where: {
        author: currentUser.username
      }
    });

    //get list of saved beverages
    const mySavedBevIds = await UserSaveBev.findAll({
        where: {
          username: currentUser.username
        }
      });

    //get each beverage information
    tempList = []
    for (bevId of mySavedBevIds){
      const bevInfo = await Beverage.findByPk(bevId.bev_id)
      tempList.push(bevInfo)
    }
    const mySaved = tempList

    //get comments made by a user
    const myComments = await Comment.findAll({
      where: {
        username: currentUser.username
      }
    })
    console.log("COMMENTS")
    console.log(myComments)
    
    //pass to ejs
    res.render('profile', { currentUser: currentUser, myBevs: myBevs, mySaved: mySaved, myComments: myComments });
});
  
module.exports = router;