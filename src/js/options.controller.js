(function () {
  'use strict';

  var app = angular.module('options');

  app.controller('optionsController', [
    '$scope',
    'persistenceService',
    function ($scope, persistenceService) {

      $scope.save = function () {
        var injectData = this.inject;
        persistenceService.set(this.inject, function () {
          console.log(injectData);
        });
      };

      function getBio(){
        var deferred = $q.defer();
        // async call, resolved after ajax request completes
        return deferred.promise;
      }


      persistenceService.get({url: '', code: ''});

    }
  ]);

}());
