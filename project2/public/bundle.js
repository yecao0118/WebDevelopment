/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ ((module) => {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var SERVER = {
  AUTH_MISSING: 'auth-missing',
  AUTH_INSUFFICIENT: 'auth-insufficient',
  REQUIRED_USERNAME: 'required-username',
  REQUIRED_MESSAGE: 'required-message',
  MESSAGE_NOT_FOUND: 'message-not-found'
};
var CLIENT = {
  NETWORK_ERROR: 'networkError',
  NO_SESSION: 'noSession'
};
var MESSAGES = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, CLIENT.NETWORK_ERROR, 'Trouble connecting to the network. Please try again.'), SERVER.AUTH_INSUFFICIENT, 'Your username is not permitted. Please try a different username.'), SERVER.REQUIRED_USERNAME, 'Please enter a valid username (letters and/or numbers only).'), SERVER.REQUIRED_MESSAGE, 'Message content cannot be empty.'), "default", 'Something went wrong. Please try again.');
module.exports = {
  SERVER: SERVER,
  CLIENT: CLIENT,
  MESSAGES: MESSAGES
};

/***/ }),

/***/ "./src/listeners.js":
/*!**************************!*\
  !*** ./src/listeners.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addAbilityToDeleteMessage: () => (/* binding */ addAbilityToDeleteMessage),
/* harmony export */   addAbilityToLogin: () => (/* binding */ addAbilityToLogin),
/* harmony export */   addAbilityToLogout: () => (/* binding */ addAbilityToLogout),
/* harmony export */   addAbilityToSendMessage: () => (/* binding */ addAbilityToSendMessage),
/* harmony export */   startPolling: () => (/* binding */ startPolling)
/* harmony export */ });
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./render */ "./src/render.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }



var pollingInterval;
function addAbilityToLogin(_ref) {
  var state = _ref.state,
    appEl = _ref.appEl;
  appEl.addEventListener('submit', function (e) {
    if (!e.target.classList.contains('login__form')) return;
    e.preventDefault();
    var usernameInput = appEl.querySelector('.login__username');
    if (!usernameInput) {
      console.error('Login input element not found');
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)('Login input not found');
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
      return;
    }
    var username = usernameInput.value.trim();
    if (!username) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)('Username is required');
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
      return;
    }
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.startLoginPending)();
    (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
      state: state,
      appEl: appEl
    });
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogin)(username).then(function () {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.login)(username);
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.clearError)();
      return Promise.all([(0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchMessages)(), (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchUsers)(), (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchAllUsers)()]);
    }).then(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 3),
        messages = _ref3[0],
        users = _ref3[1],
        allUsers = _ref3[2];
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setMessages)(messages);
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setUsers)(users);
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setAllUsers)(allUsers);
      startPolling({
        state: state,
        appEl: appEl
      });
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
    })["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)(err.error);
      state.isLoginPending = false;
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
    });
  });
}
function addAbilityToLogout(_ref4) {
  var state = _ref4.state,
    appEl = _ref4.appEl;
  appEl.addEventListener('click', function (e) {
    if (!e.target.classList.contains('controls__logout')) return;
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogout)().then(function () {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.logout)();
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.clearError)();
      stopPolling();
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
    })["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)(err.error);
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
    });
  });
}
function addAbilityToSendMessage(_ref5) {
  var state = _ref5.state,
    appEl = _ref5.appEl;
  appEl.addEventListener('input', function (e) {
    if (e.target.classList.contains('message__input')) {
      state.messageInputValue = e.target.value || '';
    }
  });
  appEl.addEventListener('submit', function (e) {
    if (!e.target.classList.contains('message__form')) return;
    e.preventDefault();
    var message = (state.messageInputValue || '').trim();
    if (!message) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)('Message cannot be empty');
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
      return;
    }
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchAddMessage)(message).then(function () {
      state.messageInputValue = '';
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.clearError)();
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
    })["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)(err.error);
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: state,
        appEl: appEl
      });
    });
  });
}
function addAbilityToDeleteMessage(_ref6) {
  var state = _ref6.state,
    appEl = _ref6.appEl;
  appEl.addEventListener('click', function (e) {
    if (e.target.classList.contains('message__delete')) {
      var messageId = e.target.getAttribute('data-id');
      (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchDeleteMessage)(messageId).then(function (response) {
        if (response.success) {
          state.messages = state.messages.filter(function (msg) {
            return msg.id !== messageId;
          });
          (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
            state: state,
            appEl: appEl
          });
        }
      })["catch"](function (err) {
        (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)(err.error);
        (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
          state: state,
          appEl: appEl
        });
      });
    }
  });
}
function startPolling(_ref7) {
  var state = _ref7.state,
    appEl = _ref7.appEl;
  if (pollingInterval) {
    clearInterval(pollingInterval);
  }
  pollingInterval = setInterval(function () {
    if (!state.isLoggedIn) {
      stopPolling();
      return;
    }
    Promise.all([(0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchMessages)(), (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchUsers)(), (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchAllUsers)()]).then(function (_ref8) {
      var _ref9 = _slicedToArray(_ref8, 3),
        newMessages = _ref9[0],
        newUsers = _ref9[1],
        newAllUsers = _ref9[2];
      var isMessagesUpdated = JSON.stringify(newMessages) !== JSON.stringify(state.messages);
      var isUsersUpdated = JSON.stringify(newUsers) !== JSON.stringify(state.users);
      var isAllUsersUpdated = JSON.stringify(newAllUsers) !== JSON.stringify(state.allUsers);
      if (isMessagesUpdated) {
        (0,_state__WEBPACK_IMPORTED_MODULE_1__.setMessages)(newMessages);
      }
      if (isUsersUpdated) {
        (0,_state__WEBPACK_IMPORTED_MODULE_1__.setUsers)(newUsers);
      }
      if (isAllUsersUpdated) {
        (0,_state__WEBPACK_IMPORTED_MODULE_1__.setAllUsers)(newAllUsers);
      }
      if (isMessagesUpdated || isUsersUpdated || isAllUsersUpdated) {
        (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
          state: state,
          appEl: appEl
        });
      }
    })["catch"](function (err) {
      if (err.error === 'auth-missing') {
        (0,_state__WEBPACK_IMPORTED_MODULE_1__.logout)();
        (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)('Session expired. Please log in again.');
        stopPolling();
        (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
          state: state,
          appEl: appEl
        });
        return;
      }
      if (!state.error) {
        (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)(err.error);
        (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
          state: state,
          appEl: appEl
        });
      }
    });
  }, 5000);
}
function stopPolling() {
  if (pollingInterval) {
    clearInterval(pollingInterval);
    pollingInterval = null;
  }
}

/***/ }),

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function render(_ref) {
  var state = _ref.state,
    appEl = _ref.appEl;
  var html = "\n    <main>\n      ".concat(generateStatusHtml(state), "\n      ").concat(generateLoginHtml(state), "\n      ").concat(generateChatHtml(state), "\n    </main>\n  ");
  appEl.innerHTML = html;
}
function generateStatusHtml(state) {
  return state.error ? "<div class=\"status error\">".concat(state.error, "</div>") : '';
}
function generateLoginHtml(state) {
  if (state.isLoggedIn) {
    return '';
  }
  if (state.isLoginPending) {
    return "\n      <div class=\"login__waiting\">Loading user...</div>\n    ";
  }
  return "\n    <div class=\"login\">\n      <h2 class=\"login__title\">Login</h2>\n      <form class=\"login__form\" action=\"#login\">\n        <label>\n          <span>Username:</span>\n          <input class=\"login__username\" type=\"text\" value=\"".concat(state.loginInputValue || '', "\">\n        </label>\n        <button class=\"login__button\" type=\"submit\">Login</button>\n      </form>\n    </div>\n  ");
}
function generateChatHtml(state) {
  if (!state.isLoggedIn) return '';
  var messagesHtml = state.messages.map(function (msg) {
    var isUserMessage = msg.username === state.username;
    return "\n      <div class=\"message\">\n        <span class=\"message__username\">".concat(msg.username, ":</span> ").concat(msg.message, "\n        ").concat(isUserMessage ? "<button class=\"message__delete\" data-id=\"".concat(msg.id, "\">Delete</button>") : '', "\n      </div>\n    ");
  }).join('');
  return "\n    <div class=\"chat\">\n      ".concat(generateAllUserListHtml(state), "\n      ").concat(generateUserListHtml(state), "\n      <div class=\"messages\">\n        <div class=\"message__title\">This is the group for Info6150. Let's chat!</div>\n        <div class=\"messages__content\">").concat(messagesHtml, "</div>\n      </div>\n      ").concat(generateAddMessageHtml(state), "\n      ").concat(generateControlsHtml(state), "\n    </div>\n  ");
}
function generateUserListHtml(state) {
  if (!state.users || state.users.length === 0) {
    return '<div class="user-list">No users online</div>';
  }
  var usersHtml = state.users.map(function (user) {
    return "\n    <span class=\"user__name\">".concat(user, "</span>\n  ");
  }).join(', ');
  return "\n    <div class=\"user-list\">\n      <span>Hi, ".concat(state.username, "</span>\n    </div>\n  ");
}
function generateAllUserListHtml(state) {
  if (!state.allUsers || state.allUsers.length === 0) {
    return '<div class="all-user-list">No users have logged in yet</div>';
  }
  var onlineUsers = new Set(state.users);
  var allUsersHtml = state.allUsers.map(function (user) {
    var isOnline = onlineUsers.has(user);
    return "\n      <div class=\"all-user\">\n        <span class=\"all-user__name\">".concat(user, " ").concat(isOnline ? '(online)' : '(offline)', "</span>\n      </div>\n    ");
  }).join('');
  return "\n    <div class=\"all-user-list\">\n      <h3>All Users</h3>\n      ".concat(allUsersHtml, "\n    </div>\n  ");
}
function generateControlsHtml(state) {
  return "\n    <div class=\"controls\">\n      <button class=\"controls__logout\">Logout</button>\n    </div>\n  ";
}
function generateAddMessageHtml(state) {
  return "\n    <form class=\"message__form\" action=\"#send\">\n      <label for=\"message__input\">\n        <input id=\"message__input\" class=\"message__input\" type=\"text\" placeholder=\"Type a message...\" value=\"".concat(state.messageInputValue || '', "\">\n      </label>\n      <button type=\"submit\" class=\"message__button\">Send</button>\n    </form>\n  ");
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (render);

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchAddMessage: () => (/* binding */ fetchAddMessage),
/* harmony export */   fetchAllUsers: () => (/* binding */ fetchAllUsers),
/* harmony export */   fetchDeleteMessage: () => (/* binding */ fetchDeleteMessage),
/* harmony export */   fetchLogin: () => (/* binding */ fetchLogin),
/* harmony export */   fetchLogout: () => (/* binding */ fetchLogout),
/* harmony export */   fetchMessages: () => (/* binding */ fetchMessages),
/* harmony export */   fetchSession: () => (/* binding */ fetchSession),
/* harmony export */   fetchUsers: () => (/* binding */ fetchUsers)
/* harmony export */ });
function fetchLogin(username) {
  return fetch('/api/session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username
    })
  }).then(handleResponse);
}
function fetchLogout() {
  return fetch('/api/session', {
    method: 'DELETE'
  }).then(handleResponse);
}
function fetchMessages() {
  return fetch('/api/messages').then(handleResponse);
}
function fetchAddMessage(message) {
  return fetch('/api/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: message
    })
  }).then(handleResponse);
}
function fetchSession() {
  return fetch('/api/session').then(handleResponse)["catch"](function (err) {
    if (err.error === 'auth-missing') {
      return Promise.reject({
        error: 'auth-missing'
      });
    }
    return Promise.reject(err);
  });
}
function fetchUsers() {
  return fetch('/api/users').then(handleResponse)["catch"](function (err) {
    var error = err.error || 'Failed to fetch users';
    return Promise.reject({
      error: error
    });
  });
}
function fetchAllUsers() {
  return fetch('/api/allusers').then(handleResponse)["catch"](function (err) {
    var error = err.error || 'Failed to fetch all users';
    return Promise.reject({
      error: error
    });
  });
}
function fetchDeleteMessage(id) {
  return fetch("/api/messages/".concat(id), {
    method: 'DELETE'
  }).then(handleResponse);
}
function handleResponse(response) {
  if (response.ok) {
    return response.json();
  }
  return response.json().then(function (err) {
    var error = err.error || 'Something went wrong';
    return Promise.reject({
      error: error
    });
  });
}

/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearError: () => (/* binding */ clearError),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   login: () => (/* binding */ login),
/* harmony export */   logout: () => (/* binding */ logout),
/* harmony export */   setAllUsers: () => (/* binding */ setAllUsers),
/* harmony export */   setError: () => (/* binding */ setError),
/* harmony export */   setMessages: () => (/* binding */ setMessages),
/* harmony export */   setSession: () => (/* binding */ setSession),
/* harmony export */   setUsers: () => (/* binding */ setUsers),
/* harmony export */   startChatPending: () => (/* binding */ startChatPending),
/* harmony export */   startLoginPending: () => (/* binding */ startLoginPending)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_constants__WEBPACK_IMPORTED_MODULE_0__);
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }

var state = {
  messages: [],
  users: [],
  allUsers: [],
  isLoggedIn: false,
  isLoginPending: false,
  isChatPending: false,
  error: '',
  username: ''
};
function login(username) {
  state.isLoggedIn = true;
  state.isLoginPending = false;
  state.username = username;
  state.error = '';
}
function logout() {
  state.isLoggedIn = false;
  state.isLoginPending = false;
  state.username = '';
  state.messages = [];
  state.users = [];
  state.error = '';
}
function setMessages(newMessages) {
  state.messages = newMessages;
  state.isChatPending = false;
  state.error = '';
}
function setUsers(newUsers) {
  var activeUsers = new Set(newUsers);
  state.users = state.users.filter(function (user) {
    return activeUsers.has(user);
  });
  state.users = _toConsumableArray(newUsers);
}
function setAllUsers(newAllUsers) {
  state.allUsers = newAllUsers;
}
function setError(error) {
  state.error = _constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGES[error] || _constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGES["default"];
  state.isChatPending = false;
  state.isLoginPending = false;
}
function startLoginPending() {
  state.isLoginPending = true;
  state.error = '';
}
function startChatPending() {
  state.isChatPending = true;
  state.error = '';
}
function clearError() {
  state.error = '';
}
function setSession(username) {
  state.isLoggedIn = true;
  state.username = username;
  state.isLoginPending = false;
  state.error = '';
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (state);

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!*********************!*\
  !*** ./src/chat.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./render */ "./src/render.js");
/* harmony import */ var _listeners__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./listeners */ "./src/listeners.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }




var appEl = document.querySelector('#app');
(0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
  state: _state__WEBPACK_IMPORTED_MODULE_0__["default"],
  appEl: appEl
});
(0,_listeners__WEBPACK_IMPORTED_MODULE_3__.addAbilityToLogin)({
  state: _state__WEBPACK_IMPORTED_MODULE_0__["default"],
  appEl: appEl
});
(0,_listeners__WEBPACK_IMPORTED_MODULE_3__.addAbilityToLogout)({
  state: _state__WEBPACK_IMPORTED_MODULE_0__["default"],
  appEl: appEl
});
(0,_listeners__WEBPACK_IMPORTED_MODULE_3__.addAbilityToSendMessage)({
  state: _state__WEBPACK_IMPORTED_MODULE_0__["default"],
  appEl: appEl
});
(0,_listeners__WEBPACK_IMPORTED_MODULE_3__.startPolling)({
  state: _state__WEBPACK_IMPORTED_MODULE_0__["default"],
  appEl: appEl
});
(0,_listeners__WEBPACK_IMPORTED_MODULE_3__.addAbilityToDeleteMessage)({
  state: _state__WEBPACK_IMPORTED_MODULE_0__["default"],
  appEl: appEl
});
checkForSession();
function checkForSession() {
  (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchSession)().then(function (session) {
    (0,_state__WEBPACK_IMPORTED_MODULE_0__.login)(session.username);
    (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
      state: _state__WEBPACK_IMPORTED_MODULE_0__["default"],
      appEl: appEl
    });
    return Promise.all([(0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchMessages)(), (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchUsers)(), (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchAllUsers)()]);
  })["catch"](function (err) {
    if ((err === null || err === void 0 ? void 0 : err.error) === 'auth-missing') {
      return Promise.reject({
        error: 'noSession'
      });
    }
    return Promise.reject(err);
  }).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 3),
      messages = _ref2[0],
      users = _ref2[1],
      allUsers = _ref2[2];
    (0,_state__WEBPACK_IMPORTED_MODULE_0__.setMessages)(messages);
    (0,_state__WEBPACK_IMPORTED_MODULE_0__.setUsers)(users);
    (0,_state__WEBPACK_IMPORTED_MODULE_0__.setAllUsers)(allUsers);
    (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
      state: _state__WEBPACK_IMPORTED_MODULE_0__["default"],
      appEl: appEl
    });
  })["catch"](function (err) {
    if ((err === null || err === void 0 ? void 0 : err.error) === 'noSession') {
      (0,_state__WEBPACK_IMPORTED_MODULE_0__.logout)();
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: _state__WEBPACK_IMPORTED_MODULE_0__["default"],
        appEl: appEl
      });
      return;
    }
    (0,_state__WEBPACK_IMPORTED_MODULE_0__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR');
    (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
      state: _state__WEBPACK_IMPORTED_MODULE_0__["default"],
      appEl: appEl
    });
  });
}
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map