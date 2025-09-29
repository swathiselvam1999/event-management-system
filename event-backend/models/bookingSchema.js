import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    eventId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Events",
        required: true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required:true
    },
    tickets:{
        type: Number,
        min: 1
    }
},{
    timestamps: true
})

const Bookings = mongoose.model("Bookings", bookingSchema);
export default Bookings