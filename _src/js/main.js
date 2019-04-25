/* jshint browser: true, jquery: true, devel: true, esversion: 6 */
/* global TimelineLite */

var currentScreen = '.screen-idle',
    idleTimer,
    screenTl = new TimelineLite(),
    timeoutInterval = 180000,
    modalIsActive = false,
    activeIsi = false;


// ******************** //

function screenSaver() {
  'use strict';
  // console.log('starting screensaver');
  screenTl.to($('.ss2'), 2, {delay: 8, opacity: 1})
          .to($('.ss3'), 2, {delay: 8, opacity: 1})
          .set($('.ss2'), {opacity: 0})
          .to($('.ss3'), 2, {delay: 8, opacity: 0, onComplete: screenSaver});
  screenTl.play(0);
}

function showModal(target) {
  'use strict';
  modalIsActive = true;
  var modalToShow = '.modal-'+target;
  $(modalToShow).addClass('is-visible');
  if ($(modalToShow).find('.chart-content')) {
    $('.chart-content').scrollTop(0);
  }
  if ($(modalToShow).find('.chart2-content')) {
    $('.chart2-content').scrollTop(0);
  }
  $('.modal-overlay').removeClass('is-hidden');
  $('.modal-overlay').animate({opacity: 1}, 100);
}

function hideModal() {
  'use strict';
  modalIsActive = false;
  $('.modal-overlay').animate({opacity: 0}, 100);
  setTimeout(function(){
    $('.modal-overlay').addClass('is-hidden');
  }, 400);
  $('.modal').removeClass('is-visible');
  if ($('.modal-overlay').hasClass('special')) {
    $('.modal-overlay').toggleClass('special');
  }
}

function hideISI() {
  'use strict';
  activeIsi = false;
  $('.modal-isi').animate({top: 1090}, 100);
  $('.modal-overlay').animate({opacity: 0}, 100);  setTimeout(hideModal, 600);
}

function showIdle() {
  'use strict';
  $(currentScreen).hide();
  $('.nav').hide();
  hideModal();
  hideISI();
  $('.active').css('opacity', '0');
  $('.screen-idle').show();
  screenSaver();
}

function navigateTo(target) {
  'use strict';
  if (modalIsActive === true) {
    hideModal();
  }
  var pageToShow = '.screen-'+target;
  var navIndex = '.'+target;
  $('.screen-summary').hide();
  $('.summary').css('opacity', '0');
  $(pageToShow).show();
  $(navIndex).css('opacity', '1');
}

// *************************** //

$('.nav, .screen-home, .screen-euridis, .screen-clinical, .screen-athena, .screen-initiation, .screen-dosing, .screen-summary').hide();

$('.modal-close, .modal-overlay').on('click tap', hideModal);
$('.modal-close-isi').on('click tap', hideISI);

$('.refs-btn, .study-design-btn, .study-design2-btn, .adverse-events-btn, .adverse-events2-btn').on('click tap', function(){
  'use strict';
  var whichModal = this.getAttribute('data-target');
  showModal(whichModal);
});

$('.screen-idle').on('click tap', function(){
  'use strict';
  $('.screen-idle').hide();
  $('.screen-home, .nav').show();
  $('.home').css('opacity', '1');
  currentScreen = '.screen-home';
  screenTl.stop();
  // console.log('stopping screensaver');
  idleTimer = setTimeout(showIdle, timeoutInterval);
});

$('.touch-screen').on('click tap', function() {
  'use strict';
  // console.log('resetting');
  clearTimeout(idleTimer);
  idleTimer = setTimeout(showIdle, timeoutInterval);
});

$('.active').on('click tap', function(){
  'use strict';
  if (modalIsActive === true) {
    hideModal();
  }
  if (activeIsi === true) {
    hideISI();
  }
  var pageName = this.className.split(' ')[1];
  var pageToShow = '.screen-' + pageName;
  $('.active').css('opacity', '0');
  $(this).css('opacity', '1');
  $(currentScreen).hide();
  $(pageToShow).show();
  currentScreen = pageToShow;
});

$('.isi-btn').on('click tap', function(){
  'use strict';
  activeIsi = true;
  $('.modal-isi').addClass('is-visible');
  $('.modal-overlay').removeClass('is-hidden');
  $('.modal-overlay').toggleClass('special');
  $('.modal-overlay').animate({opacity: 1}, 100);
  $('.modal-isi').animate({
    top: 36
  }, 100);
  $('.isi-content').animate({scrollTop: 0}, 200);
});

$('.eur-btn, .clin-btn, .ath-btn, .init-btn, .dose-btn').on('click', function() {
  'use strict';
  var newPage = this.getAttribute('data-target');
  navigateTo(newPage);
  currentScreen = '.screen-'+newPage;
});

screenSaver();
