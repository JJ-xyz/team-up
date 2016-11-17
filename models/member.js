var mongoose = require('mongoose');

// --- Define Constructor ---
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

// --- Member Schema ---
var MemberSchema = new Schema({
  name: String,
  skillSet: [String],
  emailContact: String,
  slackContact: String,
  location: String
});

// --- compile and create Member Model
var MemberModel = mongoose.model("Member", MemberSchema);

module.exports = MemberModel;
