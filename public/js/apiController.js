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











  }

})()
