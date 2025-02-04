import { createSlice } from '@reduxjs/toolkit';

type ModalState = {
  showUserModal: boolean;
  showModal: boolean,
  avatar: string | null;
};

const initialState: ModalState = {
  showUserModal: false,
  showModal: false,
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
    openModal(state) {
      state.showModal = true;
    },

    closeModal(state) {
      state.showModal = false;
    },
  },
});

export const { openUserModal, closeUserModal, setAvatar, openModal, closeModal } =
  modalSlice.actions;
export default modalSlice.reducer;
