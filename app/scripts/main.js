"use strict";

window.addEventListener('DOMContentLoaded', function () {

  var imgArr = [];
  var dpw = new dpwGame();

  $('.j-lazyload').each(function (index, el) {
    imgArr.push($(this).attr('data-src'));
  });

  //Init preloader
  preloader.init({
    id: 'j-preload',
    beforeImages: imgArr,
    onInit: function () {},
    beforeRemove: function () {
      $('#j-game').show();
    },
    afterRemove: function () {}
  });

  $('#j-card').on('click', function () {
    $('#j-mask').show();
  });

  $('#j-mask-close').on('click', function () {
    $('#j-mask').hide();
  });

});

window.addEventListener('load', function () {
  FastClick.attach(document.body);
}, false);