/* jshint browser: true, jquery: true, devel: true, esversion: 6 */

(function(){
  'use strict';

  // app is our main project namespace.
  var app = window.app || {};

    app.util = {

      isLocalhost: () => {
        return /localhost/.test(window.location.hostname);
      },

      scrollLocker : (action) => {
         let htmlPos = $(window).scrollTop(),
             target = 'html';

         if(action === true) {

            $(target).css({
             'overflow-y':'scroll',
             'position':'fixed',
             'width':'100%',
             'left':'0',
             'top': -htmlPos });
         }

         if(action === false) {
           // Actual position is negative
           // We parseInt to remove the 'px' at the end
           // We can't use $('html').position().top because it won't
           // work on IE10 and IE9.
           var originalPosition = parseInt($(target).css('top'), 10) * -1;
           $(target).removeAttr('style');
           $(window).scrollTop(originalPosition);
         }

      },

      debounce : function(fn, wait = 300) {
        let timeout;
        return function() {
          var ctx = this, args = arguments;
          clearTimeout(timeout);
          timeout = setTimeout(()=> {
              fn.apply(ctx, args);
          }, wait || 100);
        };
      },

    };

    app.screensaver = {


    };

  // Make our namespace globally available.
  window.app = app;

})(this);
