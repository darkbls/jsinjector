(function (chrome, $) {
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

    .factory('persistenceService', function (generateGuid) {
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

      persistence.findAndReplace = function (items, item) {
        var l = items.length, i;

        for (i = 0; i < l; i++) {
          if (items[i].guid === item.guid) {
            items[i] = item;
            return true;
          }
        }
        return false;
      };

      persistence.filterItemOutByGuid = function (items, guid) {
        var l = items.length, i, results = [];

        for (i = 0; i < l; i++) {
          if (items[i].guid === guid) {
            continue;
          }

          results.push(items[i]);
        }
        return results;
      };

      persistence.save = function (item, successCallback) {
        persistence.get({items: []}, function (results) {

          item.enabled = true;

          if (!item.guid) {
            item.guid = generateGuid();
            results.items.push(item);
          } else {
            persistence.findAndReplace(results.items, item);
          }

          persistence.set(results, function () {
            console.debug('saved successfully');
            successCallback ? successCallback() : null;
          });
        });
      };

      persistence.remove = function (guid) {
        persistence.get({items: []}, function (results) {
          results.items = persistence.filterItemOutByGuid(results.items, guid);
          persistence.set(results, function () {
            console.debug('saved successfully');
          });
        });
      };

      return persistence;
    })

    .factory('manifest', function ($http) {
      return (function (callback) {
        $http({method: 'GET', url: '/manifest.json'}).success(function (data) {
          callback(data);
        });
      });
    })

    .factory('generateGuid', function () {
      return (function () {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }

        return function () {
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
        };
      }())
    })

    .factory('addItemForm', function () {
      return {
        show: function () {
          $('.add-wrapper').slideDown();
        },
        hide: function () {
          $('.add-wrapper').slideUp();
        }
      };
    })
  ;


}(chrome, jQuery));

