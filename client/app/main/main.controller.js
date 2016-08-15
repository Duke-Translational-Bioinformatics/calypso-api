(function () {
  'use strict';

  angular.module('csvParser')
  .controller('MainController', ['$scope', 'Upload', function($scope, Upload) {

    $scope.uploadFile = function(files) {

      if (files && files.length) {
        for(var i = 0; i < files.length; i++) {
          Upload.upload({
            url: '/api/upload',
            data: {file: files[i]}
          });
        }
      }
    };
    
  }]);

}());
