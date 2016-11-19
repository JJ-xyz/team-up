//*-----------------------------------------------------*
//* Initialization process                              *
//*-----------------------------------------------------*
var express = require('express');
var router = express.Router();
var Project = require('../models/project.js');

//*-----------------------------------------------------*
//* ROUTE :: Unique route to create test data in Heroku *
//*-----------------------------------------------------*
router.get('/testdata', function(req, res){
//*-----------------------------------------------------*
//* Reset the Project Database for testing purpose      *
//*-----------------------------------------------------*
// =============== Preloading Members ================
  var aList1 = {
    name: "Mario",
    skillSet: "HTML, JavaScript, CSS",
    emailContact: "mario@nintendo.com",
    slackContact: "@mario",
    location: "Osaka"
  };
  var aList2 = {
    name: "Luigi",
    skillSet: "Angular, JavaScript, Mongo DB",
    emailContact: "luigi@nintendo.com",
    slackContact: "@luigi",
    location: "Osaka"
  };
  var aList3 = {
    name: "Yoshi",
    skillSet: "Angular, Ruby, Rails",
    emailContact: "Yoshi@nintendo.com",
    slackContact: "@Yoshi",
    location: "Kyoto"
  };
  var aList4 = {
    name: "Toad",
    skillSet: "Phyton, jQuery",
    emailContact: "Toad@nintendo.com",
    slackContact: "@Toad",
    location: "Kyoto"
  };
  var aList5 = {
    name: "Princess",
    skillSet: "Angular, JavaScript",
    emailContact: "princess@nintendo.com",
    slackContact: "@princess",
    location: "Kyoto"
  };
  // =============== Uploading Projects ================
  Project.remove({})
  .then(function(){
    console.log('[ XYZ ] Projects Data-loading in Progress...')
    return Project.create({
      name: "Flights Reporting",
      description: "A new web site to publish each Drone (Unmanned Aerial Vehicle) flight trip.  The app will track the flight route (GPS point), location, purpose of the trip, pilot, camera man, drone inspection results before take off and after landing. The GPS route will be acquired using Python language.  The web site will be developed using HTML and JavaScript.  Secure access will be implemented. The application will interface with google maps to display the route.  The database selected for this application is MongoDB",
      skillsRequired: "HTML, JavaScript, jQuery, Mongo DB",
      dateStart: "2016-12-01",
      dateEnd: "2017-01-30",
      memberList: [aList1, aList2, aList3],
      baseLocation: "Southern California",
    });
  })
  .then(function(){
    return Project.create({
      name: "Fleet Tracker",
      description: "Revamp the existing web site to align the look and feel to current trends.  The web site will include vehicle tracking on demand displayed over a map. All 15 vehicles will be tracked simultaneously over a single map. The site will be developed using HTML, JavaScript and Flexbox (Location Requirement). The existing database is MS-SQL 2008",
      skillsRequired: "HTML, JavaScript, CSS, Ruby on Rails",
      dateStart: "2017-01-02",
      dateEnd: "2017-03-30",
      memberList: [aList2, aList3, aList4],
      baseLocation: "Berlin",
    });
  })
  .then(function(){
    return Project.create({
      name: "Team-Up-Now Site",
      description: "A web repository of resources inmediately availables to engage in web development within 24 hrs notice.  The site need to change the back-end database from Mongo DB to progreSQL. Authentication feature is part of the upgrade.  The technology in use are HTML, JavaScript, jQuery, Mongo DB",
      skillsRequired: "HTML, JavaScript, jQuery, Mongo DB, Ruby on Rails",
      dateStart: "2016-11-23",
      dateEnd: "2016-12-01",
      memberList: [aList1, aList4, aList5],
      baseLocation: "San Juan",
    });
  })
  .then(function(){
    return Project.create({
      name: "Personal Health Briefcase",
      description: "A new web site to hold personal health history to be accesable via mobile device with fingerprint identification.  The site will use multi platform interface including web, android, iOS.  The database will reside in the cloud and bi accessible through an Web API",
      skillsRequired: "Angular, Phyton, jQuery, SQL, Xcode 4",
      dateStart: "2017-02-01",
      dateEnd: "2017-06-30",
      memberList: [aList1, aList3, aList5],
      baseLocation: "FLa, USA",
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
