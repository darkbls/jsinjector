(function (angular) {
  'use strict';

  var app = angular.module('options');

  app.controller('optionsController', [
    '$scope',
    'persistenceService',
    'manifest',
    '$location',
    '$timeout',
    '$modal',
    function ($scope, persistenceService, manifest, $location, $timeout, $modal) {

      function listItems() {
        /**
         * var itemStructure = { code: '',  url: '',  guid: '', enabled: ''};
         */
        persistenceService.get({items: []}, function (results) {
          $scope.items = results.items;
          $scope.$apply();
        });
      }

      $scope.showForm = false;
      $scope.edit = {};

      manifest(function (data) {
        $scope.manifest = data;
      });

      $scope.save = function (item) {

        if (item.$$hashKey) {
          item = angular.fromJson(angular.toJson(item));
        }

        if (item) {
          persistenceService.save(item, function () {
            console.log('controller success callback');

            $scope.savedSuccessfully = true;

            if (item === $scope.inject) {
              $scope.inject = {};
            }
            $scope.showForm = false;
            listItems();
            $timeout(function () {
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

      $scope.help = function (size) {
        $modal.open({
          templateUrl: 'help.html',
          controller : 'helpController',
          size       : size
        });
      };


      listItems();
      if ($location.path() === '/add') {
        $scope.showForm = true;
      }

    }
  ]);

}(angular));
