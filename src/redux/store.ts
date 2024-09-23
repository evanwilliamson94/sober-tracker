import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalSlice"; // Import your modal slice
import authReducer from "./authSlice"; // Import your new auth slice

const store = configureStore({
  reducer: {
    modals: modalReducer,  // Modal state management
    auth: authReducer,     // Add the auth reducer to manage user authentication
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
