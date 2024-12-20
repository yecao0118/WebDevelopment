const state = {
  products: [
      { id: 1, name: "Jorts", price: 0.99, image: "http://placehold.co/150x150?text=Jorts" },
      { id: 2, name: "Jean", price: 3.14, image: "http://placehold.co/150x150?text=Jean" },
      { id: 3, name: "Nyancat", price: 2.73, image: "http://placehold.co/150x150?text=Nyancat" }
  ],
  cart: [],
  showCart: false,
};

export const getProducts = () => state.products;

export const addToCart = (productId) => {
  const cartItem = state.cart.find(item => item.id === productId);
  if (cartItem) {
      cartItem.quantity++;
  } else {
      const product = state.products.find(p => p.id === productId);
      if (product) {
          state.cart.push({ id: productId, quantity: 1 });
      } else {
          console.error("Product not found");
      }
  }
};

export const getCartItems = () => {
  const cartItems = state.cart.map(cartItem => {
    const product = state.products.find(p => p.id === cartItem.id);
    return {
      id: cartItem.id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: cartItem.quantity,
      total: (product.price * cartItem.quantity).toFixed(2),
    };
  });

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);

  return { cartItems, totalQuantity, totalPrice };
};

export const clearCart = () => {
  state.cart = [];
};

export const updateCartItemQuantity = (productId, newQuantity) => {
  const cartItem = state.cart.find(item => item.id === productId);
  if (cartItem) {
      if (newQuantity > 0) {
          cartItem.quantity = newQuantity;
      } else {
          state.cart = state.cart.filter(item => item.id !== productId);
      }
  } else {
      console.error("Cart item not found");
  }
};

export default state;



