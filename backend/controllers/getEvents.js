const userSchema = require('../schema/eventSchema');

exports.getEvents = async (req,resp) => {
    try{
        const events = await userSchema.find({});
        resp.status(200).json({
            success : true,
            msg : "Fetched Events Successfully",
            Events : events
        })
    }
    catch(err){
        resp.status(500).json({
            success : false,
            msg : "Internal Server Error"
        })
    }
}