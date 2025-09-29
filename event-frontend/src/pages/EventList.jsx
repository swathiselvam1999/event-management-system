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
        const res = await axios.get(`${API_URL}/api/events`)
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

  if (loading) return <p className="text-center mt-10">Loading events...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className=" p-6">
      <h1 className="text-2xl font-semibold mb-3">Upcoming Events</h1>

      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 ">
        {/* Search */}
        <select
          value={category}
          onChange={handleCategoryChange}
          className="border border-blue-300 rounded px-3 py-2 mb-3 md:mb-0 "
        >
          <option value="">All Category</option>
          {[...new Set(events.map((e) => e.category))].map((item, i) => (
            <option key={i}>{item}</option>
          ))}
        </select>

        {/* Filter */}
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="border border-blue-300 rounded px-3 py-2 flex-1"
        />
      </div>

      <div className="max-w-6xl flex justify-around">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pt-6">
          {events.length > 0 ? (
            events.map((event) => (
              <Link to={`/event/${event._id}`}
                key={event._id}
                className="border border-blue-300 p-4 rounded shadow-md hover:shadow-xl hover:scale-105 transition-all duration-100"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="h-40 w-full object-cover rounded"
                />
                <h3 className="font-bold mt-2">{event.title}</h3>
                <p>
                  {event.category} - {event.location}
                </p>
                <p>{event.date}</p>
                <p>{event.price}</p>
              </Link>
            ))
          ) : (
            <div className="text-center text-gray-500 text-2xl">No Events Found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventList;
