(function() {
  'use strict';

  angular.module('csvParser', ['ui.router', 'ngFileUpload', 'ngMaterial', 'lfNgMdFileInput'])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  });

})();
