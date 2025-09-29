import Events from "../models/eventSchema.js";

const getAllEvents = async (req, res) => {
  try {
    const events = await Events.find();
    if (!events) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: `Error: ${err.message}` });
  }
};

const getEvent = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    const event = await Events.findById(id);
    if (!event) {
      return res.status(404).json({ message: "No event found" });
    }
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: `Error: ${err.message}` });
  }
};

const addEvent = async (req, res) => {
  try {
    const { title, category, image, date, price, description, location } =
      req.body;

    if (
      !title ||
      !category ||
      !image ||
      !date ||
      !price ||
      !description ||
      !location
    ) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const newEvent = await Events.create({
      title,
      category,
      image,
      date,
      price,
      description,
      location,
    });

    res.status(201).json({
      newEvent,
      message: "Successfully Added",
    });
  } catch (err) {
    res.status(500).json({ message: `Error: ${err.message}` });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, image, date, price, description, location } =
      req.body;

    const event = await Events.findById(id);

    if (event) {
      event.title = title || event.title;
      event.category = category || event.category;
      event.image = image || event.image;
      event.date = date || event.date;
      event.price = price || event.price;
      event.description = description || event.description;
      event.location = location || event.location;

      const updatedEvent = await event.save();
      res.json({updatedEvent, message: "Event updated Successfully"});
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (err) {
res.status(500).json({ message: `Error: ${err.message}` });
  }
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;
  const event = await Events.findById(id)
  if(!event){
    return res.status(404).json({ message: "Event not found" });
  }
  await event.remove();
  res.json({ message: "Event Deleted Successfully" });
};

export { getAllEvents, getEvent, addEvent, updateEvent, deleteEvent };


// const updateEvent = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Remove undefined fields from req.body
//     const updates = Object.fromEntries(
//       Object.entries(req.body).filter(([_, value]) => value !== undefined)
//     );

//     const updatedEvent = await Events.findByIdAndUpdate(id, updates, { new: true });

//     if (!updatedEvent) {
//       return res.status(404).json({ message: "Event not found" });
//     }

//     res.status(200).json({
//       updatedEvent,
//       message: "Event updated successfully"
//     });
//   } catch (err) {
//     res.status(500).json({ message: `Error: ${err.message}` });
//   }
// };
