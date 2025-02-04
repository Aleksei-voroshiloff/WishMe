import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../../5_entities/user/model/userSlice';
import navbarReducer from '../../5_entities/Navbar/model/navbarSlice';
import wishListReducer from '../../5_entities/wishlist/model/wishListSlice';
import wishReducer from '../../5_entities/wish/model/wishSlice';
import friendReducer from '../../4_features/friends/model/friendsSlice';
import modalSlice from '../../4_features/modal_addList/modalSlice/modalSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    navbar: navbarReducer,
    wishlist: wishListReducer,
    wish: wishReducer,
    friend: friendReducer,
    modal_add: modalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
