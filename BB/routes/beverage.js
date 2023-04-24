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

const sessionChecker = (req, res, next) => {
    if (req.session.user) {
        next()
    } else {
        res.redirect("/?msg=raf")
    }
}

router.use(sessionChecker);
/**/

// Global Variables (not sure if this is the best approach, we could store this in the session but that seems overkill)
let ingredList = []

// Not sure if this should be in separate file
// split up our router into CRUD format

router.get('/create', async function (req, res, next) {
    ingredList = []
    let username = req.session.user.username
    const currentUser = req.session.user
    res.render('bev_create', { username: username, ingredList: [], currentUser: currentUser });
});

router.get('/:bev_id', async function (req, res, next) { // ###############################
    let bevComments = []
    let ingred = [] // stores all ingredients that is attached to the drink

    // Find specific beverage
    const bev = await Beverage.find_bev(req.params.bev_id)
    if (bev) {
        const avgRating = await Beverage.get_avg(bev.id);

        // Update ratings (this is to show the ratings externally on other pages)
        bev.rating = avgRating
        bev.save()

        console.log("Rating :", avgRating)

        const bevIng = await BevIng.findAll({ // find the relationship between ingredients and this specific beverage
            where: {
                bev_id: req.params.bev_id
            }
        });
        if (bevIng) {
            for (let i = 0; i < bevIng.length; i++) {
                const newIngredID = await Ingredient.findByPk(bevIng[i].ing_id)
                ingred.push([newIngredID.name, bevIng[i].amount]) // push all the ingredients found
            }
        }

        // Find comments
        const comments = await BevCom.findAll({
            where: {
                bev_id: req.params.bev_id
            }
        });
        if (comments) {
            for (let i = 0; i < comments.length; i++) {
                const com = await Comment.findByPk(comments[i].com_id);
                bevComments.push(com);
            }
        }

        const currentUser = req.session.user
        res.render('bev_info', { beverage: bev, ingreds: ingred, comments: bevComments, currentUser: currentUser, avgRating: avgRating });
    }
    else {
        res.redirect('/');
    }
});

router.post('/create', async function (req, res, next) {
    let drinkName = req.body.drinkName;

    // Create the new beverage
    const Bev = await Beverage.create(
        {
            name: req.body.drinkName,
            author: req.session.user.username,
            description: req.body.drinkDesc,
            instr: req.body.drinkInstr
        });

    // Create all the new ingredients
    for (let i = 0; i < ingredList.length; i++) {
        const ingred = await Ingredient.create(
            {
                name: ingredList[i][0]
            });

        // Each ingredient needs to be tied to the beverage with the BevIng table
        await BevIng.create(
            {
                bev_id: Bev.id,
                ing_id: ingred.id,
                amount: ingredList[i][1]
            });
    }

    res.redirect('/beverage/' + Bev.id);
});

// Seperate form within the bev-info page just for creating ingredients
router.post('/add-ingred', async function (req, res, next) { //
    let username = req.session.user.username;
    let newIngred = req.body.ingred;
    let ingredAmt = req.body.ingredAmt;
    ingredList.push([newIngred, ingredAmt]);
    const currentUser = req.session.user
    res.render('bev_create', { username: username, ingredList: ingredList, currentUser: currentUser });
});

// Also a seperate form in the same page
router.post('/delete-ingred/:ingred_name', async function (req, res, next) {
    let username = req.session.user.username;
    let ingred = req.params.ingred_name;
    /* Find index of ingredient and remove */
    let index = 0;
    for (let i = 0; i < ingredList.length; i++) {
        if (ingredList[i][0] == ingred) {
            index = i;
        }
    }
    ingredList.splice(index, 1);
    /**/
    const currentUser = req.session.user
    res.render('bev_create', { username: username, ingredList: ingredList, currentUser: currentUser });
});

router.post('/post-comment/:bev_id', async function (req, res, next) {
    let username = req.session.user.username;
    let comText = req.body.comText;
    let rating = req.body.rating;

    const newCom = await Comment.create(
        {
            username: username,
            text: comText,
            rating: rating
        });

    await BevCom.create(
        {
            com_id: newCom.id,
            bev_id: req.params.bev_id,
        });

    const currentBev = req.params.bev_id
    res.redirect('/beverage/' + currentBev);
});

router.post('/save-bev/:bev_id', async function (req, res, next) {
    const newCom = await UserSaveBev.create(
        {
            username: req.session.user.username,
            bev_id: req.params.bev_id
        });
    console.log("POST SAVED");

    res.redirect('/beverage/' + req.params.bev_id);
});

module.exports = router;