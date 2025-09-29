import { createSlice } from "@reduxjs/toolkit";

const eventsSlice = createSlice({
  name: "events",
  initialState: {
    allEvents: [],
    filteredEvents: [],
    loading: false,
    error: null,
  },
  reducers: {
    setEvents: (state, action) => {
      state.allEvents = action.payload;
      state.filteredEvents = action.payload;
    },

    filteredEvents: (state, action) => {
      const { category, search } = action.payload;
      state.filteredEvents = state.allEvents.filter((event) => {
        const matchesCategory = category ? event.category === category : true;
        const matchesSearch = search
          ? event.title.toLowerCase().includes(search.toLowerCase()) ||
            event.location.toLowerCase().includes(search.toLowerCase())
          : true;

        return matchesCategory && matchesSearch;
      });
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setEvents, filteredEvents, setLoading, setError } = eventsSlice.actions;
export default eventsSlice.reducer;
