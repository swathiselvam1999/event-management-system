import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    event: null,
    loading: false,
    error: null,
  }

const eventDetailsSlice = createSlice({
  name: "eventDetails",
  initialState,
  reducers: {
    setEvent: (state, action) => {
      state.event = action.payload;
      state.error = null
    },

    setEventLoading: (state, action) => {
      state.loading = action.payload;
    },

    setEventError: (state, action) => {
      state.error = action.payload;
      state.event = null;
    },
    clearEvent: (state) => {
      state.event = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setEvent, setEventLoading, setEventError, clearEvent } =
  eventDetailsSlice.actions;
export default eventDetailsSlice.reducer;
