import { createSlice } from '@reduxjs/toolkit';
import type { PresentObjType } from '../types/presentType';
import { getAllPresent } from '../lib/presentThunk';

type PresentState = {
  presents: PresentObjType | null;
  loading: boolean;
};

const initialState: PresentState = {
  presents: null,
  loading: false,
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
      });
  },
});

export default presentSlice.reducer;
