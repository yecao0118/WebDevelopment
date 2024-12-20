import { addToCart, updateCartItemQuantity, clearCart } from './state';
import { render, updateViewCartButton } from './render';
import state from './state';

const appEl = document.querySelector('#app');
render(state, appEl);

appEl.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
        const productId = parseInt(e.target.dataset.id, 10);
        addToCart(productId);
        updateViewCartButton(state);
        render(state, appEl); 
    }

    if (e.target.id === 'view-cart') {
        state.showCart = true;
        render(state, appEl);
    }

    if (e.target.id === 'hide-cart') {
        state.showCart = false; 
        render(state, appEl);
    }

    if (e.target.id === 'checkout') {
        clearCart();
        state.showCart = false;
        render(state, appEl);
    }
});

appEl.addEventListener('input', (e) => {
    if (e.target.classList.contains('cart-quantity')) {
        const productId = parseInt(e.target.dataset.id, 10);
        const newQuantity = parseInt(e.target.value, 10);
        updateCartItemQuantity(productId, newQuantity);
        updateViewCartButton(state);
        render(state, appEl);
    }
});