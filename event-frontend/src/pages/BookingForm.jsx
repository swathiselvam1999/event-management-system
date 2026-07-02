import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addBooking,
  setBookingLoading,
  setBookingError,
} from "../redux/bookingSlice";
import axios from "axios";
import { useEffect } from "react";
const API_URL = import.meta.env.VITE_API_URL;

const BookingForm = () => {
  const { id } = useParams();
  const {
    allEvents: events,
    loading,
    error,
  } = useSelector((state) => state.events);

  const {userInfo} = useSelector((state)=> state.userAuth || [])
  const {token} = useSelector((state)=>state.userAuth.userInfo || [])

  const [localEvent, setLocalEvent] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    tickets: 1,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setBookingLoading(true));
      const res = await axios.post(`${API_URL}api/bookings`, {
        eventId: event._id,
        tickets: formData.tickets,
      },
      {
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
    );
      dispatch(addBooking(res.data));
      dispatch(setBookingError(null));
      navigate("/mybookings");
    } catch (err) {
      dispatch(setBookingError(`Error:${err.message}`));
      dispatch(setBookingLoading(false));
    }
  };

  // ✅ Fix: compare string with string, not parseInt
  const event = events.find((e) => e._id === id) || localEvent;

  useEffect(() => {
    if (!events.find((e) => e._id === id) && !localEvent) {
      const fetchEvent = async () => {
        try {
          const res = await axios.get(`${API_URL}api/events/${id}`);
          setLocalEvent(res.data);
        } catch (err) {
          console.error(`Error: ${err.message}`);
        }
      };
      fetchEvent();
    }
  }, [id, event]);

  // ✅ Guard against undefined event
  if (!event) {
    return <p className="text-center py-20 text-danger bg-paper min-h-screen">Event not found.</p>;
  }

  if (loading) return <p className="text-center py-20 text-slate bg-paper min-h-screen">Loading events...</p>;
  if (error) return <p className="text-center py-20 text-danger bg-paper min-h-screen">{error}</p>;

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-paper px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl ring-1 ring-black/5 overflow-hidden">
        <div className="bg-ink text-paper px-6 py-5">
          <p className="text-xs uppercase tracking-widest text-paper/60 font-mono">Booking</p>
          <h3 className="font-display text-2xl font-semibold mt-1">{event.title}</h3>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="flex items-center justify-between text-sm bg-paper rounded-xl px-4 py-3">
            <span className="text-slate">Booking as</span>
            <span className="font-semibold text-ink text-right">
              {userInfo?.name}
              <br />
              <span className="font-mono text-xs text-slate">{userInfo?.email}</span>
            </span>
          </div>

          <div>
            <label htmlFor="tickets" className="block text-sm font-medium text-ink mb-1.5">
              Number of tickets
            </label>
            <input
              type="number"
              name="tickets"
              placeholder="Enter number of tickets"
              value={formData.tickets}
              min="1"
              onChange={handleChange}
              className="w-full border border-black/10 focus:border-coral focus:ring-2 focus:ring-coral/20 outline-none px-4 py-2.5 rounded-xl font-mono transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-coral hover:bg-coral/90 text-white font-semibold rounded-xl py-3 transition-colors"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
