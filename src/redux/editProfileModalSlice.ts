import { createSlice } from "@reduxjs/toolkit";

interface EditProfileModalState {
  editProfileModalOpen: boolean;
}

const initialState: EditProfileModalState = {
  editProfileModalOpen: false, // Modal initially closed
};

const editProfileModalSlice = createSlice({
  name: "editProfileModal",
  initialState,
  reducers: {
    openEditProfileModal(state) {
      state.editProfileModalOpen = true; // Open modal
    },
    closeEditProfileModal(state) {
      state.editProfileModalOpen = false; // Close modal
    },
  },
});

export const { openEditProfileModal, closeEditProfileModal } = editProfileModalSlice.actions;
export default editProfileModalSlice.reducer;
