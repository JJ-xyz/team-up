var mongoose = require('mongoose');
var MemberSchema = require('./member.js').schema; // embeded

// --- Define Constructor ---
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

// --- Project Schema ---
var ProjectSchema = new Schema({
  name: String,
  description: String,
  skillsRequired: String,
  dateStart: Date,
  dateEnd: Date,
  memberList: [memberSchema],
  baseLocation: String
});

// --- compile and create Project Model
var ProjectModel = mongoose.model("Project", ProjectSchema);

module.exports = ProjectModel;
