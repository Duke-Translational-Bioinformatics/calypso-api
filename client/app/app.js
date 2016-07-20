(function() {
  'use strict';

  angular.module('csvParser', ['ui.router', 'ngFileUpload'])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  });
  
})();
