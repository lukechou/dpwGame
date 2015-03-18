var dpwGame = (function () {
  'use strict';

  function dpwGame(args) {
    // enforces new
    if (!(this instanceof dpwGame)) {
      return new dpwGame(args);
    }
    // constructor body
  }

  /*
   * name  类名
   * status  游戏状态 0-未开始 1-进行中 2-结束
   * issue  问题数据
   * version 版本号
   * onInit  初始化回调
   * gameType  游戏类型
   * itemIndex  题目索引+
   * awGroup  答案标题
   * colorGroup  花色对应字体图标
   * cardGroup  扑克对应字体图标
   *
   */
  dpwGame.prototype = {
    'name': '\u5FB7\u6251\u738B\u724C\u578B\u5927\u6311\u6218',
    'status': 0,
    'issue': null,
    'version': '0.0.1',
    'onInit': null,
    'gameType': null,
    'dtzId': null,
    'startTime': null,
    'correct': 0,
    'fault': 0,
    'itemIndex': 0,
    'awGroup': ['', '皇家同花顺', '同花顺', '金刚', '葫芦', '同花', '顺子', '三条', '两对', '一对', '高牌'],
    'colorGroup': ['', '&#xe60e;', '&#xe60d;', '&#xe610;', '&#xe60f;'],
    'cardGroup': ['', '', '&#xe600;', '&#xe601;', '&#xe602;', '&#xe603;', '&#xe604;', '&#xe605;', '&#xe606;', '&#xe607;', '&#xe608;', '&#xe609;', '&#xe60a;', '&#xe60b;', '&#xe60c;']
  };

  dpwGame.prototype.init = function () {
    var _this = this;
    _this.getIssue();
    if (_this.onInit) {
      _this.onInit();
    }
  };

  dpwGame.prototype.getItemCard = function () {
    var _this = this;
    debugger
  };

  dpwGame.prototype.getAwGroup = function () {

    var _this = this;
    var awText = null;
    var arr = [];
    var html = '';

    for (var i = 1; i < 4; i++) {
      '<button><img src="images/btn-y.png" alt="btn-y"></button>'
      arr.push(_this.issue[_this.itemIndex]['r' + i])
    };

    debugger
  };

  dpwGame.prototype.start = function (type) {

    var _this = this;

    if (_this.issue && _this.status === 0) {

      $('.j-game-rm').addClass('fadeOutLeft');
      $('#j-game-main').addClass('active');
      _this.getItemCard();
      _this.getAwGroup();

    } else {
      return;
    }

  };

  dpwGame.prototype.checkMd5 = function (md5Str, str) {

    var key = '4008-898-310-POKER-IOS';
    var hash = md5(str + key);

    if (hash.toUpperCase() === md5Str) {
      return true;
    } else {
      return false;
    }
  };

  dpwGame.prototype.getIssue = function (args) {

    var _this = this;
    var now = new Date().getTime();
    var data = {
      mod: 'webapp',
      op: 'requestExercise'
    };

    $.ajax({
      url: 'http://poker.yuncai.com/Api/Http/index.php',
      type: 'get',
      dataType: 'text',
      data: data,
      success: function (data) {
        var index = data.indexOf('{');
        var md5Str = data.slice(0, index);
        var objStr = data.slice(index);
        var obj = $.parseJSON(objStr);
        var md5Status = _this.checkMd5(md5Str, objStr);

        if (md5Status) {
          if (obj.retCode === 100000) {
            _this.issue = obj.retData;
          } else {
            alert(obj.retMsg);
          }
        } else {
          alert('Some things error!');
        }

      },
      error: function () {

        var data = {
          "retCode": 100000,
          "retMsg": "",
          "retData": [{
            "c1": ["2", "8"],
            "c2": ["2", "7"],
            "c3": ["4", "8"],
            "c4": ["3", "11"],
            "c5": ["2", "2"],
            "c6": ["4", "6"],
            "c7": ["4", "13"],
            "r1": 8,
            "r2": 9,
            "r3": 5,
            "aw": 9
          }, {
            "c1": ["3", "14"],
            "c2": ["3", "9"],
            "c3": ["2", "11"],
            "c4": ["4", "11"],
            "c5": ["4", "13"],
            "c6": ["4", "10"],
            "c7": ["2", "5"],
            "r1": 5,
            "r2": 6,
            "r3": 9,
            "aw": 9
          }, {
            "c1": ["4", "5"],
            "c2": ["2", "8"],
            "c3": ["3", "10"],
            "c4": ["2", "6"],
            "c5": ["4", "7"],
            "c6": ["1", "4"],
            "c7": ["2", "14"],
            "r1": 10,
            "r2": 4,
            "r3": 6,
            "aw": 6
          }, {
            "c1": ["3", "3"],
            "c2": ["2", "5"],
            "c3": ["4", "11"],
            "c4": ["4", "2"],
            "c5": ["3", "4"],
            "c6": ["3", "14"],
            "c7": ["1", "11"],
            "r1": 6,
            "r2": 9,
            "r3": 8,
            "aw": 6
          }, {
            "c1": ["2", "14"],
            "c2": ["1", "4"],
            "c3": ["4", "10"],
            "c4": ["4", "14"],
            "c5": ["4", "12"],
            "c6": ["4", "13"],
            "c7": ["4", "11"],
            "r1": 6,
            "r2": 10,
            "r3": 1,
            "aw": 1
          }, {
            "c1": ["3", "9"],
            "c2": ["4", "6"],
            "c3": ["4", "9"],
            "c4": ["1", "9"],
            "c5": ["2", "5"],
            "c6": ["4", "10"],
            "c7": ["4", "7"],
            "r1": 3,
            "r2": 7,
            "r3": 1,
            "aw": 7
          }, {
            "c1": ["1", "3"],
            "c2": ["2", "13"],
            "c3": ["3", "14"],
            "c4": ["4", "14"],
            "c5": ["1", "6"],
            "c6": ["4", "8"],
            "c7": ["1", "13"],
            "r1": 5,
            "r2": 4,
            "r3": 8,
            "aw": 8
          }, {
            "c1": ["2", "14"],
            "c2": ["2", "13"],
            "c3": ["1", "3"],
            "c4": ["1", "14"],
            "c5": ["4", "14"],
            "c6": ["4", "8"],
            "c7": ["3", "14"],
            "r1": 2,
            "r2": 3,
            "r3": 5,
            "aw": 3
          }, {
            "c1": ["3", "12"],
            "c2": ["4", "11"],
            "c3": ["3", "7"],
            "c4": ["1", "3"],
            "c5": ["3", "5"],
            "c6": ["2", "12"],
            "c7": ["1", "7"],
            "r1": 8,
            "r2": 4,
            "r3": 10,
            "aw": 8
          }, {
            "c1": ["4", "13"],
            "c2": ["1", "10"],
            "c3": ["2", "3"],
            "c4": ["1", "12"],
            "c5": ["1", "9"],
            "c6": ["1", "13"],
            "c7": ["1", "11"],
            "r1": 9,
            "r2": 8,
            "r3": 2,
            "aw": 2
          }, {
            "c1": ["1", "10"],
            "c2": ["2", "9"],
            "c3": ["3", "9"],
            "c4": ["3", "13"],
            "c5": ["4", "6"],
            "c6": ["1", "13"],
            "c7": ["4", "9"],
            "r1": 7,
            "r2": 4,
            "r3": 9,
            "aw": 4
          }, {
            "c1": ["2", "11"],
            "c2": ["3", "10"],
            "c3": ["4", "13"],
            "c4": ["3", "14"],
            "c5": ["1", "12"],
            "c6": ["2", "9"],
            "c7": ["1", "11"],
            "r1": 7,
            "r2": 6,
            "r3": 5,
            "aw": 6
          }, {
            "c1": ["3", "7"],
            "c2": ["4", "3"],
            "c3": ["4", "11"],
            "c4": ["1", "7"],
            "c5": ["1", "10"],
            "c6": ["4", "7"],
            "c7": ["2", "2"],
            "r1": 5,
            "r2": 1,
            "r3": 7,
            "aw": 7
          }, {
            "c1": ["1", "13"],
            "c2": ["4", "12"],
            "c3": ["1", "10"],
            "c4": ["2", "10"],
            "c5": ["3", "10"],
            "c6": ["3", "3"],
            "c7": ["4", "10"],
            "r1": 9,
            "r2": 3,
            "r3": 4,
            "aw": 3
          }, {
            "c1": ["2", "12"],
            "c2": ["2", "9"],
            "c3": ["2", "13"],
            "c4": ["2", "8"],
            "c5": ["4", "11"],
            "c6": ["2", "2"],
            "c7": ["3", "13"],
            "r1": 6,
            "r2": 5,
            "r3": 2,
            "aw": 5
          }, {
            "c1": ["3", "6"],
            "c2": ["4", "8"],
            "c3": ["4", "7"],
            "c4": ["1", "3"],
            "c5": ["1", "9"],
            "c6": ["4", "4"],
            "c7": ["2", "10"],
            "r1": 3,
            "r2": 6,
            "r3": 7,
            "aw": 6
          }, {
            "c1": ["1", "4"],
            "c2": ["4", "5"],
            "c3": ["4", "10"],
            "c4": ["2", "9"],
            "c5": ["2", "6"],
            "c6": ["2", "2"],
            "c7": ["2", "3"],
            "r1": 4,
            "r2": 6,
            "r3": 5,
            "aw": 6
          }, {
            "c1": ["3", "11"],
            "c2": ["4", "5"],
            "c3": ["1", "11"],
            "c4": ["2", "11"],
            "c5": ["3", "9"],
            "c6": ["4", "3"],
            "c7": ["4", "11"],
            "r1": 3,
            "r2": 6,
            "r3": 10,
            "aw": 3
          }, {
            "c1": ["2", "6"],
            "c2": ["1", "5"],
            "c3": ["1", "3"],
            "c4": ["1", "7"],
            "c5": ["4", "12"],
            "c6": ["1", "6"],
            "c7": ["1", "4"],
            "r1": 5,
            "r2": 2,
            "r3": 10,
            "aw": 2
          }, {
            "c1": ["4", "5"],
            "c2": ["1", "14"],
            "c3": ["3", "7"],
            "c4": ["1", "9"],
            "c5": ["4", "6"],
            "c6": ["1", "8"],
            "c7": ["1", "13"],
            "r1": 6,
            "r2": 10,
            "r3": 2,
            "aw": 6
          }, {
            "c1": ["4", "2"],
            "c2": ["1", "10"],
            "c3": ["2", "3"],
            "c4": ["4", "5"],
            "c5": ["1", "2"],
            "c6": ["2", "9"],
            "c7": ["3", "2"],
            "r1": 7,
            "r2": 4,
            "r3": 8,
            "aw": 7
          }, {
            "c1": ["2", "12"],
            "c2": ["1", "11"],
            "c3": ["2", "3"],
            "c4": ["2", "2"],
            "c5": ["2", "8"],
            "c6": ["1", "10"],
            "c7": ["2", "7"],
            "r1": 5,
            "r2": 10,
            "r3": 1,
            "aw": 5
          }, {
            "c1": ["1", "8"],
            "c2": ["3", "6"],
            "c3": ["1", "11"],
            "c4": ["1", "4"],
            "c5": ["2", "7"],
            "c6": ["3", "8"],
            "c7": ["2", "8"],
            "r1": 7,
            "r2": 5,
            "r3": 1,
            "aw": 7
          }, {
            "c1": ["3", "12"],
            "c2": ["2", "3"],
            "c3": ["2", "12"],
            "c4": ["1", "4"],
            "c5": ["1", "11"],
            "c6": ["1", "8"],
            "c7": ["3", "13"],
            "r1": 10,
            "r2": 1,
            "r3": 9,
            "aw": 9
          }, {
            "c1": ["4", "8"],
            "c2": ["1", "7"],
            "c3": ["2", "13"],
            "c4": ["2", "9"],
            "c5": ["2", "6"],
            "c6": ["3", "7"],
            "c7": ["3", "2"],
            "r1": 3,
            "r2": 2,
            "r3": 9,
            "aw": 9
          }, {
            "c1": ["3", "8"],
            "c2": ["4", "11"],
            "c3": ["1", "13"],
            "c4": ["3", "9"],
            "c5": ["2", "14"],
            "c6": ["2", "3"],
            "c7": ["4", "8"],
            "r1": 9,
            "r2": 8,
            "r3": 4,
            "aw": 9
          }, {
            "c1": ["1", "6"],
            "c2": ["1", "5"],
            "c3": ["2", "8"],
            "c4": ["1", "11"],
            "c5": ["1", "9"],
            "c6": ["1", "10"],
            "c7": ["1", "8"],
            "r1": 8,
            "r2": 5,
            "r3": 6,
            "aw": 5
          }, {
            "c1": ["4", "9"],
            "c2": ["1", "2"],
            "c3": ["1", "6"],
            "c4": ["2", "4"],
            "c5": ["2", "6"],
            "c6": ["4", "7"],
            "c7": ["3", "12"],
            "r1": 5,
            "r2": 9,
            "r3": 1,
            "aw": 9
          }, {
            "c1": ["2", "11"],
            "c2": ["1", "6"],
            "c3": ["4", "11"],
            "c4": ["3", "11"],
            "c5": ["1", "8"],
            "c6": ["1", "11"],
            "c7": ["4", "10"],
            "r1": 3,
            "r2": 8,
            "r3": 7,
            "aw": 3
          }, {
            "c1": ["3", "8"],
            "c2": ["3", "6"],
            "c3": ["4", "2"],
            "c4": ["2", "11"],
            "c5": ["1", "11"],
            "c6": ["2", "6"],
            "c7": ["1", "6"],
            "r1": 5,
            "r2": 4,
            "r3": 10,
            "aw": 4
          }, {
            "c1": ["4", "6"],
            "c2": ["4", "8"],
            "c3": ["3", "3"],
            "c4": ["1", "14"],
            "c5": ["4", "11"],
            "c6": ["1", "3"],
            "c7": ["4", "9"],
            "r1": 5,
            "r2": 6,
            "r3": 9,
            "aw": 9
          }, {
            "c1": ["4", "10"],
            "c2": ["2", "11"],
            "c3": ["2", "8"],
            "c4": ["3", "11"],
            "c5": ["1", "10"],
            "c6": ["4", "11"],
            "c7": ["1", "3"],
            "r1": 4,
            "r2": 6,
            "r3": 2,
            "aw": 4
          }, {
            "c1": ["1", "9"],
            "c2": ["3", "12"],
            "c3": ["2", "10"],
            "c4": ["3", "11"],
            "c5": ["1", "11"],
            "c6": ["4", "14"],
            "c7": ["2", "13"],
            "r1": 6,
            "r2": 10,
            "r3": 5,
            "aw": 6
          }, {
            "c1": ["1", "4"],
            "c2": ["1", "14"],
            "c3": ["2", "5"],
            "c4": ["2", "3"],
            "c5": ["3", "2"],
            "c6": ["3", "4"],
            "c7": ["4", "11"],
            "r1": 7,
            "r2": 6,
            "r3": 4,
            "aw": 6
          }, {
            "c1": ["4", "7"],
            "c2": ["4", "13"],
            "c3": ["4", "11"],
            "c4": ["2", "2"],
            "c5": ["4", "8"],
            "c6": ["1", "3"],
            "c7": ["4", "4"],
            "r1": 2,
            "r2": 5,
            "r3": 9,
            "aw": 5
          }, {
            "c1": ["4", "14"],
            "c2": ["1", "11"],
            "c3": ["1", "13"],
            "c4": ["1", "12"],
            "c5": ["1", "2"],
            "c6": ["1", "5"],
            "c7": ["4", "5"],
            "r1": 5,
            "r2": 9,
            "r3": 10,
            "aw": 5
          }, {
            "c1": ["1", "12"],
            "c2": ["2", "10"],
            "c3": ["1", "11"],
            "c4": ["1", "14"],
            "c5": ["3", "4"],
            "c6": ["1", "13"],
            "c7": ["1", "10"],
            "r1": 1,
            "r2": 5,
            "r3": 4,
            "aw": 1
          }, {
            "c1": ["1", "6"],
            "c2": ["1", "5"],
            "c3": ["4", "7"],
            "c4": ["4", "3"],
            "c5": ["4", "4"],
            "c6": ["2", "11"],
            "c7": ["3", "11"],
            "r1": 6,
            "r2": 9,
            "r3": 5,
            "aw": 6
          }, {
            "c1": ["1", "11"],
            "c2": ["1", "10"],
            "c3": ["1", "12"],
            "c4": ["1", "4"],
            "c5": ["4", "10"],
            "c6": ["1", "14"],
            "c7": ["1", "13"],
            "r1": 3,
            "r2": 10,
            "r3": 1,
            "aw": 1
          }, {
            "c1": ["4", "9"],
            "c2": ["4", "2"],
            "c3": ["4", "5"],
            "c4": ["4", "11"],
            "c5": ["1", "7"],
            "c6": ["2", "9"],
            "c7": ["4", "10"],
            "r1": 5,
            "r2": 10,
            "r3": 2,
            "aw": 5
          }, {
            "c1": ["3", "11"],
            "c2": ["2", "7"],
            "c3": ["2", "2"],
            "c4": ["2", "8"],
            "c5": ["4", "13"],
            "c6": ["3", "12"],
            "c7": ["4", "9"],
            "r1": 2,
            "r2": 8,
            "r3": 10,
            "aw": 10
          }, {
            "c1": ["1", "3"],
            "c2": ["2", "4"],
            "c3": ["1", "7"],
            "c4": ["3", "14"],
            "c5": ["4", "12"],
            "c6": ["1", "2"],
            "c7": ["1", "13"],
            "r1": 9,
            "r2": 10,
            "r3": 1,
            "aw": 10
          }, {
            "c1": ["4", "13"],
            "c2": ["1", "5"],
            "c3": ["4", "9"],
            "c4": ["1", "14"],
            "c5": ["1", "3"],
            "c6": ["1", "4"],
            "c7": ["1", "2"],
            "r1": 1,
            "r2": 2,
            "r3": 5,
            "aw": 2
          }, {
            "c1": ["3", "12"],
            "c2": ["4", "6"],
            "c3": ["3", "10"],
            "c4": ["4", "5"],
            "c5": ["2", "5"],
            "c6": ["2", "4"],
            "c7": ["3", "4"],
            "r1": 8,
            "r2": 1,
            "r3": 5,
            "aw": 8
          }, {
            "c1": ["4", "7"],
            "c2": ["2", "8"],
            "c3": ["1", "11"],
            "c4": ["3", "10"],
            "c5": ["3", "14"],
            "c6": ["2", "9"],
            "c7": ["4", "10"],
            "r1": 8,
            "r2": 5,
            "r3": 6,
            "aw": 6
          }, {
            "c1": ["3", "13"],
            "c2": ["3", "2"],
            "c3": ["1", "3"],
            "c4": ["1", "10"],
            "c5": ["4", "14"],
            "c6": ["3", "8"],
            "c7": ["3", "11"],
            "r1": 6,
            "r2": 1,
            "r3": 10,
            "aw": 10
          }, {
            "c1": ["2", "13"],
            "c2": ["2", "2"],
            "c3": ["2", "5"],
            "c4": ["2", "14"],
            "c5": ["1", "7"],
            "c6": ["3", "12"],
            "c7": ["2", "3"],
            "r1": 5,
            "r2": 8,
            "r3": 3,
            "aw": 5
          }, {
            "c1": ["2", "6"],
            "c2": ["1", "2"],
            "c3": ["3", "3"],
            "c4": ["1", "10"],
            "c5": ["1", "8"],
            "c6": ["2", "11"],
            "c7": ["3", "10"],
            "r1": 1,
            "r2": 9,
            "r3": 2,
            "aw": 9
          }, {
            "c1": ["1", "3"],
            "c2": ["3", "12"],
            "c3": ["2", "12"],
            "c4": ["2", "14"],
            "c5": ["3", "3"],
            "c6": ["3", "14"],
            "c7": ["2", "13"],
            "r1": 6,
            "r2": 7,
            "r3": 8,
            "aw": 8
          }, {
            "c1": ["1", "9"],
            "c2": ["1", "2"],
            "c3": ["1", "10"],
            "c4": ["3", "12"],
            "c5": ["2", "7"],
            "c6": ["4", "6"],
            "c7": ["1", "5"],
            "r1": 7,
            "r2": 10,
            "r3": 8,
            "aw": 10
          }]
        };

        _this.issue = data.retData;

      }
    });

  };

  return dpwGame;
}());