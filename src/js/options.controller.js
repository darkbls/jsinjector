(function () {
  'use strict';

  var app = angular.module('options');

  app.controller('optionsController', [
    '$scope',
    'persistenceService',
    'generateGuid',
    'manifest',
    'addItemForm',
    function ($scope, persistenceService, generateGuid, manifest, addItemForm) {

      $scope.showForm = addItemForm.show;
      $scope.hideForm = addItemForm.hide;

      manifest(function (data) {
        $scope.manifest = data;
      });

      $scope.save = function () {
        if (this.inject) {
          persistenceService.save(this.inject, function (){
            console.log('controller success callback');
          });
        }
      };

      $scope.remove = function (item) {
        persistenceService.delete(item.guid);
        listItems();
      };

       function listItems() {
        persistenceService.get({items: []}, function (results) {
          if (results.items.length > 0) {
            $scope.items = results.items;
            $scope.$apply();
          }
        });
      }

      listItems();

    }
  ])
  ;

}());
