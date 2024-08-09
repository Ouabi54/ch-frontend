import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  users: [],
  requests: [],
  friends: []
};

const usersSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    getUsers: (state, action) => {
      state.users = action.payload.users;
    },
    getRequests: (state, action) => {
      state.requests = action.payload.requests;
    },
    getFriends: (state, action) => {
      state.user.friends = action.payload.friends;
    },
  },
});

export const { getUsers, getRequests, getFriends } =
usersSlice.actions;

  export default usersSlice.reducer;
  export const selectFriends = (state)=> state.data.friends;
  export const selectUsers = (state)=> state.data.users;
  export const selectRequests = (state)=> state.data.requests;