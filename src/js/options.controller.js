(function () {
  'use strict';

  var app = angular.module('options');

  app.controller('optionsController', [
    '$scope',
    'persistenceService',
    'generateGuid',
    function ($scope, persistenceService, generateGuid) {

      $scope.save = function () {
        var item;

        if (!this.inject) {
          return;
        }

        item = this.inject;

        persistenceService.get({items: []}, function (results) {
          var l = results.items.length, i;

          if (!item.guid) {
            item.guid = generateGuid();
            results.items.push(item);
          } else {
            for (i = 0; i < l; i++) {
              if (results.items[i].guid === item.guid) {
                results.items[i] = item;
                break;
              }
            }
          }

          persistenceService.set(results, function () {
            console.debug('saved successfully');
          });
        });

      };

      persistenceService.get({items: []}, function (results) {
        if (results.items.length > 0) {
          $scope.inject = results.items[0];
          $scope.$apply();
        }
      });
    }
  ])
  ;

}());
