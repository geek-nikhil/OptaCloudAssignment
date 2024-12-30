import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '', // Initial state for email
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload; // Set the email
    },
    clearEmail: (state) => {
      state.email = ''; // Clear the email
    },
  },
});

export const { setEmail, clearEmail } = userSlice.actions; // Export actions
export default userSlice.reducer; // Export reducer
