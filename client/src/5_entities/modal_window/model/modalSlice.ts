import { createSlice } from '@reduxjs/toolkit';

type ModalState = {
  showUserModal: boolean;
  avatar: string | null;
};

const initialState: ModalState = {
  showUserModal: false,
  avatar: null,
};

const modalSlice = createSlice({
  name: 'Modal',
  initialState,
  reducers: {
    setAvatar(state, action: { payload: string }) {
      state.avatar = action.payload;
    },
    openUserModal(state) {
      state.showUserModal = true;
    },
    closeUserModal(state) {
      state.showUserModal = false;
      state.avatar = null;
    },
  },
});

export const { openUserModal, closeUserModal, setAvatar } = modalSlice.actions;
export default modalSlice.reducer;
