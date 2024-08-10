// pollingSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pollingEnabled: false,
};

const pollingSlice = createSlice({
  name: 'polling',
  initialState,
  reducers: {
    startPolling: (state) => {
      state.pollingEnabled = true;
    },
    stopPolling: (state) => {
      state.pollingEnabled = false;
    },
  },
});

export const { startPolling, stopPolling } = pollingSlice.actions;

export const selectPollingEnabled = (state) => state.polling.pollingEnabled;

export default pollingSlice.reducer;
