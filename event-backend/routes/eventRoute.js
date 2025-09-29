import express from "express";
import { getAllEvents, addEvent, getEvent, deleteEvent, updateEvent } from "../controllers/eventController.js";

const router = express.Router();

router.route("/")
    .get(getAllEvents)
    .post(addEvent)

router.route("/:id")
    .get(getEvent)
    .put(updateEvent)
    .delete(deleteEvent)


export default router
