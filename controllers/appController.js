var express = require('express');
var router = express.Router();
var UserModel = require('../models/user.js');
var ProjectModel = require('../models/project.js');
var MemberModel = require('../models/member.js');
var moment = require('moment');



// --- ROUTE :: INDEX :: Browse the index ---
router.get('/', function(req, res){
  ProjectModel.find({}).exec()
  .then(function(allProjects){
    console.log("app-DB-read-allProjects", allProjects);
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
  console.log(req.params.pId, "<<<<<<to be update");
  console.log(req.body.name, "<<<<<<to be update");

  ProjectModel.findOneAndUpdate({_id : req.params.pId}, req.body).exec()
  .then(function(oneProject){
    console.log(oneProject,"<<<<<<onePorjectUpdated");
    res.json(oneProject);
  })
  .catch(function(err) {
  res.json(500, "cant read Database");
  })
});


// --- ROUTE :: CREATE :: Create new record from NEW ---
router.post('/', function(req, res){
  console.log(req.body.oneProject, "<<<<<<to be created");
  ProjectModel.create(req.body.oneProject)
  .then(function(oneProject){
    console.log(oneProject,"<<<<<<onePorjectCreate");
    res.json(oneProject);
  })
  .catch(function(err) {
  res.json(500, "cant read Database");
  })
});




// //*-----------------------------------------------------*
// //* ROUTE :: NEW :: Display new empty magazine page     *
// //*-----------------------------------------------------*
// router.get('/new', function(req, res){
//   if (!req.user) {
//     var viewData = {title: 'Magazine Login'};
//     res.render('sec/login', viewData);
//   } else {
//   var viewData = {title: 'New Magazine', actualUser: req.user.username}
//   res.render('magazine/new', viewData);
//   };
// });
//
// //*-----------------------------------------------------*
// //* ROUTE :: CREATE :: Create new record from NEW       *
// //*-----------------------------------------------------*
// router.post('/', function(req, res){
//   if (!req.user) {
//     var viewData = {title: 'Magazine Login'};
//     res.render('sec/login', viewData);
//   } else {
//     MagazineModel.create(req.body, function(err, oneMagazine){
//       if (err) {
//         console.log("*2*", err);
//         res.redirect('/magazine/new');
//       } else {
//         res.redirect('/magazine');
//       }
//     });
//   };
// });
//
// //*-----------------------------------------------------*
// //* ROUTE :: SHOW :: Display ONE magazine page          *
// //*-----------------------------------------------------*
// router.get('/:magId', function(req, res){
//   if (!req.user) {
//     var viewData = {title: 'Magazine Login'};
//     res.render('sec/login', viewData);
//   } else {
//     MagazineModel.findOne({_id : req.params.magId}, function(err, oneMagazine){
//       if (err) { console.log("*3*", err)};
//       if (oneMagazine) {
//         var viewData = oneMagazine;
//         viewData.articleList.map(function(z) {
//           z.parentLink = oneMagazine._id;
//         });
//         viewData.title = "Magazine";
//         viewData.actualUser = req.user.username;
//         res.render('magazine/show', viewData);
//       } else {
//         res.redirect('/magazine');
//       };
//     });
//   };
// });
//
// //*-----------------------------------------------------*
// //* ROUTE :: EDIT :: Display EDIT a magazine page       *
// //*-----------------------------------------------------*
// router.get('/:magId/edit', function(req, res){
//   if (!req.user) {
//     var viewData = {title: 'Magazine Login'};
//     res.render('sec/login', viewData);
//   } else {
//     MagazineModel.findOne({_id : req.params.magId}, function(err, oneMagazine){
//       if (err) { console.log("*4*", err)};
//       if (oneMagazine) {
//         var viewData = {
//           mag: oneMagazine,
//           actualUser: req.user.username,
//           title: "Magazine (edit)" };
//         res.render('magazine/edit', viewData);
//       } else {
//         res.redirect('/magazine');
//       };
//     });
//   };
// });
//
// //*-----------------------------------------------------*
// //* ROUTE :: UPDATE :: Patch/Update magazine from EDIT  *
// //*-----------------------------------------------------*
// router.patch('/:magId', function(req, res){
//   if (!req.user) {
//     var viewData = {title: 'Magazine Login'};
//     res.render('sec/login', viewData);
//   } else {
//     MagazineModel.findOneAndUpdate({_id : req.params.magId}, req.body, function(err, oneMagazine){
//       if (err) {
//         console.log("*5*", err);
//         res.redirect(`/magazine/${req.params.magId}/edit`);
//         //res.redirect("magazine/"+req.body.magId+"/edit")
//       } else {
//         res.redirect(`/magazine/${req.params.magId}`);
//       };
//     });
//   };
// });
//
// //*-----------------------------------------------------*
// //* ROUTE :: DESTROY :: Delete magazine from EDIT       *
// //*-----------------------------------------------------*
// router.delete('/:magId', function(req, res){
//   if (!req.user) {
//     var viewData = {title: 'Magazine Login'};
//     res.render('sec/login', viewData);
//   } else {
//     MagazineModel.remove({_id : req.params.magId}, function(err, oneMagazine){
//       if (err) {
//         console.log("*6*", err);
//         res.redirect(`/magazine/${req.params.magId}/edit`);
//       } else {
//         console.log("Deleting",req.params.magId, "with", req.body);
//         res.redirect("/magazine");
//       };
//     });
//   };
// });

module.exports = router;
