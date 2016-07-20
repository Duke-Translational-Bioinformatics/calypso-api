(function (angular, undefined) {
  'use strict';

  angular.module('csvParser')
  .controller('MainController', ['$scope', 'Upload', function($scope, Upload){
    $scope.uploadFile = function(file) {
      console.log(file);
      file.upload = Upload.upload({
        url: '/api/upload',
        data: {file: file}
      });

      file.upload.then(function(response){
        console.log(response);
      });
    };
  }]);

}(angular));
