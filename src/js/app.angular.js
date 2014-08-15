(function (chrome) {
  'use strict';

  angular.module('options', [])

    .factory('duplicateTagTooltip', function () {
      return {
        show: function () {
          $('.bs-tooltip').tooltip('show')
        },
        hide: function () {
          $('.bs-tooltip').tooltip('hide')
        }
      };
    })

    .factory('persistenceService', function () {
      var persistence = {};

      persistence.set = function (items, callback) {
        chrome.storage.sync.set(items, function () {
          callback()
        });
      };

      persistence.get = function (items) {
        chrome.storage.sync.get(items, function (elements) {
          console.log(elements);
          return elements;
        });
      };

      return persistence;
    });
}(chrome));

