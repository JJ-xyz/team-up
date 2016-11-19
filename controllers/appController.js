var express = require('express');
var router = express.Router();
var ProjectModel = require('../models/project.js');
var MemberModel = require('../models/member.js');
var moment = require('moment');

// --- ROUTE :: INDEX :: Browse the index ---
router.get('/', function(req, res){
  ProjectModel.find({}).exec()
  .then(function(allProjects){
    res.json(allProjects);
  })
  .catch(function(err) {
    console.log(err);
    res.json(500, "cant read Database");
  })
});

// --- ROUTE :: EDIT :: Display to edit a project
router.get('/:pId/edit', function(req, res){
  ProjectModel.findOne({_id : req.params.pId}).exec()
  .then(function(oneProject){
    res.json(oneProject);
  })
  .catch(function(err) {
    console.log(err);
    res.json(500, "cant read Database");
  })
});

// --- ROUTE :: UPDATE :: Put/Update a project
router.put('/:pId', function(req, res){
  ProjectModel.findOneAndUpdate({_id : req.params.pId}, req.body.oneProject).exec()
  .then(function(oneProject){
    res.json(oneProject);
  })
  .catch(function(err) {
  res.json(500, "cant read Database");
  })
});


// --- ROUTE :: CREATE :: Create new record from NEW ---
router.post('/', function(req, res){
  ProjectModel.create(req.body.oneProject)
  .then(function(oneProject){
    res.json(oneProject);
  })
  .catch(function(err) {
  res.json(500, "cant read Database");
  })
});


// --- ROUTE :: DESTROY :: Delete Project---
router.delete('/:pId', function(req, res){
  ProjectModel.remove({_id : req.params.pId})
  .then(function(oneProject) {
    res.json(oneProject);
  })
  .catch(function(err) {
  res.json(500, "cant read Database");
  })
});

module.exports = router;
