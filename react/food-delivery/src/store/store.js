import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './reducer';
import userSlice from './userSlice';

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
