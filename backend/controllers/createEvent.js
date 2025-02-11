const eventSchema = require('../schema/eventSchema');

exports.createEvent = async(req, resp) => {
    try{
        const { eventName, eventDescription, eventType, eventDate, eventTime } = req.body;

        if(!eventName || !eventDescription || !eventType || !eventDate || !eventTime){
            return resp.status(400).json({
                success : false,
                message : "Please fill all the Fields"
            })
        }

        const formattedDate = new Date(eventDate);

        const newEvent = await eventSchema.create({ eventName, eventDescription, eventType, eventDate : formattedDate, eventTime });
        resp.status(200).json({
            success : true,
            message : "Event Created Successfully",
            Event : newEvent,
        })

    }
    catch(error){
        resp.status(500).json({
            success : false,
            message : "Internal Server Error",
        })
    }
}