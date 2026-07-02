// seed/eventSeeder.js
//
// Run with:
//   node seed/eventSeeder.js         -> inserts sample events
//   node seed/eventSeeder.js -d      -> deletes all events instead
//
// Adjust the require path below to match where your Event model actually lives.

import mongoose from "mongoose";
import dotenv from "dotenv";
import Event from "../models/eventSchema.js"

dotenv.config();

const events = [
  {
    title: "Sunburn Music Festival",
    category: "Music",
    location: "Goa",
    date: "2026-08-15",
    price: 2499,
    description:
      "A three-day electronic dance music festival on the beaches of Goa featuring top DJs from around the world, food stalls, and beachside camping.",
    image: "https://picsum.photos/seed/sunburn/800/500",
  },
  {
    title: "Startup Founders Summit",
    category: "Business",
    location: "Bengaluru",
    date: "2026-07-22",
    price: 1499,
    description:
      "A full-day summit bringing together early-stage founders, VCs, and product leaders for talks, panels, and networking sessions.",
    image: "https://picsum.photos/seed/foundersummit/800/500",
  },
  {
    title: "Chennai Food & Culture Fest",
    category: "Food",
    location: "Chennai",
    date: "2026-08-02",
    price: 499,
    description:
      "Explore authentic South Indian cuisine, live cooking demos, folk performances, and pop-up stalls from local restaurants.",
    image: "https://picsum.photos/seed/foodfest/800/500",
  },
  {
    title: "Stand-Up Comedy Night",
    category: "Comedy",
    location: "Mumbai",
    date: "2026-07-10",
    price: 699,
    description:
      "An evening of laughs featuring five rising comedians performing their best sets in an intimate indoor venue.",
    image: "https://picsum.photos/seed/comedynight/800/500",
  },
  {
    title: "Marathon for a Cause",
    category: "Sports",
    location: "Delhi",
    date: "2026-09-05",
    price: 799,
    description:
      "A 10K charity run through the city with all proceeds going toward local education initiatives. Includes a finisher medal and refreshments.",
    image: "https://picsum.photos/seed/marathon/800/500",
  },
  {
    title: "Contemporary Art Exhibition",
    category: "Art",
    location: "Kolkata",
    date: "2026-07-28",
    price: 299,
    description:
      "A curated exhibition of contemporary Indian artists exploring themes of identity, urbanism, and memory through mixed media.",
    image: "https://picsum.photos/seed/artexhibit/800/500",
  },
  {
    title: "Tech Conclave 2026",
    category: "Technology",
    location: "Hyderabad",
    date: "2026-08-20",
    price: 1999,
    description:
      "Industry leaders discuss the future of AI, cloud infrastructure, and developer tools across two days of keynotes and workshops.",
    image: "https://picsum.photos/seed/techconclave/800/500",
  },
  {
    title: "Classical Dance Recital",
    category: "Dance",
    location: "Chennai",
    date: "2026-07-18",
    price: 399,
    description:
      "An evening of Bharatanatyam and Kuchipudi performances by award-winning dancers, accompanied by a live orchestra.",
    image: "https://picsum.photos/seed/dancerecital/800/500",
  },
  {
    title: "Weekend Trekking Expedition",
    category: "Adventure",
    location: "Manali",
    date: "2026-09-12",
    price: 3499,
    description:
      "A guided two-day trek through the Himalayan foothills with camping, bonfire nights, and stunning valley views.",
    image: "https://picsum.photos/seed/trekexpo/800/500",
  },
  {
    title: "Book Lovers' Meetup",
    category: "Literature",
    location: "Pune",
    date: "2026-07-25",
    price: 199,
    description:
      "A casual gathering for readers and writers featuring an author Q&A, book swap, and open-mic poetry session.",
    image: "https://picsum.photos/seed/booklovers/800/500",
  },
  {
    title: "Wine & Jazz Evening",
    category: "Music",
    location: "Bengaluru",
    date: "2026-08-08",
    price: 1299,
    description:
      "An intimate rooftop evening pairing live jazz performances with curated wine tastings from local vineyards.",
    image: "https://picsum.photos/seed/winejazz/800/500",
  },
  {
    title: "Kids' Science Carnival",
    category: "Education",
    location: "Ahmedabad",
    date: "2026-08-30",
    price: 349,
    description:
      "An interactive science carnival for children featuring hands-on experiments, robotics demos, and a planetarium show.",
    image: "https://picsum.photos/seed/sciencecarnival/800/500",
  },
];

const seedEvents = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected...");

    if (process.argv.includes("-d")) {
      await Event.deleteMany();
      console.log("All events deleted.");
      process.exit();
    }

    await Event.deleteMany();
    await Event.insertMany(events);
    console.log(`${events.length} events seeded successfully.`);
    process.exit();
  } catch (err) {
    console.error(`Seeder error: ${err.message}`);
    process.exit(1);
  }
};

seedEvents();