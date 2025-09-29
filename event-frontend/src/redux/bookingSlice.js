import { createSlice } from "@reduxjs/toolkit";

const bookingSlice = createSlice({
  name: "bookings",
  initialState: {
    allBookings: [],
    loading: false, 
    error: null
  },
  reducers: {
    addBooking: (state, action) => {
      state.allBookings.push(action.payload);
    },
    cancelBooking: (state, action) => {
      state.allBookings = state.allBookings.filter((booking) => booking._id !== action.payload);
    },
    setBooking: (state, action)=>{
      state.allBookings = action.payload;
    },
    setBookingLoading: (state, action) => {
      state.loading = action.payload;
    },

    setBookingError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { addBooking, cancelBooking, setBooking, setBookingLoading, setBookingError } = bookingSlice.actions;
export default bookingSlice.reducer;
