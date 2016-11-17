//*-----------------------------------------------------*
//* Initialization process                              *
//*-----------------------------------------------------*
var express = require('express');
var router = express.Router();
var Project = require('../models/project.js');

//*-----------------------------------------------------*
//* ROUTE :: Unique route to create data in Heroku      *
//*-----------------------------------------------------*
router.get('/reset', function(req, res){
//*-----------------------------------------------------*
//* Reset the Project Database for testing purpose      *
//*-----------------------------------------------------*
// =============== Preloading Members ================
  var aList1 = {
    name: "Mario",
    skillSet: ["HTML", "JavaScript", "CSS"],
    emailContact: "mario@nintendo.com",
    slackContact: "@mario",
    location: "Osaka"
  };
  var aList2 = {
    name: "Luigi",
    skillSet: ["Angular", "JavaScript", "Mongo"],
    emailContact: "luigi@nintendo.com",
    slackContact: "@luigi",
    location: "Osaka"
  };
  var aList3 = {
    name: "Yoshi",
    skillSet: ["Angular", "Ruby", "Rails"],
    emailContact: "Yoshi@nintendo.com",
    slackContact: "@Yoshi",
    location: "Kyoto"
  };
  var aList4 = {
    name: "Toad",
    skillSet: ["Phyton", "jQuery"],
    emailContact: "Toad@nintendo.com",
    slackContact: "@Toad",
    location: "Kyoto"
  };
  var aList5 = {
    name: "Princess",
    skillSet: ["Angular", "JavaScript"],
    emailContact: "princess@nintendo.com",
    slackContact: "@princess",
    location: "Kyoto"
  };
  // =============== Uploading Projects ================
  Project.remove({})
  .then(function(){
    console.log('[ XYZ ] Projects Data-loading in Progress...')
    return Project.create({
      name: "Asset Management",
      description: "inventory and location of all computer equipment",
      skillsRequired: ["HTML", "JavaScript"],
      dateStart: "2016-11-21",
      dateEnd: "",
      memberList: [aList1, aList2, aList3],
      baseLocation: "Osaka",
    });
  })
  .then(function(){
    return Project.create({
      name: "Video Store",
      description: "inventory and sales of video games",
      skillsRequired: ["HTML", "JavaScript"],
      dateStart: "2016-12-21",
      dateEnd: "",
      memberList: [aList2, aList3, aList4],
      baseLocation: "Osaka",
    });
  })
  .then(function(){
    return Project.create({
      name: "Blood Bank",
      description: "inventory of Blood Types",
      skillsRequired: ["HTML", "JavaScript", "jQuery"],
      dateStart: "2017-01-21",
      dateEnd: "",
      memberList: [aList1, aList4, aList5],
      baseLocation: "Osaka",
    });
  })
  .then(function(){
    return Project.create({
      name: "Health briefcase",
      description: "Personal Health History",
      skillsRequired: ["Angular", "Phyton", "jQuery"],
      dateStart: "2017-02-21",
      dateEnd: "",
      memberList: [aList1, aList3, aList5],
      baseLocation: "Kioto",
    });
  })
  .catch(function(err){
    console.error(err);
  })
  .then(function(){
    console.log('[ XYZ ] Projects data-loading completed');
    console.log('[ XYZ ] Closing Mongo DB');
    res.redirect('/');
  });
});

module.exports = router;