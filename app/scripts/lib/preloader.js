"use strict";

;(function (win, doc) {

  var DEBUG = false;
  win.preloader = {
    init: function () {},
    onLoad: function () {},
    id: null,
    beforeImages: [],
    onInit: null,
    beforeRemove: null,
    afterRemove: null,
  }

  preloader.init = function (args) {

    if (args) {
      for (var p in args) {
        this[p] = args[p];
      }
    }

    var _this = this;

    if (DEBUG) debugger;

    _PreLoadImg(_this.beforeImages, function () {
      setTimeout(function () {
        _this.remove()
      }, 300);
    })

    if (this.onInit) {
      this.onInit();
    }
  }

  preloader.remove = function () {

    if (DEBUG) debugger;

    var lazyloadImg = null;
    var body = null;
    var pre = null;

    if (this.beforeRemove) {
      this.beforeRemove();
    }

    lazyloadImg = document.querySelectorAll('.j-lazyload');

    for (var i = 0; i < lazyloadImg.length; i++) {
      lazyloadImg[i].src = lazyloadImg[i].getAttribute('data-src');
    };

    body = document.getElementsByTagName('body')[0];
    pre = document.getElementById(this.id);
    body.removeChild(pre)

    if (this.afterRemove) {
      this.afterRemove();
    }
  }

  function _PreLoadImg(b, e) {

    var c = 0,
      a = {},
      d = 0,
      src = '';

    for (src in b) {
      d++
    }

    for (src in b) {
      a[src] = new Image();
      a[src].onload = function () {
        if (++c >= d) {
          e(a)
        }
      };
      a[src].src = b[src]
    }

  }

})(window, document);