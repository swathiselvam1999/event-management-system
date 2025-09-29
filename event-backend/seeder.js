import connectDB from "./db.js";
import dotenv from "dotenv";
import Events from "./models/eventSchema.js";

dotenv.config();
connectDB();

const events = [
  {
    "title": "Tech Conference 2025",
    "category": "Conference",
    "image": "https://picsum.photos/id/9/300/200",
    "date": "2025-10-10",
    "price": 100,
    "description": "A conference on modern web technologies.",
    "location": "Chennai",
  },
  {
    "title": "Music Festival",
    "category": "Concert",
    "image": "https://picsum.photos/id/19/300/200",
    "date": "2025-11-05",
    "price": 50,
    "description": "Enjoy live performances from top artists.",
    "location": "Bangalore",
  },
  {
    "title": "Startup Meetup",
    "category": "Meetup",
    "image": "https://picsum.photos/id/29/300/200",
    "date": "2025-12-01",
    "price": 0,
    "description": "Networking event for entrepreneurs.",
    "location": "Hyderabad"
  }
];

const importData = async() =>{
    try{
        await Events.deleteMany();
        await Events.insertMany(events)
        console.log("Sample Events Added");
        process.exit();
    }catch(err){
        console.error(err)
        process.exit(1)
    }
}

importData()