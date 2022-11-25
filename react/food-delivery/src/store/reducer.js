import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showCart: false,
  cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
  totalQuantity: localStorage.getItem('totalQuantity') ? JSON.parse(localStorage.getItem('totalQuantity')) : 0,
  totalAmount: localStorage.getItem('totalAmount') ? JSON.parse(localStorage.getItem('totalAmount')) : 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // ++++SHOW CART++++
    toggleCart(state) {
      state.showCart = !state.showCart;
    },

    // ++++ADD CART++++
    addToCart(state, action) {
      const newItems = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === newItems.id);
      state.totalQuantity++;

      if (!existingItem) {
        // add to cart
        state.cartItems.push({
          id: newItems.id,
          title: newItems.title,
          image01: newItems.image01,
          price: newItems.price,
          quantity: 1,
          totalPrice: newItems.price,
        });
      } else {
        // increase quantity
        existingItem.quantity++;

        existingItem.totalPrice = Number(existingItem.totalPrice) + Number(newItems.price);
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0,
      );

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      localStorage.setItem('totalQuantity', JSON.stringify(state.totalQuantity));
      localStorage.setItem('totalAmount', JSON.stringify(state.totalAmount));
    },

    // ++++REMOVE++++
    removeCart(state, action) {
      const { id } = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      state.totalQuantity--;

      if (existingItem.quantity === 1) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = Number(existingItem.totalPrice) - Number(existingItem.price);
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0,
      );

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      localStorage.setItem('totalQuantity', JSON.stringify(state.totalQuantity));
      localStorage.setItem('totalAmount', JSON.stringify(state.totalAmount));
    },

    // ++++DELETE++++
    deleteCart(state, action) {
      const { id } = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
        state.totalQuantity = state.totalQuantity - existingItem.quantity;
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0,
      );

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      localStorage.setItem('totalQuantity', JSON.stringify(state.totalQuantity));
      localStorage.setItem('totalAmount', JSON.stringify(state.totalAmount));
    },
  },
});

// Action creators are generated for each case reducer function

export const cartActions = cartSlice.actions;

export default cartSlice;
