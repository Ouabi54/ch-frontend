// socketSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  socketOpen: false,
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    startSocket: (state) => {
      state.socketOpen = true;
    },
    stopSocket: (state) => {
      state.socketOpen = false;
    },
  },
});

export const { startSocket, stopSocket } = socketSlice.actions;

export const selectSocketOpen = (state) => state.socket.socketOpen;

export default socketSlice.reducer;
