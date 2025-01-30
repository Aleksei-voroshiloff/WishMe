import { createSlice } from '@reduxjs/toolkit';

type NavbarState = {
  activeItem: string;
};

const initialState: NavbarState = {
  activeItem: 'Home',
};

const navbarSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    setActiveItem(state, action: { payload: string }) {
      state.activeItem = action.payload;
    },
  },
});

export const { setActiveItem } = navbarSlice.actions;
export default navbarSlice.reducer;
