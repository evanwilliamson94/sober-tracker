import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  loginModalOpen: boolean;
  signupModalOpen: boolean;
}

const initialState: ModalState = {
  loginModalOpen: false,
  signupModalOpen: false,
};

const modalSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    openLoginModal: (state) => {
      state.loginModalOpen = true;
    },
    closeLoginModal: (state) => {
      state.loginModalOpen = false;
    },
    openSignupModal: (state) => {
      state.signupModalOpen = true;
    },
    closeSignupModal: (state) => {
      state.signupModalOpen = false;
    },
  },
});

export const { openLoginModal, closeLoginModal, openSignupModal, closeSignupModal } = modalSlice.actions;
export default modalSlice.reducer;
