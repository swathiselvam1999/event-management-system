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
      <p className="p-6">
        No bookings yet.{" "}
        <Link to="/" className="text-blue-500 underline">
          Book Now
        </Link>
      </p>
    );
  }


  return (
    <div className="max-w-3xl p-4 mx-auto shadow-2xl rounded">
      <Link to="/" className="text-blue-500 underline">Go Home</Link>

      <h3 className="text-2xl font-bold text-center mb-4">My Bookings</h3>
      {bookings.map((booking) => (
        <div
          key={booking._id}
          className="border p-4 rounded shadow-md flex justify-between items-center mt-2"
        >
          <div className="">
            <h3 className="text-xl font-bold">{booking?.eventId?.title}</h3>
            <p>Name:{booking?.name}</p>
            <p>Email: {booking?.email}</p>
            <p>Date: {booking?.eventId?.date}</p>
            <p>Tickects: {booking?.tickets}</p>
            <p>Total Price: ₹{Number(booking?.eventId?.price) * (booking?.tickets)}</p>
          </div>
          <div>
            <button
              onClick={() => handleCancel(booking._id)}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Cancel Booking
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
