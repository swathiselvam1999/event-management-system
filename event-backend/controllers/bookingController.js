import Bookings from "../models/bookingSchema.js";

const getMyBookings = async (req, res) => {
  try {
    const bookings = await Bookings.find({ userId: req.user._id }).populate(
      "eventId",
      "title date price"
    );
    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: "No Bookings Found" });
    }
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: `Error: ${err.message}` });
  }
};

const addBooking = async (req, res) => {
  const { eventId, tickets } = req.body;
  const userId = req.user._id;
  try {
    const existing = await Bookings.findOne({ eventId, userId });

    if (existing) {
      existing.tickets = Number(tickets); // merge tickets
      await existing.save();
      return res.status(200).json(existing);
    }

    const newBooking = await Bookings.create({
      eventId,
      userId,
      name: req.user.name,
      email: req.user.email,
      tickets,
    });
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(500).json({ message: `Error: ${err.message}` });
  }
};

const cancelBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Bookings.findById(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Make sure logged-in user can only delete their own booking
    if (booking.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not auhtorized" });
    }

    await booking.deleteOne();
    res.status(200).json({ message: "Deleted Successfully" });

  } catch (err) {
    res.status(500).json({ message: `Error: ${err.message}` });
  }
};

const clearAllBooking = async (req, res) => {
  await Bookings.deleteMany();
  res.json({ message: "Deleted all bookings" });
};

export { getMyBookings, addBooking, cancelBooking, clearAllBooking };
