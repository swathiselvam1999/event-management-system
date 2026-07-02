import { useSelector, useDispatch } from "react-redux";
import { setEvents, filteredEvents, setLoading, setError } from "../redux/eventsSlice";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const EventList = () => {
  const { filteredEvents: events, loading, error } = useSelector((state) => state.events);
  const dispatch = useDispatch();

  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(()=>{
    const fetchEvents = async()=>{
      try{
        dispatch(setLoading(true))
        const res = await axios.get(`${API_URL}api/events`)
        dispatch(setEvents(res.data));
        dispatch(setLoading(false));
      }catch(err){
        dispatch(setError('Failed to fetch Events'));
        dispatch(setLoading(false))
      }
    }
    fetchEvents();
  },[dispatch])

  const handleFilter = (category, search) => {
    dispatch(filteredEvents({ category, search }));
  };

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    handleFilter(newCategory, searchTerm);
  };

  const handleSearchChange = (e) => {
    const newSearch = e.target.value;
    setSearchTerm(newSearch);
    handleFilter(category, newSearch);
  };

  if (loading) return <p className="text-center py-20 text-slate bg-paper min-h-screen">Loading events...</p>;
  if (error) return <p className="text-center py-20 text-danger bg-paper min-h-screen">{error}</p>;

  return (
    <div className="min-h-screen bg-paper px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <p className="font-mono text-xs uppercase tracking-widest text-coral mb-2">Browse</p>
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-ink">Upcoming Events</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-3 mb-10">
          <select
            value={category}
            onChange={handleCategoryChange}
            className="bg-white border border-black/10 rounded-full px-4 py-2.5 text-sm text-ink focus:border-coral outline-none"
          >
            <option value="">All Categories</option>
            {[...new Set(events.map((e) => e.category))].map((item, i) => (
              <option key={i}>{item}</option>
            ))}
          </select>

          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search events..."
            className="bg-white border border-black/10 rounded-full px-4 py-2.5 text-sm flex-1 focus:border-coral outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.length > 0 ? (
            events.map((event) => (
              <Link
                to={`/event/${event._id}`}
                key={event._id}
                className="group relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm ring-1 ring-black/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-ink/80 text-white text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide">
                    {event.category}
                  </span>
                </div>

                <div className="p-5 pb-4">
                  <h3 className="font-display font-semibold text-lg text-ink leading-snug">{event.title}</h3>
                  <p className="text-sm text-slate mt-1">{event.location}</p>
                </div>

                {/* perforated ticket divider */}
                <div className="relative px-5">
                  <div className="border-t-2 border-dashed border-black/10"></div>
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-paper rounded-full"></span>
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-5 h-5 bg-paper rounded-full"></span>
                </div>

                <div className="flex items-center justify-between px-5 py-4">
                  <span className="font-mono text-xs text-slate">{event.date}</span>
                  <span className="font-mono text-sm font-semibold text-coral">₹{event.price}</span>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-slate">
              <p className="font-display text-xl text-ink">No events found</p>
              <p className="text-sm mt-1">Try a different search or category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventList;
