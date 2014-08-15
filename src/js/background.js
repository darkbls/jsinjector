/*jslint browser: true */
/*jslint indent: 2 */

(function (chrome) {
  'use strict';

  var removeAssets = {
    active  : false,
    interval: false,
    options : {
      img  : true,
      style: false,
      link : false
    }
  };

  removeAssets.start = function () {
    if (removeAssets.interval !== false) {
      return;
    }

    chrome.browserAction.setIcon({path: 'iconActive.png'});
    removeAssets.interval = setInterval(function () {
      removeAssets.disableAssets();
    }, 500);
    removeAssets.active = true;
  };

  removeAssets.shutdown = function () {
    clearInterval(removeAssets.interval);
    chrome.browserAction.setIcon({path: 'icon.png'});
    removeAssets.active = false;
    removeAssets.interval = false;
  };

  removeAssets.isActive = function () {
    return removeAssets.active;
  };

  removeAssets.disableAssets = function () {
    if (removeAssets.active === true) {
      chrome.tabs.executeScript({code: "var options = " + JSON.stringify(removeAssets.options) }, function () {
        chrome.tabs.executeScript({ file: 'js/unload.js' });
      });

    }
  };

  removeAssets.readOptions = function () {
    chrome.storage.sync.get({
      img  : removeAssets.options.img,
      style: removeAssets.options.style,
      link : removeAssets.options.link
    }, function (items) {
      removeAssets.options = items;
    });
  };

  chrome.browserAction.onClicked.addListener(function () {

    if (removeAssets.isActive()) {
      removeAssets.shutdown();
    } else {
      removeAssets.readOptions();
      removeAssets.start();
    }

  });

}(chrome));
