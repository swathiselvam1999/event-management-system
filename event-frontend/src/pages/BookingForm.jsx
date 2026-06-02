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
    return <p className="text-red-500">Event not found.</p>;
  }

  if (loading) return <p className="text-center mt-10">Loading events...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto p-10 shadow-2xl rounded">
      <h3 className="text-2xl font-bold mb-4">Book :{event.title}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <p>
          Booking as: <span className="font-semibold">{userInfo?.name}</span> (
          {userInfo?.email})
        </p>

        <div>
          <label htmlFor="tickets">Tickets</label>
          <input
            type="number"
            name="tickets"
            placeholder="Enter number of tickets"
            value={formData.tickets}
            min="1"
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-400 rounded py-2 text-white"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
