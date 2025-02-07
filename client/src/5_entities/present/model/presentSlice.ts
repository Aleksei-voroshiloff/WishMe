import { createSlice } from '@reduxjs/toolkit';
import type { PresentObjType } from '../types/presentType';
import { getAllPresent, getUserIdByWishIdThunk } from '../lib/presentThunk';

type PresentState = {
  presents: PresentObjType | null;
  loading: boolean;
  userReservedId: number | null; 
};

const initialState: PresentState = {
  presents: null,
  loading: false,
  userReservedId: null,
};

const presentSlice = createSlice({
  name: 'Present',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllPresent.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPresent.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.presents = payload;
      })
      .addCase(getUserIdByWishIdThunk.fulfilled, (state, action) => {
        state.userReservedId = action.payload;
      })
  },
});

export default presentSlice.reducer;
