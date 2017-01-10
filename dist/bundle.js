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

	var _Ball = __webpack_require__(7);

	var _Ball2 = _interopRequireDefault(_Ball);

	var _Scene = __webpack_require__(6);

	var _Scene2 = _interopRequireDefault(_Scene);

	var _Canvas = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var game = new _Game2.default('engine', new _Scene2.default());
	var ball = new _Ball2.default(100, 100);

	game.run();
	game.background = 'black';
	game.addListener('mousemove', function () {
	  console.log("handler");
	});

	game.addUpdate(function () {
	  ball.update();
	});

	game.addDraw(function () {
	  _Canvas.Canvas.drawRect(0, 0, _Canvas.Canvas.width, _Canvas.Canvas.height, game.background);
	});

	game.addDraw(function () {
	  ball.render();
	});

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
	      for (var i = 0; i < this.currentScene.drawQueue.size(); i++) {
	        var cb = this.currentScene.drawQueue.remove();
	        cb();
	        this.currentScene.drawQueue.add(cb);
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
	    value: function drawText(text, x, y, color) {
	      var ctx = this.getContext();
	      ctx.fillStyle = color;
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
/* 4 */,
/* 5 */
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Queue = __webpack_require__(3);

	var _Queue2 = _interopRequireDefault(_Queue);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Scene = function () {
	  function Scene() {
	    _classCallCheck(this, Scene);

	    this.drawQueue = new _Queue2.default();
	    this.updateQueue = new _Queue2.default();
	    this.eventEmitter;
	    this.gameObjects = [];
	  }

	  _createClass(Scene, [{
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
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Canvas = __webpack_require__(2);

	var _GameObject2 = __webpack_require__(5);

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
	  }]);

	  return Ball;
	}(_GameObject3.default);

	exports.default = Ball;

/***/ }
/******/ ]);