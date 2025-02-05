import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../../5_entities/user/model/userSlice';
import navbarReducer from '../../5_entities/Navbar/model/navbarSlice';
import wishListReducer from '../../5_entities/wishlist/model/wishListSlice';
import wishReducer from '../../5_entities/wish/model/wishSlice';
import friendReducer from '../../4_features/friends/model/friendsSlice';
import modalReducer from '../../5_entities/modal_window/modalSlice';
import redactionReducer from '../../5_entities/delete/redactionSlice';
import presentReducer from '../../5_entities/present/model/presentSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    navbar: navbarReducer,
    wishlist: wishListReducer,
    wish: wishReducer,
    friend: friendReducer,
    modal: modalReducer,
    redaction: redactionReducer,
    present: presentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
