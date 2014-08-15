/*jslint browser: true */
/*jslint indent: 2 */

(function (options) {
  'use strict';

  try {
    var property, items, l, i;

    for (property in options) {
      if (options.hasOwnProperty(property)) {
        if (options[property]) {
          items = document.getElementsByTagName(property);
          l = items.length;
          for (i = 0; i < l; i += 1) {
            items[0].parentNode.removeChild(items[0]);
          }
        }
      }
    }

  } catch (ignore) {
  }

}(options || {
  img  : true,
  style: false,
  link : false
}));
