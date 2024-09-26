import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalSlice"; // Import modal slice
import authReducer from "./authSlice"; // Import auth slice
import editProfileModalReducer from "../redux/editProfileModalSlice"; // Import edit profile modal slice

const store = configureStore({
  reducer: {
    modals: modalReducer,  
    auth: authReducer,
    editProfileModal: editProfileModalReducer, // Add edit profile modal slice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
