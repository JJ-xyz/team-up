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
    self.memberNew = memberNew;
    self.memberAdd = memberAdd;
    self.memberEdit = memberEdit;
    self.memberUpdate = memberUpdate;
    self.memberDelete = memberDelete;
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
        response.data.dateStart = new Date(response.data.dateStart);
        if (response.data.dateEnd) {response.data.dateEnd = new Date(response.data.dateEnd)}
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

    // --- member ADD
    function memberNew(i){
      console.log("apiARGUMENT-memberNew", self.projectList[i]);
      self.oneIndex = i;
      self.oneProject = self.projectList[i];
      self.oneMember = '';
      $state.go('member');
    }

    // --- project Update + member ADD
    function memberAdd(oneMember){
      console.log("apiARGUMENT-memberAdd", oneMember);
      self.projectList[self.oneIndex].memberList.push(oneMember);
      console.log("------------------for", self.projectList[self.oneIndex]);
      projectUpdate(self.projectList[self.oneIndex]);
      $state.go('home');
    }

    // --- member EDIT
    function memberEdit(i,j){
      console.log("apiARGUMENT-memberEdit", self.projectList[i]);
      self.oneIndex = i;
      self.innerIndex = j;
      self.oneProject = self.projectList[i];
      self.oneMember = self.projectList[i].memberList[j];
      self.partialTitle = "Member Edit";
      $state.go('memberedit');
    }

    // --- project Update + member EDIT
    function memberUpdate(oneMember){
      console.log("apiARGUMENT-memberUpdate", oneMember);
      self.projectList[self.oneIndex].memberList[self.innerIndex] = oneMember;
      console.log("------------------for", self.projectList[self.oneIndex]);
      projectUpdate(self.projectList[self.oneIndex]);
      $state.go('home');
    }
    // --- project Update + member DELETE
    function memberDelete(i,j){
      console.log("apiARGUMENT-memberDelete", self.projectList[i].memberList[j]);
      console.log("apiARGUMENT----------for", self.projectList[i]);
      self.projectList[i].memberList.splice(j,1);
      self.oneIndex = i;
      console.log("-------------------as", self.projectList[j]);
      projectUpdate(self.projectList[i]);
      $state.go('home');
    }



  }

})()
