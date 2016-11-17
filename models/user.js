var mongoose      = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
mongoose.Promise = global.Promise;  // Do I need this?

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

// --- User Schema ---
var UserSchema = new Schema({
  username: String,
  password: String,
  fullname: String,
  email: String,
  location: String,
  skillSet: String,
  slackContact: String,
  banned: Boolean,            // for future use
  admin: Boolean,             // for future use
  createdAt: Date,
  updatedAt: Date
});

// --- add Passport Methods to the Schema ---
UserSchema.plugin(passportLocalMongoose);
UserSchema.methods.sayHello = function() {
    console.log(this.username + " Logged");
};

// --- compile and create user Model
var UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
