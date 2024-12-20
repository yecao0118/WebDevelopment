/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MESSAGES: () => (/* binding */ MESSAGES),
/* harmony export */   PAGES: () => (/* binding */ PAGES)
/* harmony export */ });
var MESSAGES = {
  'auth-insufficient': "Incorrect username. Please try again.",
  'required-username': "Username is required and must be alphanumeric.",
  'network-error': "Network issue. Please try again later.",
  'auth-missing': "You are not logged in.",
  "default": "An unknown error occurred. Please try again."
};
var PAGES = {
  LOGIN: 'LOGIN',
  WORD: 'WORD'
};

/***/ }),

/***/ "./src/model.js":
/*!**********************!*\
  !*** ./src/model.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkSession: () => (/* binding */ checkSession),
/* harmony export */   loadWord: () => (/* binding */ loadWord),
/* harmony export */   login: () => (/* binding */ login),
/* harmony export */   logout: () => (/* binding */ logout),
/* harmony export */   updateStoredWord: () => (/* binding */ updateStoredWord)
/* harmony export */ });
/* harmony import */ var _services_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services.js */ "./src/services.js");
/* harmony import */ var _state_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state.js */ "./src/state.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants.js */ "./src/constants.js");
// model.js




// 登录操作
function login(username) {
  return (0,_services_js__WEBPACK_IMPORTED_MODULE_0__.fetchLogin)(username).then(function (_ref) {
    var username = _ref.username;
    _state_js__WEBPACK_IMPORTED_MODULE_1__.state.username = username;
    _state_js__WEBPACK_IMPORTED_MODULE_1__.state.page = _constants_js__WEBPACK_IMPORTED_MODULE_2__.PAGES.WORD;
    _state_js__WEBPACK_IMPORTED_MODULE_1__.state.error = '';
    return loadWord();
  })["catch"](function (error) {
    _state_js__WEBPACK_IMPORTED_MODULE_1__.state.error = error.error;
    throw error;
  });
}

// 检查会话状态
function checkSession() {
  return (0,_services_js__WEBPACK_IMPORTED_MODULE_0__.fetchSession)().then(function (_ref2) {
    var username = _ref2.username;
    _state_js__WEBPACK_IMPORTED_MODULE_1__.state.username = username;
    _state_js__WEBPACK_IMPORTED_MODULE_1__.state.page = _constants_js__WEBPACK_IMPORTED_MODULE_2__.PAGES.WORD;
    return loadWord();
  })["catch"](function () {
    _state_js__WEBPACK_IMPORTED_MODULE_1__.state.page = _constants_js__WEBPACK_IMPORTED_MODULE_2__.PAGES.LOGIN;
  });
}

// 登出操作
function logout() {
  return (0,_services_js__WEBPACK_IMPORTED_MODULE_0__.fetchLogout)().then(function () {
    _state_js__WEBPACK_IMPORTED_MODULE_1__.state.username = '';
    _state_js__WEBPACK_IMPORTED_MODULE_1__.state.storedWord = '';
    _state_js__WEBPACK_IMPORTED_MODULE_1__.state.error = '';
    _state_js__WEBPACK_IMPORTED_MODULE_1__.state.page = _constants_js__WEBPACK_IMPORTED_MODULE_2__.PAGES.LOGIN;
  })["catch"](function (error) {
    _state_js__WEBPACK_IMPORTED_MODULE_1__.state.error = error.error;
    throw error;
  });
}

// 加载存储的单词
function loadWord() {
  return (0,_services_js__WEBPACK_IMPORTED_MODULE_0__.fetchWord)().then(function (_ref3) {
    var storedWord = _ref3.storedWord;
    _state_js__WEBPACK_IMPORTED_MODULE_1__.state.storedWord = storedWord;
  })["catch"](function (error) {
    _state_js__WEBPACK_IMPORTED_MODULE_1__.state.error = error.error;
    throw error;
  });
}

// 更新存储的单词
function updateStoredWord(word) {
  return (0,_services_js__WEBPACK_IMPORTED_MODULE_0__.updateWord)(word).then(function (_ref4) {
    var storedWord = _ref4.storedWord;
    _state_js__WEBPACK_IMPORTED_MODULE_1__.state.storedWord = storedWord;
    _state_js__WEBPACK_IMPORTED_MODULE_1__.state.error = '';
  })["catch"](function (error) {
    _state_js__WEBPACK_IMPORTED_MODULE_1__.state.error = error.error;
    throw error;
  });
}

/***/ }),

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ "./src/constants.js");
/* harmony import */ var _state_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state.js */ "./src/state.js");


function render(appEl) {
  if (_state_js__WEBPACK_IMPORTED_MODULE_1__.state.page === 'LOGIN') {
    renderLogin(appEl);
  } else if (_state_js__WEBPACK_IMPORTED_MODULE_1__.state.page === 'WORD') {
    renderWordView(appEl);
  }
}

// 渲染登录界面
function renderLogin(appEl) {
  var errorMessage = _state_js__WEBPACK_IMPORTED_MODULE_1__.state.error ? _constants_js__WEBPACK_IMPORTED_MODULE_0__.MESSAGES[_state_js__WEBPACK_IMPORTED_MODULE_1__.state.error] || _constants_js__WEBPACK_IMPORTED_MODULE_0__.MESSAGES["default"] : '';
  appEl.innerHTML = "\n    <h2>Login</h2>\n    <div class=\"form-group\">\n      <input type=\"text\" id=\"username-input\" placeholder=\"Enter your username\" required>\n      <div class=\"button-group\">\n      <button class=\"login-button\">Login</button>\n      </div>\n    </div>\n    ".concat(errorMessage ? "<div class=\"error\">".concat(errorMessage, "</div>") : '', "\n  ");
}

// 渲染单词界面
function renderWordView(appEl) {
  var errorMessage = _state_js__WEBPACK_IMPORTED_MODULE_1__.state.error ? _constants_js__WEBPACK_IMPORTED_MODULE_0__.MESSAGES[_state_js__WEBPACK_IMPORTED_MODULE_1__.state.error] || _constants_js__WEBPACK_IMPORTED_MODULE_0__.MESSAGES["default"] : '';
  appEl.innerHTML = "\n    <h2>Welcome, ".concat(_state_js__WEBPACK_IMPORTED_MODULE_1__.state.username, "</h2>\n    <div class=\"stored-word\">\n      <div class=\"stored-word-line\">Your stored word: <strong>").concat(_state_js__WEBPACK_IMPORTED_MODULE_1__.state.storedWord, "</strong></div>\n      <input type=\"text\" id=\"word-input\" class=\"word-input\" placeholder=\"Update your word\" value=\"").concat(_state_js__WEBPACK_IMPORTED_MODULE_1__.state.storedWord, "\">\n      <button class=\"update-word-button\">Update Word</button>\n    </div>\n    <div class=\"button-group\">\n    <button class=\"logout-button\">Logout</button>\n    </div>\n    ").concat(errorMessage ? "<div class=\"error\">".concat(errorMessage, "</div>") : '', "\n  ");
}

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchLogin: () => (/* binding */ fetchLogin),
/* harmony export */   fetchLogout: () => (/* binding */ fetchLogout),
/* harmony export */   fetchSession: () => (/* binding */ fetchSession),
/* harmony export */   fetchWord: () => (/* binding */ fetchWord),
/* harmony export */   updateWord: () => (/* binding */ updateWord)
/* harmony export */ });
// This is a sample file that demonstrates
// how you can write an abstraction around
// a fetch() call
// This exported function returns a promise
// that resolves with data
// or rejects with an error object
//
// The caller of this function can decide
// what to do with the data
// or what to do with the error
//
// You can add to this file and use this function
// or write your own files/functions

function fetchLogin(username) {
  return fetch('/api/session/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json' // set this header when sending JSON in the body of request
    },
    body: JSON.stringify({
      username: username
    })
  })
  // fetch() rejects on network error
  // So we convert that to a formatted error object
  // so our caller can handle all "errors" in a similar way
  ["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      // response.ok checks the status code from the service
      // This service returns JSON on errors,
      // so we use that as the error object and reject
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json(); // happy status code means resolve with data from service
  });
}

// 检查会话请求
function fetchSession() {
  return fetch('/api/session')["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }) // 捕获网络错误
  .then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}

// 登出请求
function fetchLogout() {
  return fetch('/api/session', {
    method: 'DELETE'
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }) // 捕获网络错误
  .then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}

// 获取存储单词请求
function fetchWord() {
  return fetch('/api/word')["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }) // 捕获网络错误
  .then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}

// 更新存储单词请求
function updateWord(word) {
  return fetch('/api/word', {
    method: 'PUT',
    headers: {
      'content-type': 'application/json' // 设置为 JSON 格式
    },
    body: JSON.stringify({
      word: word
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }) // 捕获网络错误
  .then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}

/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   state: () => (/* binding */ state)
/* harmony export */ });
// state.js
var state = {
  username: '',
  storedWord: '',
  error: '',
  page: ''
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _state_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state.js */ "./src/state.js");
/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render.js */ "./src/render.js");
/* harmony import */ var _model_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./model.js */ "./src/model.js");



var appEl = document.querySelector('#app');

// 初始渲染
(0,_model_js__WEBPACK_IMPORTED_MODULE_2__.checkSession)().then(function () {
  (0,_render_js__WEBPACK_IMPORTED_MODULE_1__.render)(appEl);
});

// 事件监听器：处理点击事件
appEl.addEventListener('click', function (e) {
  if (e.target.classList.contains('login-button')) {
    var username = document.querySelector('#username-input').value.trim();
    (0,_model_js__WEBPACK_IMPORTED_MODULE_2__.login)(username).then(function () {
      return (0,_render_js__WEBPACK_IMPORTED_MODULE_1__.render)(appEl);
    })["catch"](function () {
      return (0,_render_js__WEBPACK_IMPORTED_MODULE_1__.render)(appEl);
    });
  }
  if (e.target.classList.contains('logout-button')) {
    (0,_model_js__WEBPACK_IMPORTED_MODULE_2__.logout)().then(function () {
      return (0,_render_js__WEBPACK_IMPORTED_MODULE_1__.render)(appEl);
    })["catch"](function () {
      return (0,_render_js__WEBPACK_IMPORTED_MODULE_1__.render)(appEl);
    });
  }
  if (e.target.classList.contains('update-word-button')) {
    var newWord = document.querySelector('#word-input').value.trim();
    (0,_model_js__WEBPACK_IMPORTED_MODULE_2__.updateStoredWord)(newWord).then(function () {
      return (0,_render_js__WEBPACK_IMPORTED_MODULE_1__.render)(appEl);
    })["catch"](function () {
      return (0,_render_js__WEBPACK_IMPORTED_MODULE_1__.render)(appEl);
    });
  }
});

// 事件监听器：处理输入事件
appEl.addEventListener('input', function (e) {
  if (e.target.classList.contains('word-input')) {
    _state_js__WEBPACK_IMPORTED_MODULE_0__.state.storedWord = e.target.value;
  }
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map