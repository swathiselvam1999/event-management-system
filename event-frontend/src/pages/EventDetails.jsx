import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  setEvent,
  setEventLoading,
  setEventError,
  clearEvent,
} from "../redux/eventDetailsSlice";
import { useEffect } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const EventDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { event, loading, error } = useSelector((state) => state.eventDetails);
  const { userInfo } = useSelector((state)=> state.userAuth);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        dispatch(setEventLoading(true));
        const res = await axios.get(`${API_URL}/api/events/${id}`);
        dispatch(setEvent(res.data));
        dispatch(setEventLoading(false));
      } catch (err) {
        dispatch(setEventError(`Error: ${err.message}`));
        dispatch(setEventLoading(false));
      }
    };
    fetchEvent();
    // clear event when leaving the page
    return () => {
      dispatch(clearEvent());
    };
  }, [dispatch, id]);

  if (loading) return <p>Loading event...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  if (!event) {
    return (
      <div className="p-6">
        <p className="text-red-500">Event not found.</p>
        <Link to="/" className="text-blue-500 underline">
          Back to Events
        </Link>
      </div>
    );
  }

  const handleBookNow = ()=>{
    if(!userInfo){
      navigate('/login');
    }else{
      navigate(`/book/${event._id}`)
    }
  };

  return (
    <div
      className="relative bg-cover bg-center h-screen"
      style={{ backgroundImage: `url(${event.image})` }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div className="relative z-10 text-white p-6 max-w-5xl mx-auto shadow-2xl shadow-gray-300">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-56 object-cover rounded"
        />
        <h2 className="text-3xl font-bold mt-4">{event.title}</h2>
        <p className=" mt-2">
          {event.category} | {event.location}
        </p>
        <p className="mt-2">
          {event.date} — ₹{event.price}
        </p>

        <p className="mt-4">{event.description}</p>

        <div className=" flex justify-between items-center mt-6">
        
          <button 
            onClick={handleBookNow}
            className="bg-blue-600 text-white px-4 py-2 rounded  hover:bg-blue-700"
          >
            Book Now
          </button>

          <Link to="/" className="text-blue-400 underline">
            ← Back to Events
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
