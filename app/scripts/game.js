var dpwGame = (function () {
  'use strict';

  function dpwGame(args) {
    // enforces new
    if (!(this instanceof dpwGame)) {
      return new dpwGame(args);
    }
    // constructor body
  }

  dpwGame.prototype = {
    "name": "\u5FB7\u6251\u738B\u724C\u578B\u5927\u6311\u6218",
    "status": 0,
    "issue": null,
    "version": "0.0.1",
  };

  dpwGame.prototype.getIssue = function (args) {
    // method body
  };

  return dpwGame;
}());