const express = require("express");
const router = express.Router();
const Event = require("../schema/eventSchema");
const mongoose = require("mongoose");

router.post("/registerAttendee/:eventId", async (req, res) => {
    try {
        let { userId } = req.body;
        const { eventId } = req.params;

        console.log("Received userId:", userId);
        console.log("Received eventId:", eventId);

        if(!userId || typeof userId !== "string" || !mongoose.Types.ObjectId.isValid(userId)){
            return res.status(400).json({ error: "Invalid user ID format" });
        }

        if(!mongoose.Types.ObjectId.isValid(eventId)){
            return res.status(400).json({ error: "Invalid event ID" });
        }

        const userObjectId = new mongoose.Types.ObjectId(userId);

        const event = await Event.findById(eventId);
        if(!event){
            return res.status(404).json({ error: "Event not found" });
        }

        if(event.registeredUsers.includes(userObjectId)){
            return res.status(400).json({ error: "User already registered for this event" });
        }

        event.registeredUsers.push(userObjectId);
        event.attendees += 1;
        await event.save();

        res.json({ success: true, message: "User registered successfully", event });
    } 
    
    catch(error){
        console.error("Error registering attendee:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/getAttendees", async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;