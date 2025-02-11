import { useState } from "react";

import { toast } from "react-toastify";

function CreateEvents(){

    const [data, setData] = useState({
        eventName : "",
        eventDescription : "",
        eventType : "",
        eventDate : "",
        eventTime : ""
    });

    const [loading, setLoading] = useState(false);

    function handleChange(e){
        const { name, value } = e.target;
        setData(prevState => ({
            ...prevState,
            [name] : value
        }));
    }

    async function handleSubmit(e){

        e.preventDefault();
        setLoading(true);

        try{
            const response = await fetch("https://event-management-system-backend-dp0l.onrender.com/base/createEvent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...data, attendees: 0 })
            });

            const result = await response.json();

            if(result.success){
                console.log("Event Created:", result);
                toast.success("Event Created Successfully");
                setData({
                    eventName : "",
                    eventDescription : "",
                    eventType : "",
                    eventDate : "",
                    eventTime : ""
                });
            }
        }
        
        catch(error){
            console.error("Error creating event:", error);
            toast.error("Error in Creating the Event");
        }

        setLoading(false);
    }

    return (
        <>
            <form className="createEventForm" onSubmit={handleSubmit}>
                <label className="createEventFormLabel">Event Name</label>
                <br />
                <input className="createEventFormInput" type="text" value={data.eventName} name="eventName" onChange={handleChange} required />
                <br />
                <br />
                <label className="createEventFormLabel">Event Description</label>
                <br />
                <input className="createEventFormInput" type="text" value={data.eventDescription} name="eventDescription" onChange={handleChange} required />
                <br />
                <br />

                <label className="createEventFormLabel">Event Type </label>
                <select className="label" value={data.eventType} name="eventType" onChange={handleChange} required>
                    <option value="">Select Type</option>
                    <option value="Conference">Conference</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Meetup">Meetup</option>
                </select>
                
                <br />
                <br />
                <label className="createEventFormLabel">Event Date</label>
                <br />
                <input className="createEventFormInput" type="date" value={data.eventDate} name="eventDate" onChange={handleChange} required />
                <br />
                <br />
                <label className="createEventFormLabel">Event Time</label>
                <br />
                <input className="createEventFormInput" type="time" value={data.eventTime} name="eventTime" onChange={handleChange} required />
                <br />
                <br />
                <button className="createEventFormButton" type="submit" disabled={loading}>{loading ? "Creating" : "Create Event"}</button>
            </form>
        </>
    );
}

export default CreateEvents;