import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  token: null,
  refreshToken: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      const { user } = action.payload;
      state.user = user
    },
    userLoggedOut: (state) => {
      state.user = null;
    },
  },
});

export const { userLoggedIn, userLoggedOut } =
  authSlice.actions;

  export default authSlice.reducer;
  export const selectCurrentUser = (state)=> state.auth.user;
  export const selectCurrentToken = (state)=> state.auth.token