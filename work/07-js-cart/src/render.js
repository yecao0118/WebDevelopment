import { getCartItems } from './state';

function render(state, appEl) {
    renderProducts(state, appEl);

    if (state.showCart) {
        renderCart(state, appEl);
    }

    updateViewCartButton(state);
}

function renderProducts(state, appEl) {
    const productsHtml = state.products.map(product => `
        <div class="product">
            <img class="img" src="${product.image}" alt="${product.name}">
            <h3 class="product-header">${product.name}</h3>
            <p class="product-info">$${product.price.toFixed(2)}</p>
            <button data-id="${product.id}" class="add-to-cart">Add to Cart</button>
        </div>
    `).join('');

    const { totalQuantity } = getCartItems();
    const viewCartButtonText = totalQuantity > 0 ? `View Cart (${totalQuantity})` : 'View Cart';
    const viewCartButtonHtml = state.showCart ? '' : `<button id="view-cart">${viewCartButtonText}</button>`;
    const hideCartButtonHtml = state.showCart ? `<button id="hide-cart">Hide Cart</button>` : '';

    const productsSection = `
        <h2 class="products-header">Products</h2>
        <div class="product-list">${productsHtml}</div>
        ${viewCartButtonHtml}
        ${hideCartButtonHtml}
    `;

    appEl.innerHTML = productsSection;
}

function renderCart(state, appEl) {
    const { cartItems, totalQuantity, totalPrice } = getCartItems();

    let cartHtml;
    if (cartItems.length === 0) {
        cartHtml = "<p>Nothing in the cart</p>";
    } else {
        cartHtml = cartItems.map(item => `
            <div class="cart-item">
                <img class="cart-img" src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>$${item.price.toFixed(2)}</p>
                <p>Quantity: <input type="number" min="0" value="${item.quantity}" data-id="${item.id}" class="cart-quantity" /></p>
                <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
            </div>
        `).join('');
        cartHtml += `
            <div class="cart-total">
                <h3>Total Price: $${totalPrice}</h3>
            </div>
            <button id="checkout">Checkout</button>`;
    }

    const cartSectionHtml = `
        <div class="cart-section">
        <h2>Your Cart (${totalQuantity})</h2>
        <div class="cart-content">${cartHtml}</div>
        </div>
    `;

    appEl.innerHTML += cartSectionHtml;
}

function updateViewCartButton(state) {
    const { totalQuantity } = getCartItems();

    const viewCartButton = document.querySelector('#view-cart');
    if (viewCartButton && !state.showCart) {
        viewCartButton.textContent = totalQuantity > 0 ? `View Cart (${totalQuantity})` : 'View Cart';
    }
}

export { render, renderCart, updateViewCartButton };