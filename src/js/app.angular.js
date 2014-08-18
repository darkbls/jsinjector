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

      persistence.get = function (items, callback) {
        chrome.storage.sync.get(items, function (elements) {
          callback(elements);
        });
      };

      return persistence;
    })

    .factory('generateGuid', function () {
      return (function() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return function() {
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
        };
      }())
    });
}(chrome));

