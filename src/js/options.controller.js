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
    '$modal',
    function ($scope, persistenceService, generateGuid, manifest, $location, $timeout, $modal) {

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

      $scope.help = function (size) {
        var modalInstance = $modal.open({
          templateUrl: 'help.html',
          controller: 'helpController',
          size: size
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

  var ModalInstanceCtrl = function ($scope, $modalInstance) {
    $scope.ok = function () {
      $modalInstance.close();
    };
  };


}(angular));
