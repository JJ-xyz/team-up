(function() {
  angular
	  .module('team-up', ['ui.router'])
    .config(MainRouter);

  MainRouter.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

  function MainRouter($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('home', {
        url: "/",
        templateUrl: "partials/home.html",
      })
      .state('new', {
        url: "/new",
        templateUrl: "partials/new.html",
      })
      .state('edit', {
        url: "/edit",
        templateUrl: "partials/edit.html",
      });

    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  }
})()
