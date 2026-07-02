import { useDispatch, useSelector } from "react-redux";
import {
  cancelBooking,
  setBooking,
  setBookingError,
  setBookingLoading,
} from "../redux/bookingSlice";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const MyBookings = () => {
  const bookings = useSelector((state) => state.bookings.allBookings);
  const token = useSelector((state)=>state.userAuth.userInfo?.token)
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        dispatch(setBookingLoading(true));
        const res = await axios.get(`${API_URL}api/bookings/my`, {
          headers:{
            Authorization: `Bearer ${token}`
          }
        });
        dispatch(setBooking(res.data));
        dispatch(setBookingLoading(false));
      } catch (err) {
        dispatch(setBookingError(`Error: ${err.message}`));
      }
    };
    if(token) fetchBookings();
  }, [dispatch, token]);

  const handleCancel = async (id) => {
    if(!token) return;

    try {
      await axios.delete(`${API_URL}api/bookings/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      dispatch(cancelBooking(id));
    } catch (err) {
      console.error(err.message);
    }
  };

  if (!bookings || bookings.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-paper px-6 text-center">
        <p className="font-display text-xl text-ink mb-2">No bookings yet</p>
        <p className="text-slate mb-6">Your booked tickets will show up here.</p>
        <Link
          to="/"
          className="bg-coral text-white px-6 py-2.5 rounded-full font-semibold hover:bg-coral/90 transition-colors"
        >
          Browse Events
        </Link>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-paper px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="text-sm text-slate hover:text-coral transition-colors">← Go Home</Link>

        <h3 className="font-display text-3xl font-semibold text-ink mt-4 mb-8">My Bookings</h3>

        <div className="space-y-5">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-2xl shadow-sm ring-1 ring-black/5 overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-6 gap-4">
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink">
                    {booking?.eventId?.title}
                  </h3>
                  <p className="text-sm text-slate mt-1">
                    {booking?.name} · {booking?.email}
                  </p>
                  <div className="flex gap-4 mt-2 font-mono text-xs text-slate">
                    <span>{booking?.eventId?.date}</span>
                    <span>{booking?.tickets} ticket{booking?.tickets > 1 ? "s" : ""}</span>
                  </div>
                </div>
                <div className="flex sm:flex-col items-center sm:items-end gap-3">
                  <span className="font-mono text-lg font-semibold text-coral">
                    ₹{Number(booking?.eventId?.price) * booking?.tickets}
                  </span>
                  <button
                    onClick={() => handleCancel(booking._id)}
                    className="text-xs font-semibold text-danger border border-danger/30 hover:bg-danger hover:text-white px-3 py-1.5 rounded-full transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
