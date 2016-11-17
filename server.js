console.log("===== Team-Up app :: listening port 3001");
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

// --- Handlers ---
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// var methodOverride = require('method-override');
// app.use(methodOverride('_method'));

// --- debuggin tools ---
pry = require('pryjs');
var logger = require('morgan');
app.use(logger('dev'));

// --- Database : Mongo DB ---
var mongoose = require('mongoose');
var mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/team-up';
mongoose.connect(mongoURI);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', function(err){ console.log(err); });
db.once('open', function(){ console.log('[ XYZ ] Connected to Mongo DB'); });

// // --- Data Models Loading ---
// var UserModel = require('./models/user.js');
// var ProjectModel = require('./models/project.js');
// var MemberModel = require('./models/member.js');
//
// // --- Midleware : Passport ---  *** for second pass review ****
// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
//
// app.use(require('express-session')({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: false
// }));
// app.use(passport.initialize());
// app.use(passport.session());
//
// passport.use(UserModel.createStrategy());
// passport.serializeUser(UserModel.serializeUser());
// passport.deserializeUser(UserModel.deserializeUser());

// --- Main Routes ---
app.get('/', function(req, res){
    res.render('index');
});
// app.use('/', require('./controllers/home.js'));
app.use('/projects', require('./controllers/appController.js'));
// app.use('/member', require('./controllers/member.js'));
// app.use('/sec', require('./controllers/sec.js'));
app.use('/seed', require('./seed/data-init.js'))

app.listen(process.env.PORT || 3001);
