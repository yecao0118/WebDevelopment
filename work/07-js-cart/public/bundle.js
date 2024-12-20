/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   renderCart: () => (/* binding */ renderCart),
/* harmony export */   updateViewCartButton: () => (/* binding */ updateViewCartButton)
/* harmony export */ });
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ "./src/state.js");

function render(state, appEl) {
  renderProducts(state, appEl);
  if (state.showCart) {
    renderCart(state, appEl);
  }
  updateViewCartButton(state);
}
function renderProducts(state, appEl) {
  var productsHtml = state.products.map(function (product) {
    return "\n        <div class=\"product\">\n            <img class=\"img\" src=\"".concat(product.image, "\" alt=\"").concat(product.name, "\">\n            <h3 class=\"product-header\">").concat(product.name, "</h3>\n            <p class=\"product-info\">$").concat(product.price.toFixed(2), "</p>\n            <button data-id=\"").concat(product.id, "\" class=\"add-to-cart\">Add to Cart</button>\n        </div>\n    ");
  }).join('');
  var _getCartItems = (0,_state__WEBPACK_IMPORTED_MODULE_0__.getCartItems)(),
    totalQuantity = _getCartItems.totalQuantity;
  var viewCartButtonText = totalQuantity > 0 ? "View Cart (".concat(totalQuantity, ")") : 'View Cart';
  var viewCartButtonHtml = state.showCart ? '' : "<button id=\"view-cart\">".concat(viewCartButtonText, "</button>");
  var hideCartButtonHtml = state.showCart ? "<button id=\"hide-cart\">Hide Cart</button>" : '';
  var productsSection = "\n        <h2 class=\"products-header\">Products</h2>\n        <div class=\"product-list\">".concat(productsHtml, "</div>\n        ").concat(viewCartButtonHtml, "\n        ").concat(hideCartButtonHtml, "\n    ");
  appEl.innerHTML = productsSection;
}
function renderCart(state, appEl) {
  var _getCartItems2 = (0,_state__WEBPACK_IMPORTED_MODULE_0__.getCartItems)(),
    cartItems = _getCartItems2.cartItems,
    totalQuantity = _getCartItems2.totalQuantity,
    totalPrice = _getCartItems2.totalPrice;
  var cartHtml;
  if (cartItems.length === 0) {
    cartHtml = "<p>Nothing in the cart</p>";
  } else {
    cartHtml = cartItems.map(function (item) {
      return "\n            <div class=\"cart-item\">\n                <img class=\"cart-img\" src=\"".concat(item.image, "\" alt=\"").concat(item.name, "\">\n                <h3>").concat(item.name, "</h3>\n                <p>$").concat(item.price.toFixed(2), "</p>\n                <p>Quantity: <input type=\"number\" min=\"0\" value=\"").concat(item.quantity, "\" data-id=\"").concat(item.id, "\" class=\"cart-quantity\" /></p>\n                <p>Total: $").concat((item.price * item.quantity).toFixed(2), "</p>\n            </div>\n        ");
    }).join('');
    cartHtml += "\n            <div class=\"cart-total\">\n                <h3>Total Price: $".concat(totalPrice, "</h3>\n            </div>\n            <button id=\"checkout\">Checkout</button>");
  }
  var cartSectionHtml = "\n        <div class=\"cart-section\">\n        <h2>Your Cart (".concat(totalQuantity, ")</h2>\n        <div class=\"cart-content\">").concat(cartHtml, "</div>\n        </div>\n    ");
  appEl.innerHTML += cartSectionHtml;
}
function updateViewCartButton(state) {
  var _getCartItems3 = (0,_state__WEBPACK_IMPORTED_MODULE_0__.getCartItems)(),
    totalQuantity = _getCartItems3.totalQuantity;
  var viewCartButton = document.querySelector('#view-cart');
  if (viewCartButton && !state.showCart) {
    viewCartButton.textContent = totalQuantity > 0 ? "View Cart (".concat(totalQuantity, ")") : 'View Cart';
  }
}


/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addToCart: () => (/* binding */ addToCart),
/* harmony export */   clearCart: () => (/* binding */ clearCart),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   getCartItems: () => (/* binding */ getCartItems),
/* harmony export */   getProducts: () => (/* binding */ getProducts),
/* harmony export */   updateCartItemQuantity: () => (/* binding */ updateCartItemQuantity)
/* harmony export */ });
var state = {
  products: [{
    id: 1,
    name: "Jorts",
    price: 0.99,
    image: "http://placehold.co/150x150?text=Jorts"
  }, {
    id: 2,
    name: "Jean",
    price: 3.14,
    image: "http://placehold.co/150x150?text=Jean"
  }, {
    id: 3,
    name: "Nyancat",
    price: 2.73,
    image: "http://placehold.co/150x150?text=Nyancat"
  }],
  cart: [],
  showCart: false
};
var getProducts = function getProducts() {
  return state.products;
};
var addToCart = function addToCart(productId) {
  var cartItem = state.cart.find(function (item) {
    return item.id === productId;
  });
  if (cartItem) {
    cartItem.quantity++;
  } else {
    var product = state.products.find(function (p) {
      return p.id === productId;
    });
    if (product) {
      state.cart.push({
        id: productId,
        quantity: 1
      });
    } else {
      console.error("Product not found");
    }
  }
};
var getCartItems = function getCartItems() {
  var cartItems = state.cart.map(function (cartItem) {
    var product = state.products.find(function (p) {
      return p.id === cartItem.id;
    });
    return {
      id: cartItem.id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: cartItem.quantity,
      total: (product.price * cartItem.quantity).toFixed(2)
    };
  });
  var totalQuantity = cartItems.reduce(function (sum, item) {
    return sum + item.quantity;
  }, 0);
  var totalPrice = cartItems.reduce(function (sum, item) {
    return sum + item.price * item.quantity;
  }, 0).toFixed(2);
  return {
    cartItems: cartItems,
    totalQuantity: totalQuantity,
    totalPrice: totalPrice
  };
};
var clearCart = function clearCart() {
  state.cart = [];
};
var updateCartItemQuantity = function updateCartItemQuantity(productId, newQuantity) {
  var cartItem = state.cart.find(function (item) {
    return item.id === productId;
  });
  if (cartItem) {
    if (newQuantity > 0) {
      cartItem.quantity = newQuantity;
    } else {
      state.cart = state.cart.filter(function (item) {
        return item.id !== productId;
      });
    }
  } else {
    console.error("Cart item not found");
  }
};
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
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render */ "./src/render.js");



var appEl = document.querySelector('#app');
(0,_render__WEBPACK_IMPORTED_MODULE_1__.render)(_state__WEBPACK_IMPORTED_MODULE_0__["default"], appEl);
appEl.addEventListener('click', function (e) {
  if (e.target.classList.contains('add-to-cart')) {
    var productId = parseInt(e.target.dataset.id, 10);
    (0,_state__WEBPACK_IMPORTED_MODULE_0__.addToCart)(productId);
    (0,_render__WEBPACK_IMPORTED_MODULE_1__.updateViewCartButton)(_state__WEBPACK_IMPORTED_MODULE_0__["default"]);
    (0,_render__WEBPACK_IMPORTED_MODULE_1__.render)(_state__WEBPACK_IMPORTED_MODULE_0__["default"], appEl);
  }
  if (e.target.id === 'view-cart') {
    _state__WEBPACK_IMPORTED_MODULE_0__["default"].showCart = true;
    (0,_render__WEBPACK_IMPORTED_MODULE_1__.render)(_state__WEBPACK_IMPORTED_MODULE_0__["default"], appEl);
  }
  if (e.target.id === 'hide-cart') {
    _state__WEBPACK_IMPORTED_MODULE_0__["default"].showCart = false;
    (0,_render__WEBPACK_IMPORTED_MODULE_1__.render)(_state__WEBPACK_IMPORTED_MODULE_0__["default"], appEl);
  }
  if (e.target.id === 'checkout') {
    (0,_state__WEBPACK_IMPORTED_MODULE_0__.clearCart)();
    _state__WEBPACK_IMPORTED_MODULE_0__["default"].showCart = false;
    (0,_render__WEBPACK_IMPORTED_MODULE_1__.render)(_state__WEBPACK_IMPORTED_MODULE_0__["default"], appEl);
  }
});
appEl.addEventListener('input', function (e) {
  if (e.target.classList.contains('cart-quantity')) {
    var productId = parseInt(e.target.dataset.id, 10);
    var newQuantity = parseInt(e.target.value, 10);
    (0,_state__WEBPACK_IMPORTED_MODULE_0__.updateCartItemQuantity)(productId, newQuantity);
    (0,_render__WEBPACK_IMPORTED_MODULE_1__.updateViewCartButton)(_state__WEBPACK_IMPORTED_MODULE_0__["default"]);
    (0,_render__WEBPACK_IMPORTED_MODULE_1__.render)(_state__WEBPACK_IMPORTED_MODULE_0__["default"], appEl);
  }
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map