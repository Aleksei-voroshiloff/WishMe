import { createSlice } from '@reduxjs/toolkit';

type ModalState = {
  showUserModal: boolean;
};

const initialState: ModalState = {
  showUserModal: false,
};

const modalSlice = createSlice({
  name: 'Modal',
  initialState,
  reducers: {
    openUserModal(state) {
      state.showUserModal = true;
    },
    closeUserModal(state) {
      state.showUserModal = false;
    },
  },
});

export const { openUserModal, closeUserModal } = modalSlice.actions;
export default modalSlice.reducer;
