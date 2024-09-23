import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state type for auth
interface AuthState {
  user: {
    uid: string;
    email: string;
  } | null;
}

// Set the initial state
const initialState: AuthState = {
  user: null, // No user logged in by default
};

// Create the slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to set the user when logged in
    setUser: (state, action: PayloadAction<{ uid: string; email: string }>) => {
      state.user = action.payload;
    },
    // Action to clear the user when logged out
    clearUser: (state) => {
      state.user = null;
    },
  },
});

// Export actions to be used in components
export const { setUser, clearUser } = authSlice.actions;

// Export the reducer to be added to the store
export default authSlice.reducer;
