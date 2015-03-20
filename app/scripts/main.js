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

  var mask = (function () {
    'use strict';

    function mask(args) {
      // enforces new
      if (!(this instanceof mask)) {
        return new mask(args);
      }
      // constructor body
    }

    mask.prototype = {
      'maskEl': null,
      'cardEl': null,
      'closeEl': null,
      'type': 1
    };

    mask.prototype.init = function (args) {

      var _this = this;

      if (args) {
        for (var prop in args) {
          if (args.hasOwnProperty(prop)) {
            _this[prop] = args[prop];
          }
        }
      }

      if (_this.maskEl && _this.closeEl) {
        _this.bindEvent();
      } else {
        return;
      }

    };

    mask.prototype.bindEvent = function () {
      var _this = this;

      _this.cardEl.on('touchstart click', function () {
        _this.type = 1;
        _this.toggleMask(1, 1);
      });

      _this.closeEl.on('touchstart click', function () {
        _this.toggleMask(0, 0);
      });

    };

    mask.prototype.toggleMask = function (a, b) {

      var _this = this;

      if (_this.type) {
        if (b) {
          $('#j-mask .m-mask-main').show();
        } else {
          setTimeout(function () {
            $('#j-mask .m-mask-main').hide();
          }, 300);
        }
      } else {
        if (b) {
          $('#j-mask .m-mask-end').show();
        } else {
          $('#j-mask .m-mask-end').hide();
        }
      }

      if (a) {
        _this.cardEl.addClass('active');
      } else {
        _this.cardEl.removeClass('active');
      }

      if (b) {
        _this.maskEl.addClass('active');
      } else {
        _this.maskEl.removeClass('active');
      }

    };

    return mask;
  }());

  var Mask = new mask();
  Mask.init({
    maskEl: $('#j-mask'),
    cardEl: $('#j-card'),
    closeEl: $('.j-mask-close'),
  });

  var game = new dpwGame();
  game.init({
    onGameOver: function () {
      Mask.type = 0;
      Mask.toggleMask(0, 1);
    },
    onRestart: function () {
      Mask.type = 0;
      Mask.toggleMask(0, 0);
    }
  });

  // add btn event
  $('.j-game-start').on('touchstart click', function (event) {
    var gameType = $(this).attr('data-gametype');
    game.start(gameType);
  });

  $('#j-card-group').on('touchstart click', 'button', function (event) {
    event.preventDefault();
    var aw = Number($(this).attr('data-aw')) || 0;
    game.answerItem(aw, $(this));

  });

  $('#j-game-restart').on('touchstart click', function (event) {
    event.preventDefault();
    game.restart();
  });

});

window.addEventListener('load', function () {
  FastClick.attach(document.body);
}, false);