const mongoose = require("mongoose");

const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    let period = "AM";
    let formattedHours = parseInt(hours, 10);

    if(formattedHours >= 12){
        period = "PM";
        if(formattedHours > 12){
            formattedHours -= 12;
        }
    } 
    
    else if(formattedHours === 0){
        formattedHours = 12;
    }

    return `${formattedHours}:${minutes} ${period}`;
};

const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true,
    },
    eventDescription: {
        type: String,
        required: true,
    },
    eventType: {
        type: String,
        required: true,
    },
    eventDate: {
        type: Date,
        required: true,
    },
    eventTime: {
        type: String,
        required: true,
        set: formatTime,
    },
    attendees: {
        type: Number,
        default: 0,
    },
    registeredUsers: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    }]
});

module.exports = mongoose.model("EMS-Events", eventSchema);