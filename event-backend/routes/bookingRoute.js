import express from "express";
import {
  addBooking,
  cancelBooking,
  clearAllBooking,
  getMyBookings,
} from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddeware.js";

const router = express.Router();

router.route("/").post(protect, addBooking).delete(clearAllBooking);
router.get("/my", protect, getMyBookings);
router.delete("/:id", protect, cancelBooking);

export default router;
