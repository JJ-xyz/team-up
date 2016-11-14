console.log("===== Team-Up app :: listening port 3001");
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

// --- Handlers ---
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(bodyParser.json());
// --- debuggin tools ---
pry = require('pryjs');
var logger = require('morgan');
app.use(logger('dev'));

// ============= Express + Handlebars ================ Begin
// var hbs = require('hbs');
// app.set("view engine", "hbs");
//require('handlebars-form-helpers').register(hbs.handlebars);
// ============= Express + Handlebars ================ End

// --- Database : Mongo DB ---
var mongoose = require('mongoose');
var mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/magazine';
mongoose.connect(mongoURI);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', function(err){ console.log(err); });
db.once('open', function(){ console.log('[ XYZ ] Connected to Mongo DB'); });

// --- Midleware : Passport ---
var UserModel = require('./models/user.js');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(UserModel.createStrategy());
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

// --- Main Routes ---
app.use('/', require('./controllers/home.js'));
app.use('/project', require('./controllers/project.js'));
app.use('/member', require('./controllers/member.js'));
app.use('/sec', require('./controllers/sec.js'));

app.listen(process.env.PORT || 3001);
