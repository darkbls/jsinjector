/*jslint browser: true */
/*jslint indent: 2 */

(function (chrome, console) {
  'use strict';

  var inject = {
    items: []
  };

  inject.updateItemCollection = function (items) {

    var storageStatus = function () {
      console.debug('storage loaded, items count: ', inject.items.length);
    };

    if (!items) {
      chrome.storage.sync.get({items: []}, function (results) {
        inject.items = results.items;
        storageStatus();
      });

    } else {
      inject.items = items;
      storageStatus();
    }

  };

  chrome.browserAction.onClicked.addListener(function () {
    console.debug('user activated injection');
    chrome.tabs.create({url: "options.html#add"}, function (tab) {});
  });


  chrome.webNavigation.onCompleted.addListener(function (details) {

    var l = inject.items.length, i, target_url, target_code;
    for (i = 0; i < l; i++) {
      target_url = inject.items[i].url.replace('/', '\\/');
      target_code = inject.items[i].code;
      if (details.url.match(target_url)) {
        chrome.tabs.executeScript({code: target_code }, function () {
          console.debug('code injected');
        });
      }
    }
  });

  chrome.storage.onChanged.addListener(function (changes, namespace) {
    var key,
        storageChange;

    for (key in changes) {
      if (changes.hasOwnProperty(key)) {
        if (key === "items") {
          storageChange = changes[key];
          console.debug("update detected, syncing...");
          inject.updateItemCollection(storageChange.newValue);
        }
      }
    }
  });

  inject.updateItemCollection();


}(chrome, console));

