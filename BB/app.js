
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')
const sequelize = require('./db');

// Models
const User = require('./models/user');
const Beverage = require('./models/beverage');
const Ingredient = require('./models/ingredient');
const BevIng = require('./models/beving');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var homeRouter = require('./routes/home');
var profileRouter = require('./routes/profile');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('trust proxy', 1) // from CMS demo videos
app.use(session({
  secret: 'beveragebuilders',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/home', homeRouter);
app.use('/profile', profileRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

async function test_setup() {
  const sampleAcc = await User.create({username : "Admin", password: "1234"});
  const sampleAcc2 = await User.create({username : "Bawb", password: "1234"});
  const sampleAcc3 = await User.create({username : "asdf", password: "asdf"});
  const sampleBev = await Beverage.create({name : "Lemonade", author: "BeerBelly10024", description: "A delicious refreshment!", instr: "Step 1: "});
  const sampleIng = await Ingredient.create({name: "Lemon"});
  const sampleBevIng = await BevIng.create({bev_id: sampleBev.id, ing_id: sampleIng.id, amount: 2});
}

sequelize.sync({ force: true }).then(()=>{ // this is destructive we need to do this: https://sequelize.org/docs/v6/core-concepts/model-basics/ under "Synchronization in production"
  test_setup().then(()=> console.log("Sample data created"))
})

module.exports = app;
