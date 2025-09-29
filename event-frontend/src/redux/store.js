import { configureStore } from "@reduxjs/toolkit";
import eventsReducer from "./eventsSlice"
import bookingsReducer from "./bookingSlice"
import eventDetailsReducer from "./eventDetailsSlice"
import authSliceReducer from "./authSlice";

export const store = configureStore({
    reducer:{
        events: eventsReducer,
        bookings: bookingsReducer,
        eventDetails: eventDetailsReducer,
        userAuth: authSliceReducer
    }
})