/* jshint browser: true, jquery: true, devel: true, esversion: 6 */
/* global app */

(function(window, undefined) {
  'use strict';

  app.scroll = {
    init: function() {
      $('.isi').slimScroll({
          color: '#b2205e',
          allowPageScroll: true,
          alwaysVisible: true,
          railVisible: true,
          opacity: 1,
          disableFadeOut: true,
          size: '9px',
          height: '1080px'
      });
    }
  };

}(this));
