(function (angular) {
  'use strict';

  var app = angular.module('options');

  app.controller('optionsController', [
    '$scope',
    'persistenceService',
    'generateGuid',
    'manifest',
    '$location',
    '$timeout',
    function ($scope, persistenceService, generateGuid, manifest, $location, $timeout) {

      $scope.showForm = false;
      $scope.edit = {};

      manifest(function (data) {
        $scope.manifest = data;
      });

      $scope.save = function (item) {

        if (item["$$hashKey"]) {
          item = angular.fromJson(angular.toJson(item));
        }

        if (item) {
          persistenceService.save(item, function () {
            console.log('controller success callback');

            $scope.savedSuccessfully = true;

            if (item == $scope.inject) {
              $scope.inject = {};
            }
            $scope.showForm = false;
            listItems();
            $timeout(function(){
              $scope.savedSuccessfully = false;
            }, 1500);
          });
        }
      };

      $scope.remove = function (item) {
        persistenceService.remove(item.guid, function () {
          listItems();
        });
      };

      function listItems() {
        /**
         * var itemStructure = {
           code: '',
           url: '',
           guid: '',
           enabled: ''
         };
         */
        persistenceService.get({items: []}, function (results) {
          $scope.items = results.items;
          $scope.$apply();
        });
      }

      listItems();
      if ($location.path() == '/add') {
        $scope.showForm = true;
      }

    }
  ])
  ;

}(angular));
