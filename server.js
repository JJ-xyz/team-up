console.log("===== Team-Up app :: listening port 3001");
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

// --- Handlers ---
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

// --- Main Routes ---
app.get('/', function(req, res){
    res.render('index');
});
app.use('/projects', require('./controllers/appController.js'));
app.use('/seed', require('./seed/data-init.js'))

app.listen(process.env.PORT || 3001);
