/* jshint browser: true, jquery: true, devel: true, esversion: 6 */
/* global app */

(function(window, undefined) {
  'use strict';

  app.events = {

    clickEvents: () => {

      let myVar;
      let num = 8;

      function myFunction() {
        myVar = setInterval(()=> {
          if(num !== 0) {
            $('.screen-item-02 .timer').text(num--);
          } else {
            $('.screen-item-02').addClass('is-hidden');
            $('.screen-item-03').removeClass('is-hidden');
          }
        }, 1000);
      }

      function myStopFunction() {
        clearTimeout(myVar);
        num = 8;
        $('.screen-item-02 .timer').text(9);
      }

      $('.profile-btn').on('click', function(e) {
        e.preventDefault();

        const profileName = $(this).attr('data-profile');
        const profileNum = profileName.replace('profile-', 'Video ');
        const path = '_Assets/img/profile/' + profileName + '.png';

        $('.screen-item-02 .profile-img').attr('src', path);
        $('.screen-item-02 .video-name').text(profileNum);
        $('.screen-item-01').addClass('is-hidden');
        $('.screen-item-02').removeClass('is-hidden');

        // start counting
        myFunction();
      });

      $('.select-video-btn').on('click', (e) => {
        e.preventDefault();
        $('.screen-item-02').addClass('is-hidden');
        $('.screen-item-01').removeClass('is-hidden');

        // stop counting
        myStopFunction();
      });

    },

    counter: (action) => {
      let timer;
      let num = 8;

      console.log(action);

      if(action === 'start') {
        timer = setInterval(()=> {
          if(num !== 0) {
            $('.screen-item-02 .timer').text(num--);
          } else {
            $('.screen-item-02').addClass('is-hidden');
            $('.screen-item-03').removeClass('is-hidden');
          }
        }, 1000);
      }

      function stopCounter() {
        clearTimeout(timer);
      }

      if(action === 'stop') {
        stopCounter();
      }

    },

    init: function() {
      this.clickEvents();
    }
  };

}(this));
