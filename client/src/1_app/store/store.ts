import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../../5_entities/user/model/userSlice';
import navbarReducer from '../../5_entities/Navbar/model/navbarSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    navbar: navbarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
