(function (angular) {
  'use strict';

  var app = angular.module('options');

  app.controller('helpController', [
    '$scope',
    '$modalInstance',
    function ($scope, $modalInstance) {
      $scope.ok = function () {
        $modalInstance.close();
      };
    }
  ])
  ;

}(angular));
