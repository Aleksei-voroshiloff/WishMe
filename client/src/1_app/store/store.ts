import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../../5_entities/user/model/userSlice';
import navbarReducer from '../../5_entities/Navbar/model/navbarSlice';
import wishListReducer from '../../5_entities/wishlist/model/wishListSlice';
import wishReducer from '../../5_entities/wish/model/wishSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    navbar: navbarReducer,
    wishlist: wishListReducer,
    wish: wishReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
