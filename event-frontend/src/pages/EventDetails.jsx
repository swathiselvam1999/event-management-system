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
        const res = await axios.get(`${API_URL}api/events/${id}`);
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

  if (loading) return <p className="text-center py-20 text-slate bg-paper min-h-screen">Loading event...</p>;
  if (error) return <p className="text-center py-20 text-danger bg-paper min-h-screen">{error}</p>;

  if (!event) {
    return (
      <div className="min-h-screen bg-paper p-6 text-center">
        <p className="text-danger mb-3">Event not found.</p>
        <Link to="/" className="text-coral font-medium hover:underline">
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
    <div className="min-h-screen bg-paper pb-16">
      <div className="relative h-[45vh] md:h-[55vh] w-full overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-10">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block bg-coral text-white text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full mb-3">
              {event.category}
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-white leading-tight">
              {event.title}
            </h2>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto -mt-6 relative z-10 px-6">
        <div className="bg-white rounded-2xl shadow-xl ring-1 ring-black/5 overflow-hidden">
          <div className="p-6 md:p-8 space-y-4">
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate font-mono">
              <span>{event.location}</span>
              <span>{event.date}</span>
            </div>
            <p className="text-ink/80 leading-relaxed">{event.description}</p>
          </div>

          {/* perforated ticket divider */}
          <div className="relative px-6 md:px-8">
            <div className="border-t-2 border-dashed border-black/10"></div>
            <span className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-paper rounded-full"></span>
            <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-5 h-5 bg-paper rounded-full"></span>
          </div>

          <div className="flex items-center justify-between p-6 md:p-8">
            <div>
              <p className="text-xs text-slate uppercase tracking-wide">Price per ticket</p>
              <p className="font-mono text-2xl font-semibold text-coral">₹{event.price}</p>
            </div>
            <button
              onClick={handleBookNow}
              className="bg-ink hover:bg-ink/90 text-white px-6 py-3 rounded-full font-semibold transition-colors"
            >
              Book Now
            </button>
          </div>
        </div>

        <Link to="/" className="inline-block mt-6 text-slate hover:text-coral transition-colors text-sm">
          ← Back to Events
        </Link>
      </div>
    </div>
  );
};

export default EventDetails;
