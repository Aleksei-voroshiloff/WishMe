import { createSlice } from '@reduxjs/toolkit';

type ButtonState = {
  showButton: boolean;
};

const initialState: ButtonState = {
  showButton: false,
};

const redactionReducer = createSlice({
  name: 'redaction',
  initialState,
  reducers: {
    setShowButton(state) {
      state.showButton = !state.showButton;
    },
  },
});

export const { setShowButton } = redactionReducer.actions;
export default redactionReducer.reducer;
