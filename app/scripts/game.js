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
   * status  游戏状态 0-未开始 1-进行中 2-结束 4-暂停
   * issue  问题数据
   * version 版本号
   * onInit  初始化回调
   * gameType  游戏类型
   * dtzId  本次挑战的唯一id
   * startTime  服务端返回的开始时戳
   * endTime  服务器端结束时间戳
   * itemIndex  题目索引
   * awGroup  答案标题
   * colorGroup  花色对应字体图标
   * cardGroup  扑克对应字体图标
   * errorCount  答错的题目
   * trueCount  答对的题目
   * key  md5密钥
   * onGameOver  游戏结束回调
   * url  api接口
   * errorTimtOut  答错题目时间限制
   * missTime  服务器与前端时间误差
   * limitItem  限题数目
   * errorLimitSeconds  限时答错减少时间
   * errorXianTiSeconds  限题答错增加时间
   *
   */
  dpwGame.prototype = {
    'name': '\u5FB7\u6251\u738B\u724C\u578B\u5927\u6311\u6218',
    'status': 0,
    'issue': [],
    'version': '0.0.1',
    'onInit': null,
    'gameType': null,
    'dtzId': null,
    'startTime': null,
    'endTime': null,
    'itemIndex': 0,
    'awGroup': ['', '皇家同花顺', '同花顺', '金刚', '葫芦', '同花', '顺子', '三条', '两对', '一对', '高牌'],
    'colorGroup': ['', '&#xe60e;', '&#xe60d;', '&#xe610;', '&#xe60f;'],
    'cardGroup': ['', '', '&#xe600;', '&#xe601;', '&#xe602;', '&#xe603;', '&#xe604;', '&#xe605;', '&#xe606;', '&#xe607;', '&#xe608;', '&#xe609;', '&#xe60b;', '&#xe60a;', '&#xe60c;'],
    'errorCount': 0,
    'trueCount': 0,
    'key': '4008-898-310-POKER-IOS',
    'onGameOver': null,
    'url': 'http://poker.yuncai.com/Api/Http/index.php',
    'errorTimtOut': 50,
    'missTime': 0,
    'limitItem': 50,
    'fps': 1000 / 60,
    'onRestart': null,
    'errorLimitSeconds': 2,
  };

  //游戏初始化
  dpwGame.prototype.init = function (args) {
    if (args) {
      for (var p in args) {
        this[p] = args[p];
      }
    }

    var _this = this;
    _this.getIssue();
    if (_this.onInit) {
      _this.onInit();
    }
  };

  dpwGame.prototype.reset = function () {

    var _this = this;
    _this.status = 0;
    _this.trueCount = 0;
    _this.errorCount = 0;
    _this.itemIndex = 0;
    _this.issue = [];
    _this.dtzId = null;
    _this.startTime = null;
    _this.endTime = null;

    $('#j-left-g').html('<i class="iconfont">&#xe613;</i>');
    $('#j-left-r').html('<i class="iconfont">&#xe613;</i>');
    $('#j-limit').html('<i class="iconfont">&#xe604;</i><i class="iconfont">&#xe613;</i><i class="iconfont small">&#xe604;</i><i class="iconfont small">&#xe613;</i>');
    $('#j-ti').html('<i class="iconfont">&#xe613;</i><i class="iconfont">&#xe613;</i><span>:</span><i class="iconfont">&#xe613;</i><i class="iconfont">&#xe613;</i><div class="ml"><i class="iconfont small">&#xe613;</i><i class="iconfont small">&#xe613;</i>');

    _this.getIssue();

  };

  dpwGame.prototype.restart = function () {

    var _this = this;
    _this.status = 0;
    _this.trueCount = 0;
    _this.errorCount = 0;
    _this.itemIndex = 0;
    _this.issue = [];
    _this.dtzId = null;
    _this.startTime = null;
    _this.endTime = null;

    $('#j-left-g').html('<i class="iconfont">&#xe613;</i>');
    $('#j-left-r').html('<i class="iconfont">&#xe613;</i>');
    $('#j-limit').html('<i class="iconfont">&#xe604;</i><i class="iconfont">&#xe613;</i><i class="iconfont small">&#xe604;</i><i class="iconfont small">&#xe613;</i>');
    $('#j-ti').html('<i class="iconfont">&#xe613;</i><i class="iconfont">&#xe613;</i><span>:</span><i class="iconfont">&#xe613;</i><i class="iconfont">&#xe613;</i><div class="ml"><i class="iconfont small">&#xe613;</i><i class="iconfont small">&#xe613;</i>');

    if (_this.onRestart) {
      _this.onRestart();
    }

    _this.getIssue(function () {
      _this.start(_this.gameType)
    });

  };

  // 游戏结束
  dpwGame.prototype.gameOver = function () {

    var _this = this;
    var now = Number((new Date().getTime() / 1000).toFixed(0)) + Number(_this.missTime);

    _this.endTime = now;

    var uTime = ((new Date().getTime() - _this.clientStartTime) / 1000).toFixed(0);

    // lock game status
    _this.status = 2;

    if (_this.gameType == 2) {
      clearInterval(_this.tiIntervel);
    }

    if (_this.gameType == 2) {
      now = (Number(now) + (_this.errorCount * _this.errorXianTiSeconds)).toFixed(0);
      uTime = Number(uTime) + (_this.errorCount * _this.errorXianTiSeconds);
    }

    var data = _this.createApiObj({
      mod: 'webapp',
      op: 'achieveScore',
      dtz_id: _this.dtzId,
      end_time: now,
      correct: _this.trueCount,
      fault: _this.errorCount
    });

    $.ajax({
      url: _this.url,
      type: 'get',
      dataType: 'text',
      data: data,
      success: function (data) {

        var obj = _this.parseApiData(data);

        var html = '';

        if (_this.gameType == 2) {

          if(uTime>60){

            var uFen = Math.floor(uTime/60);
            var uSec = uTime%60;

            uTime = uFen+'</span>分'+'<span class="fc-red">'+uSec+'</span>秒';

          }else{
            uTime = uTime+'</span>秒';
          }

          html = '本次游戏您用时<span class="fc-red">' + uTime + ',击败世界<span>' + obj.retData.rank_ratio + '</span>%的人。';

        } else {
          html = '本次游戏您答对<span class="fc-red">' + _this.trueCount + '</span>题,击败世界<span>' + obj.retData.rank_ratio + '</span>%的人。';
        }

        if ((_this.trueCount + _this.errorCount) === 0) {
          html = '你一题都没有做还想拿名次，太天真了';
        }

        if (obj.retCode === 100000 && obj.md5Status) {

          if (_this.gameType == 1) {
            uTime = 60;
          }

          //更新排名 和 时间
          $('#j-rank').html(html);
          _this.status = 2;

          if (_this.onGameOver) {
            _this.onGameOver();
          }

        } else {
          alert(obj.retMsg);
        }
      }
    });

  };

  //获取一条问题
  dpwGame.prototype.getOneQuestion = function () {

    var _this = this;

    if (_this.gameType == 2 && _this.itemIndex == _this.limitItem) {
      _this.gameOver();
      return;
    }

    if (_this.status === 1 || _this.status === 4) {
      _this.getItemCard();
      _this.getAwGroup();
    } else {
      return;
    }

  };

  //获取游戏是否达到结束状态
  dpwGame.prototype.getGameOverStatus = function () {

    var _this = this;
    var overStatus = false;

    if (_this.status === 2) {
      overStatus = true;
    }

    if (_this.gameType == 2 && _this.itemIndex == _this.limitItem) {
      overStatus = true;
    }

    return overStatus;

  };

  dpwGame.prototype.getNewFontNum = function (num, newClass) {

    var str = [];
    var s = newClass || '';
    var fu = ['&#xe613;', '&#xe612;', '&#xe600;', '&#xe601;', '&#xe602;', '&#xe603;', '&#xe604;', '&#xe605;', '&#xe606;', '&#xe607;'];
    var strArr = num.toString().split('');

    for (var i = 0; i < strArr.length; i++) {
      str.push('<i class="iconfont ' + s + '">' + fu[strArr[i]] + '</i>');
    };

    return str.join('');

  };

  //更新左侧答题数据
  dpwGame.prototype.updateLeftbox = function (type, count) {

    var _this = this;
    var h = _this.getNewFontNum(count);

    if (type) {
      $('#j-left-r').html(h);
    } else {
      $('#j-left-g').html(h);
    }

  };

  //回答问题
  dpwGame.prototype.answerItem = function (aw, btn) {

    var _this = this;
    var nextQuestionSeconds = 80;

    if (_this.status === 4 || _this.status === 2) {
      return;
    }

    var isGameOver = _this.getGameOverStatus();

    if (isGameOver) {
      _this.status = 2;
      return;
    }

    var rightAw = _this.issue[_this.itemIndex].aw;

    //暂停点击事件
    _this.status = 4;

    //更新 题目索引 答对 答错题目
    _this.itemIndex++;

    btn.addClass('active');
    if (aw === rightAw) {

      btn.find('img').attr('src', 'images/btn-g.png');
      _this.trueCount++;

      if (_this.gameType === 2) {
        _this.updateLeftbox(1, _this.trueCount);
        _this.updateLeftbox(0, _this.limitItem - _this.itemIndex);
      } else {
        _this.updateLeftbox(0, _this.trueCount);
      }

    } else {
      btn.find('img').attr('src', 'images/btn-r.png');
      nextQuestionSeconds = _this.errorTimtOut;
      _this.errorCount++;

      if (_this.gameType === 2) {
        _this.updateLeftbox(0, _this.limitItem - _this.itemIndex);
      } else {
        _this.updateLeftbox(1, _this.errorCount);
      }
    }

    //获取更多
    if (_this.itemIndex > (_this.issue.length - 10)) {
      _this.getIssue();
    }

    // 重新 获取新的题目
    setTimeout(function () {
      _this.getOneQuestion();
      _this.status = 1;
    }, nextQuestionSeconds);

  };

  //渲染扑克
  dpwGame.prototype.getItemCard = function () {

    var _this = this;
    var qsArr = null;
    var qs = null;
    var arr = [];
    var arr2 = [];
    var isRed = '';

    for (var i = 1; i < 8; i++) {

      qsArr = _this.issue[_this.itemIndex]['c' + i];

      if (qsArr[0] == 2 || qsArr[0] == 4) {
        isRed = 'card-red'
      } else {
        isRed = '';
      }

      qs = '<span class="card ' + isRed + '"><i class="iconfont">' + _this.cardGroup[qsArr[1]] + '</i><i class="iconfont">' + _this.colorGroup[qsArr[0]] + '</i></span>';

      if (i < 6) {
        arr.push(qs);
      } else {
        arr2.push(qs);
      }

    };

    $('#j-game-card').html(arr.join(''));
    $('#j-game-mycard').html(arr2.join(''));

  };

  //渲染答案
  dpwGame.prototype.getAwGroup = function () {

    var _this = this;
    var awText = null;
    var arr = [];
    var html = '';
    var aw = null;
    var awIndex = null;

    for (var i = 1; i < 4; i++) {
      awIndex = _this.issue[_this.itemIndex]['r' + i];
      aw = _this.awGroup[awIndex];
      arr.push('<button data-aw="' + awIndex + '"><img src="images/btn-y.png" alt="btn-y"><span>' + aw + '</span></button>');
    };
    arr.sort(function () {
      return 0.5 - Math.random()
    });

    $('#j-card-group').html(arr.join(''));

  };

  //创建API
  dpwGame.prototype.createApiObj = function (args) {

    var _this = this;
    var obj = {};
    for (var key in args) {
      if (args.hasOwnProperty(key)) {
        obj[key] = args[key];
      }
    }
    var appKey = _this.getAppKey(_this.url, obj) || 0;
    obj['app_key'] = appKey;

    return obj;
  };

  //游戏限题模式
  dpwGame.prototype.tiTypeGame = function () {

    var _this = this;

    $('#j-ti').addClass('active');
    $('#j-limit').removeClass('active');
    var sTime = new Date().getTime();

    _this.tiIntervel = setInterval(function () {

      var html = '';
      var t = null;
      var t1 = null;
      var t2 = null;
      var t3 = null;
      var now = new Date().getTime();

      t = (Number(now) - Number(sTime)) + (_this.errorCount * _this.errorXianTiSeconds * 1000);

      t1 = Math.floor(t / 1000 / 60);
      t2 = Number((t / 1000 % 60).toFixed(0));
      t3 = (t / 100).toFixed(2).split('.')[1];

      if (t1 < 10) {
        t1 = '0' + t1;
      }

      if (t2 < 10) {
        t2 = '0' + t2;
      }

      html = _this.getNewFontNum(t1) + '<span>:</span>' + _this.getNewFontNum(t2) + '<div class="ml">' + _this.getNewFontNum(t3, 'small') + '</div>'
      $('#j-ti').html(html);

    }, _this.fps);
  };

  /*
   *
   * name  游戏限时模式
   * outTime  限时毫秒数
   * endTime  限时终结时间戳
   * limitEl  时间DOM
   *
   */
  dpwGame.prototype.limitTypeGame = function () {

    var _this = this;
    var outTime = 60000;
    var endTime = new Date().getTime() + outTime;
    var limitEl = $('#j-limit');

    $('#j-ti').removeClass('active');
    limitEl.addClass('active');

    _this.limitTime = setInterval(function () {

      // 当前时间戳
      var now = new Date().getTime();

      // 剩余秒数
      var t = ((endTime - now) / 1000).toFixed(0) - _this.errorCount * _this.errorLimitSeconds;

      var newNum = (Number(((endTime - now) / 1000).toFixed(2)) - (_this.errorCount * _this.errorLimitSeconds)).toFixed(2);

      if (t > 0) {

        var arr = newNum.toString().split('.');

        limitEl.html(_this.getNewFontNum(arr[0]) + ' ' + _this.getNewFontNum(arr[1], 'small'));

      } else {

        clearInterval(_this.limitTime);
        limitEl.html('<i class="iconfont">&#xe604;</i><i class="iconfont">&#xe613;</i> <i class="iconfont small">&#xe604;</i><i class="iconfont small">&#xe613;</i>');
        _this.gameOver();

      }

    }, _this.fps);

  };

  // 游戏开始
  dpwGame.prototype.start = function (type, isReStart) {

    var _this = this;
    var now = Number((new Date().getTime() / 1000).toFixed(0));

    _this.gameType = Number(type);

    // game_type 1-限时模式 2-限题模式
    var data = _this.createApiObj({
      mod: 'webapp',
      op: 'startAnswer',
      game_type: _this.gameType
    });

    $.ajax({
      url: _this.url,
      type: 'get',
      dataType: 'text',
      data: data,
      success: function (data) {
        var obj = _this.parseApiData(data);

        if (obj.retCode === 100000 && obj.md5Status) {

          _this.dtzId = obj.retData['dtz_id'];
          //计算服务器与前端时间误差
          _this.startTime = obj.retData['start_time'];

          if (now > _this.startTime) {
            _this.missTime = -(now - _this.startTime);
          } else {
            _this.missTime = _this.startTime - now;
          }

          // 游戏状态判断
          if (_this.issue && _this.status === 0) {

            //更新游戏状态 获取问题
            _this.status = 1;
            _this.getOneQuestion();

            //更新游戏模式判断变量
            _this.errorLimitSeconds = obj.retData.type1_dec_second || 2;
            _this.errorXianTiSeconds = obj.retData.type2_add_second || 5;
            _this.limitItem = obj.retData.type2_exercise_num || 50;
            _this.clientStartTime = new Date().getTime();

            //渲染ui
            $('.j-game-rm').addClass('fadeOutLeft');
            $('#j-game-main').addClass('active');

            //添加 限时模式时间判断
            if (_this.gameType === 1) {
              $('#j-item-count .left').removeClass('active');
              $('#j-item-count .right').removeClass('active');
              $('#j-title1').html('已答对');
              $('#j-title2').html('答错');
              _this.limitTypeGame();
            }

            if (_this.gameType === 2) {
              $('#j-item-count .left').addClass('active');
              $('#j-item-count .right').addClass('active');
              $('#j-title1').html('剩余');
              $('#j-title2').html('已答对');
              $('#j-left-g').html('<i class="iconfont">&#xe603;</i><i class="iconfont">&#xe613;</i>');
              _this.tiTypeGame();
            }

          } else {

            return;

          }

        } else {
          alert(data.retMsg);
        }
      },
      error: function () {

      }
    })

  };

  //检测md5
  dpwGame.prototype.checkMd5 = function (md5Str, str) {

    var _this = this;
    var hash = md5(str + _this.key);

    if (hash.toUpperCase() === md5Str) {
      return true;
    } else {
      return false;
    }
  };

  // 获取APPkey
  dpwGame.prototype.getAppKey = function (url, data) {
    var _this = this;
    var arr = [];
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        arr.push(key + '=' + data[key]);
      }
    }
    var str = url + '?' + arr.join('&') + _this.key;
    var hash = md5(str).toUpperCase();
    return hash;
  };

  //解析ApiData
  dpwGame.prototype.parseApiData = function (data) {

    var _this = this;

    if (data) {
      var index = data.indexOf('{');
      var md5Str = data.slice(0, index);
      var objStr = data.slice(index);
      var obj = $.parseJSON(objStr);
      var md5Status = _this.checkMd5(md5Str, objStr);

      obj['md5Status'] = md5Status;
      return obj;
    } else {
      return '';
    }

  };

  //获取题目
  dpwGame.prototype.getIssue = function (callBack) {

    var _this = this;

    var data = _this.createApiObj({
      mod: 'webapp',
      op: 'requestExercise'
    });

    $.ajax({
      url: _this.url,
      type: 'get',
      dataType: 'text',
      data: data,
      success: function (data) {

        var obj = _this.parseApiData(data);

        if (obj.retCode === 100000 && obj.md5Status) {

          _this.issue = _this.issue.concat(obj.retData);

          if (callBack) {
            callBack();
          }

        } else {
          alert(obj.retMsg);
        }

      },
      error: function () {

      }
    });

  };

  return dpwGame;
}());