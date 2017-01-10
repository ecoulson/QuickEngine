/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Game = __webpack_require__(1);

	var _Game2 = _interopRequireDefault(_Game);

	var _Ball = __webpack_require__(3);

	var _Ball2 = _interopRequireDefault(_Ball);

	var _Paddle = __webpack_require__(5);

	var _Paddle2 = _interopRequireDefault(_Paddle);

	var _Scene = __webpack_require__(6);

	var _Scene2 = _interopRequireDefault(_Scene);

	var _UIScreen = __webpack_require__(8);

	var _UIScreen2 = _interopRequireDefault(_UIScreen);

	var _UIText = __webpack_require__(9);

	var _UIText2 = _interopRequireDefault(_UIText);

	var _UIButton = __webpack_require__(10);

	var _UIButton2 = _interopRequireDefault(_UIButton);

	var _Canvas = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var game = new _Game2.default('engine', new _Scene2.default());
	var ball = new _Ball2.default(100, 100);
	var paddle = new _Paddle2.default(0, 250, 'paddle_1');
	var paddle2 = new _Paddle2.default(_Canvas.Canvas.width - 10, 250, 'paddle_2');
	var winScreen = new _UIScreen2.default('black');
	var score1 = new _UIText2.default('', {
	  size: 16,
	  font: 'Arial'
	}, 'white', 100, 100);
	var score2 = new _UIText2.default('', {
	  size: 16,
	  font: 'Arial'
	}, 'white', 700, 100);
	score1.text = 0;
	score2.text = 0;

	game.player1Score = 0;
	game.player2Score = 0;
	game.winScore = 7;
	game.hasInit = false;

	game.run();
	game.currentScene.menus.push(winScreen);
	game.background = 'black';

	game.addListener('mousedown', function (e) {
	  if (winScreen.active) {
	    winScreen.active = false;
	    game.player1Score = 0;
	    game.player2Score = 0;
	  }
	});

	game.addListener('mousemove', function (e) {
	  var rect = game.getBoundingRect();
	  var root = document.documentElement;
	  var mouseX = e.clientX - rect.left - root.scrollLeft;
	  var mouseY = e.clientY - rect.top - root.scrollTop;

	  paddle.mouseInput(mouseY);
	});

	game.addUpdate(function () {
	  ball.update();
	  paddle2.aiMove(ball);

	  if (!paddle.checkCollision(ball)) {
	    game.player2Score++;
	  }
	  if (!paddle2.checkCollision(ball)) {
	    game.player1Score++;
	  }
	  score1.text = game.player1Score;
	  score2.text = game.player2Score;
	  if (game.player1Score >= game.winScore || game.player2Score >= game.winScore) {
	    initWin();
	    game.hasInit = true;
	    winScreen.active = true;
	  }
	});

	game.addDraw(function () {
	  _Canvas.Canvas.drawRect(0, 0, _Canvas.Canvas.width, _Canvas.Canvas.height, game.background);
	});

	game.addDraw(function () {
	  ball.render();
	});

	game.addDraw(function () {
	  paddle.render();
	  paddle2.render();
	});

	game.addDraw(function () {
	  score1.render();
	  score2.render();
	});

	function initWin() {
	  if (!game.hasInit) {
	    winScreen.addText(new _UIText2.default("Game Over! " + game.player1Score + "-" + game.player2Score, {
	      size: 16,
	      font: 'Arial'
	    }, 'white', _Canvas.Canvas.width / 2, 100));
	    winScreen.addButton(new _UIButton2.default(_Canvas.Canvas.width / 2, 500, 250, 25, 'Click To Continue', 'black', 'white'));
	  }
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Canvas = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Game = function () {
	  function Game(id, scene) {
	    _classCallCheck(this, Game);

	    this.x = 1;
	    this.currentScene = scene;
	  }

	  _createClass(Game, [{
	    key: 'render',
	    value: function render(dt) {
	      _Canvas.Canvas.clear();
	      if (!this.currentScene.uiActive()) {
	        for (var i = 0; i < this.currentScene.drawQueue.size(); i++) {
	          var cb = this.currentScene.drawQueue.remove();
	          cb();
	          this.currentScene.drawQueue.add(cb);
	        }
	      }
	    }
	  }, {
	    key: 'update',
	    value: function update(dt) {
	      for (var i = 0; i < this.currentScene.updateQueue.size(); i++) {
	        var cb = this.currentScene.updateQueue.remove();
	        cb();
	        this.currentScene.updateQueue.add(cb);
	      }
	    }
	  }, {
	    key: 'run',
	    value: function run() {
	      var last = timestamp();
	      var now = void 0;
	      var dt = 0;
	      var step = 1 / 60;
	      var self = this;
	      var fpsmeter = new FPSMeter({ decimals: 0, graph: true, theme: 'dark', left: '5px' });

	      function timestamp() {
	        return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
	      }

	      function frame() {
	        fpsmeter.tickStart();
	        now = timestamp();
	        dt = dt + Math.min(1, (now - last) / 1000);
	        while (dt > step) {
	          dt = dt - step;
	          self.update(step);
	        }
	        self.render(dt);
	        last = now;
	        requestAnimationFrame(frame);
	        fpsmeter.tick();
	      }

	      requestAnimationFrame(frame);
	    }
	  }, {
	    key: 'stop',
	    value: function stop() {}
	  }, {
	    key: 'addDraw',
	    value: function addDraw(cb) {
	      this.currentScene.drawQueue.add(cb);
	    }
	  }, {
	    key: 'addUpdate',
	    value: function addUpdate(cb) {
	      this.currentScene.updateQueue.add(cb);
	    }
	  }, {
	    key: 'addListener',
	    value: function addListener(listener, handler) {
	      _Canvas.Canvas.getCanvas().addEventListener(listener, handler);
	    }
	  }, {
	    key: 'getBoundingRect',
	    value: function getBoundingRect() {
	      return _Canvas.Canvas.getBoundingRect();
	    }
	  }]);

	  return Game;
	}();

	exports.default = Game;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var CanvasObj = function () {
	  function CanvasObj(id) {
	    _classCallCheck(this, CanvasObj);

	    var cvs = document.getElementById(id);
	    var ctx = cvs.getContext('2d');
	    this.width = cvs.width;
	    this.height = cvs.height;

	    this.getContext = function () {
	      return ctx;
	    };

	    this.getCanvas = function () {
	      return cvs;
	    };
	  }

	  _createClass(CanvasObj, [{
	    key: 'getBoundingRect',
	    value: function getBoundingRect() {
	      return this.getCanvas().getBoundingClientRect();
	    }
	  }, {
	    key: 'clear',
	    value: function clear() {
	      var ctx = this.getContext();
	      ctx.clearRect(0, 0, this.width, this.height);
	    }
	  }, {
	    key: 'drawRect',
	    value: function drawRect(x, y, width, height, color) {
	      var ctx = this.getCanvas().getContext('2d');
	      ctx.beginPath();
	      ctx.fillStyle = color;
	      ctx.fillRect(x, y, width, height);
	      ctx.closePath();
	    }
	  }, {
	    key: 'drawCircle',
	    value: function drawCircle(x, y, radius, color) {
	      var ctx = this.getContext();
	      ctx.fillStyle = color;
	      ctx.beginPath();
	      ctx.arc(x, y, radius, 0, Math.PI * 2, true);
	      ctx.fill();
	      ctx.closePath();
	    }
	  }, {
	    key: 'drawText',
	    value: function drawText(text, x, y, color, style) {
	      var ctx = this.getContext();
	      ctx.fillStyle = color;
	      ctx.font = style.size + 'px ' + style.font;
	      ctx.fillText(text, x, y);
	    }
	  }, {
	    key: 'drawFullImage',
	    value: function drawFullImage(image, x, y) {
	      var ctx = this.getContext();
	      ctx.drawImage(image, x, y);
	    }
	  }]);

	  return CanvasObj;
	}();

	var Canvas = exports.Canvas = new CanvasObj('engine');

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Canvas = __webpack_require__(2);

	var _GameObject2 = __webpack_require__(4);

	var _GameObject3 = _interopRequireDefault(_GameObject2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Ball = function (_GameObject) {
	  _inherits(Ball, _GameObject);

	  function Ball(x, y) {
	    _classCallCheck(this, Ball);

	    var _this = _possibleConstructorReturn(this, (Ball.__proto__ || Object.getPrototypeOf(Ball)).call(this, "pong_ball"));

	    _this.x = x;
	    _this.y = y;
	    _this.vX = 3;
	    _this.vY = 3;
	    return _this;
	  }

	  _createClass(Ball, [{
	    key: "update",
	    value: function update() {
	      this.x += this.vX;
	      this.y += this.vY;
	      if (this.y >= _Canvas.Canvas.height || this.y <= 0) {
	        this.vY = -this.vY;
	      }
	      if (this.x >= _Canvas.Canvas.width || this.x <= 0) {
	        this.vX = -this.vX;
	      }
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      _Canvas.Canvas.drawCircle(this.x, this.y, 10, 'white');
	    }
	  }, {
	    key: "reset",
	    value: function reset() {
	      this.x = _Canvas.Canvas.width / 2;
	      this.y = _Canvas.Canvas.height / 2;
	      this.vY = 0;
	    }
	  }]);

	  return Ball;
	}(_GameObject3.default);

	exports.default = Ball;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GameObject = function () {
	  function GameObject(name) {
	    _classCallCheck(this, GameObject);

	    this.name = name;
	  }

	  _createClass(GameObject, [{
	    key: "update",
	    value: function update() {}
	  }, {
	    key: "render",
	    value: function render() {}
	  }]);

	  return GameObject;
	}();

	exports.default = GameObject;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Canvas = __webpack_require__(2);

	var _GameObject2 = __webpack_require__(4);

	var _GameObject3 = _interopRequireDefault(_GameObject2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Paddle = function (_GameObject) {
	  _inherits(Paddle, _GameObject);

	  function Paddle(x, y, name) {
	    _classCallCheck(this, Paddle);

	    var _this = _possibleConstructorReturn(this, (Paddle.__proto__ || Object.getPrototypeOf(Paddle)).call(this, name));

	    _this.height = 100;
	    _this.width = 10;
	    _this.x = x;
	    _this.y = y;
	    _this.speed = 2.5;
	    return _this;
	  }

	  _createClass(Paddle, [{
	    key: "render",
	    value: function render() {
	      _Canvas.Canvas.drawRect(this.x, this.y, this.width, this.height, 'white');
	    }
	  }, {
	    key: "mouseInput",
	    value: function mouseInput(y) {
	      this.y = y - this.height / 2;
	    }
	  }, {
	    key: "aiMove",
	    value: function aiMove(gameObj) {
	      var paddleCenterY = this.y + this.height / 2;
	      if (paddleCenterY < gameObj.y - 35) {
	        this.y += this.speed;
	      } else if (paddleCenterY > gameObj.y + 35) {
	        this.y -= this.speed;
	      }
	    }
	  }, {
	    key: "checkCollision",
	    value: function checkCollision(gameObj) {
	      if (this.name.includes('1')) {
	        if (gameObj.x < this.x) {
	          if (gameObj.y > this.y && gameObj.y < this.y + this.height) {
	            gameObj.vX = gameObj.vX;
	            var dY = gameObj.y - (this.y + this.height / 2);
	            gameObj.vY = dY * 0.1111;
	            return true;
	          } else {
	            gameObj.reset();
	            return false;
	          }
	        } else {
	          return true;
	        }
	      } else {
	        if (gameObj.x > this.x) {
	          if (gameObj.y > this.y && gameObj.y < this.y + this.height) {
	            gameObj.vX = gameObj.vX;
	            var _dY = gameObj.y - (this.y + this.height / 2);
	            gameObj.vY = _dY * 0.1111;
	            return true;
	          } else {
	            gameObj.reset();
	            return false;
	          }
	        } else {
	          return true;
	        }
	      }
	    }
	  }, {
	    key: "update",
	    value: function update() {}
	  }]);

	  return Paddle;
	}(_GameObject3.default);

	exports.default = Paddle;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Queue = __webpack_require__(7);

	var _Queue2 = _interopRequireDefault(_Queue);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Scene = function () {
	  function Scene() {
	    _classCallCheck(this, Scene);

	    this.drawQueue = new _Queue2.default();
	    this.updateQueue = new _Queue2.default();
	    this.gameObjects = [];
	    this.menus = [];
	  }

	  _createClass(Scene, [{
	    key: "uiActive",
	    value: function uiActive() {
	      for (var i = 0; i < this.menus.length; i++) {
	        if (this.menus[i].active) {
	          this.menus[i].render();
	          return true;
	        }
	      }
	      return false;
	    }
	  }, {
	    key: "addGameObject",
	    value: function addGameObject(gameObj) {
	      this.gameObjects.push(gameObj);
	    }
	  }]);

	  return Scene;
	}();

	exports.default = Scene;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var a = [];
	var _size = 0;

	var Stack = function () {
	  function Stack() {
	    _classCallCheck(this, Stack);
	  }

	  _createClass(Stack, [{
	    key: "add",
	    value: function add(ele) {
	      a.push(ele);
	      _size++;
	    }
	  }, {
	    key: "remove",
	    value: function remove() {
	      var cb = a[0];
	      a.splice(0, 1);
	      _size--;
	      return cb;
	    }
	  }, {
	    key: "size",
	    value: function size() {
	      return _size;
	    }
	  }]);

	  return Stack;
	}();

	exports.default = Stack;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Canvas = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var UIScreen = function () {
	  function UIScreen(bg) {
	    _classCallCheck(this, UIScreen);

	    this.background = bg;
	    this.buttons = [];
	    this.text = [];
	    this.active = false;
	  }

	  _createClass(UIScreen, [{
	    key: "displayScreen",
	    value: function displayScreen() {
	      this.active = true;
	    }
	  }, {
	    key: "hideScreen",
	    value: function hideScreen() {
	      this.active = false;
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      if (this.active) {
	        _Canvas.Canvas.drawRect(0, 0, _Canvas.Canvas.width, _Canvas.Canvas.height, this.background);
	        for (var i in this.buttons) {
	          this.buttons[i].render();
	        }
	        for (var _i in this.text) {
	          this.text[_i].render();
	        }
	      }
	    }
	  }, {
	    key: "addButton",
	    value: function addButton(button) {
	      this.buttons.push(button);
	    }
	  }, {
	    key: "addText",
	    value: function addText(text) {
	      this.text.push(text);
	    }
	  }]);

	  return UIScreen;
	}();

	exports.default = UIScreen;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Canvas = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var UIText = function () {
	  function UIText(text, styleOpt, color, x, y) {
	    _classCallCheck(this, UIText);

	    this.text = text;
	    this.x = x;
	    this.y = y;
	    this.style = styleOpt;
	    this.color = color;
	  }

	  _createClass(UIText, [{
	    key: "render",
	    value: function render() {
	      _Canvas.Canvas.drawText(this.text, this.x, this.y, this.color, this.style);
	    }
	  }]);

	  return UIText;
	}();

	exports.default = UIText;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Canvas = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var UIButton = function () {
	  function UIButton(x, y, width, height, text, bgColor, txtColor) {
	    _classCallCheck(this, UIButton);

	    this.x = x;
	    this.y = y;
	    this.width = width;
	    this.height = height;
	    this.text = text;
	    this.bgColor = bgColor;
	    this.txtColor = txtColor;
	  }

	  _createClass(UIButton, [{
	    key: "render",
	    value: function render() {
	      _Canvas.Canvas.drawRect(this.x, this.y, this.width, this.height, this.bgColor);
	      _Canvas.Canvas.drawText(this.text, this.x + 5, this.y + 5, this.txtColor, {
	        font: 'Arial',
	        size: 16
	      });
	    }
	  }]);

	  return UIButton;
	}();

	exports.default = UIButton;

/***/ }
/******/ ]);