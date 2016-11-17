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
      })
      .state('login', {
        url: "/login",
        templateUrl: "partials/login.html",
      })
      .state('profile', {
        url: "/profile",
        templateUrl: "partials/profile.html",
      })
      .state('signup', {
        url: "/signup",
        templateUrl: "partials/signup.html",
      })
      .state('logout', {
        url: "/",
        templateUrl: "partials/login.html",
      });


    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  }
})()
