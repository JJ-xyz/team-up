(function(){
  angular
	.module("team-up")
	.controller("ApiController", ApiController);

	function ApiController($http, $state){

		var self = this;

    self.getAllProjects = getAllProjects;
    self.projectEdit = projectEdit;
    self.projectUpdate = projectUpdate;
    self.projectNew = projectNew;
    self.projectCreate = projectCreate;
    self.projectDelete = projectDelete;
    self.partialTitle = ''
    self.enote = '';

    getAllProjects();

    // --- getAllProjects ---
    function getAllProjects(){
      $http({
        method: 'GET',
        url: `projects/`,
        data: {},
        responseType: 'json'
      })
      .then(function(response){
        self.projectList = response.data;
        console.log("apiRESPONSE-getAllProjects", response.data);
      })
      .catch((err) => { console.log(err) });
    }

    // --- project EDIT
    function projectEdit(i){
      $http({
        method: 'GET',
        url: `projects/${self.projectList[i]._id}/edit`,
        data: {},
        responseType: 'json'
      })
      .then(function(response){
        console.log("apiRESPONSE-projectEdit", response.data);
        self.oneProject = response.data;
        self.oneIndex = i;
        $state.go('edit');
      })
      .catch((err) => { console.log(err) });
    }

    // --- project Update
    function projectUpdate(oneProject){
      console.log("apiARGUMENT-projectUpdate", oneProject);
      $http({
        method: 'PUT',
        url: `projects/${self.projectList[self.oneIndex]._id}`,
        data: {oneProject},
        responseType: 'json'
      })
      .then(function(response){
        console.log("apiRESPONSE-projectUpdate", response.data);
        //self.oneProject = response.data;
        //self.projectList[self.oneIndex] = response.data;
        self.projectList[self.oneIndex] = oneProject;
        $state.go('home');
      })
      .catch((err) => { console.log(err) });
    }

    // --- project New
    function projectNew(){
      self.oneProject = '';
      $state.go('new');
    }

    // --- project Create
    function projectCreate(oneProject){
      console.log("apiARGUMENT-projectNew", oneProject);
      $http({
        method: 'POST',
        url: `projects/`,
        data: {oneProject},
        responseType: 'json'
      })
      .then(function(response){
        console.log("apiRESPONSE-projectNew", response.data);
        //self.oneProject = response.data;
        //self.projectList[self.oneIndex] = response.data;
        self.projectList.push(response.data);
        $state.go('home');
      })
      .catch((err) => { console.log(err) });
    }

    // --- project delete
    function projectDelete(i){
      console.log("apiARGUMENT-projectDelete", self.projectList[i]._id);
      $http({
        method: 'DELETE',
        url: `projects/${self.projectList[i]._id}`,
        data: {},
        responseType: 'json'
      })
      .then(function(response){
        console.log("apiRESPONSE-projectDelete", response.data);

        self.projectList.splice(i,1)
        $state.go('home');
      })
      .catch((err) => { console.log(err) });
    }



      // ===============================
      //     MagazineModel.find({}, function(err, allMagazine){
      //       if (err) { console.log("*1*", err)};
      //       var viewData = {
      //         magazineIndex: allMagazine,
      //         title: 'Browse Magazine',
      //         actualUser: req.user.username
      //       };
      //       var searchString = req.query.searchString;
      //       console.log("buscame", searchString);
      //       if (searchString) {
      //          viewData.magazineIndex = allMagazine.filter(function(magazine){
      //            return magazine.magazinename.toLowerCase().includes(searchString.toLowerCase());
      //          });
      //        };
      //       res.render('magazine/index', viewData);
      //     });
      //   }
      // });

      // ------------------------------------


      // $http({
      //   method: 'GET',
      //   url: `${rootUrl}/api/tasks`,
      //   data: {},
      //   headers: {Authorization: `Bearer ${localStorage.activeToken}`},
      //   responseType: 'json'
      // })
      // .then(function(response){
      //   self.taskList = response.data;
      //   console.log("RESPONSE-getAllTasks", response.data);
      // })
      // .catch((err) => { console.log(err) });
      // ==========================================================

    // // --- myPendingTasks ---
    // function myPendingTasks(){
    //   self.pendingTasks = self.taskList.filter(function(x){ return x.assigned_to == localStorage.activeUserIdid; })
    //   return self.pendingTasks;
    // }
    //
    // // --- myDelegatedTasks ---
    // function myDelegatedTasks(){
    //   self.delegatedTasks = self.taskList.filter(function(x){ return x.assigned_by == localStorage.activeUserIdid; })
    //   return self.pendingTasks;
    // }
    //
    // // --- newTask ---
    // function newTask(i){
    //   console.log(`getOneTask function call for next line`);      // test - 2B deleted
    //   $http({
    //     method: 'GET',
    //     url: `${rootUrl}/api/users`,
    //     data: {},
    //     headers: {Authorization: `Bearer ${localStorage.activeToken}`},
    //     responseType: 'json'
    //   })
    //   .then(function(response){
    //     console.log("RESPONSE-getOneTask", response.data);         // test - 2B deleted
    //     self.allUsers = response.data;
    //     self.partialTitle = "Add New Task";
    //     self.detail = '';
    //
    //     $state.go('taskNew');
    //   })
    //   .catch((err) => { console.log(err) });
    // }
    //
    // // --- createTask ---
    // function createTask(detail){
    //   console.log(`createTask function call from newTask`);      // test - 2B deleted
    //   console.log("PASSED detail", detail);                      // test - 2B deleted
    //   $http({
    //     method: 'POST',
    //     url: `${rootUrl}/api/tasks`,
    //     data: {
    //       name: detail.name,
    //       description: detail.description,
    //       assigned_by: localStorage.activeUserId,
    //       assigned_to: detail.theUser.id,
    //       date_assigned: new Date(),
    //       date_due: detail.date_due,
    //       is_complete: false
    //     },
    //     headers: {Authorization: `Bearer ${localStorage.activeToken}`},
    //     responseType: 'json'
    //   })
    //   .then(function(response){
    //     console.log("RESPONSE-createTask", response.data);                 // test - 2B deleted
    //     self.taskOne = response.data;
    //     self.taskList.push(response.data);
    //     self.detail = '';
    //
    //     $state.go('indexAll');
    //   })
    //   .catch((err) => { console.log(err) });
    // }
    //
    //
    // // --- getOneTask ---
    // function getOneTask(i){
    //   console.log(`getOneTask function call for line ${i}`);
    //   $http({
    //     method: 'GET',
    //     url: `${rootUrl}/api/tasks/${self.taskList[i].id}`,
    //     data: {},
    //     headers: {Authorization: `Bearer ${localStorage.activeToken}`},
    //     responseType: 'json'
    //   })
    //   .then(function(response){
    //     self.taskOne = response.data;
    //     console.log("RESPONSE-getOneTask", response.data);
    //     self.detail = response.data;
    //     self.detail.theUser = {id : response.data.id, username: response.data.username}
    //     self.partialTitle = "Task Details";
    //
    //     $state.go('taskEdit');
    //   })
    //   .catch((err) => { console.log(err) });
    // }
    //
    // // --- createTask ---
    // function updateTask(detail){
    //   console.log(`updateTask function call from getOneTask`);      // test - 2B deleted
    //   console.log("PASSED detail", detail);                      // test - 2B deleted
    //   $http({
    //     method: 'PUT',
    //     url: `${rootUrl}/api/tasks/${self.detail.id}`,
    //     data: {
    //       name: detail.name,
    //       description: detail.description,
    //       //assigned_to: detail.theUser.id,    // to be decided later
    //       //date_due: detail.date_due,         // to be decided later
    //       is_complete: detail.is_complete
    //     },
    //     headers: {Authorization: `Bearer ${localStorage.activeToken}`},
    //     responseType: 'json'
    //   })
    //   .then(function(response){
    //     console.log("RESPONSE-updateTask", response.data);                 // test - 2B deleted
    //     self.taskOne = response.data;
    //     var x = self.taskList.findIndex(function(e) {return e.id === response.data.id});
    //     self.taskList[x] = response.data;
    //     self.detail = '';
    //
    //     $state.go('indexAll');
    //   })
    //   .catch((err) => { console.log(err) });
    // }
    //
    // // --- deleteOneTask ---
    // function deleteOneTask(i){
    //   console.log(`deleteOneTask function call line ${i}`);
    //   $http({
    //     method: 'DELETE',
    //     url: `${rootUrl}/api/tasks/${self.taskList[i].id}`,
    //     data: {},
    //     headers: {Authorization: `Bearer ${localStorage.activeToken}`},
    //     responseType: 'json'
    //   })
    //   .then(function(response){
    //     console.log("RESPONSE-deleteOneTask", response.data);         // test - 2B deleted
    //     self.taskList.splice(i,1);
    //
    //     $state.go('indexAll');
    //   })
    //   .catch((err) => { console.log(err) });
    //
  }

})()
