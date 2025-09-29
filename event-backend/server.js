import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./db.js";
import eventRouter from "./routes/eventRoute.js"
import bookingRouter from "./routes/bookingRoute.js"
import authRoutes from "./routes/authRoute.js"
import compression from "compression";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 3000;

const app = express();

// ✅ compress all responses
app.use(compression());

app.use(cors())
app.use(express.json())

app.use("/api/events", eventRouter);
app.use("/api/bookings", bookingRouter);
app.use("/auth", authRoutes);

app.listen((PORT), ()=>{
    console.log(`PORT is running in http://localhost:${PORT}`)
})