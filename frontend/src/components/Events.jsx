import { useEffect, useState } from "react";
import io from "socket.io-client";

import { toast } from "react-toastify";

const socket = io("http://localhost:3600");

function Events(){

    const [data, setData] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [category, setCategory] = useState("All");
    const [dateFilter, setDateFilter] = useState("");
    const [userId, setUserId] = useState(localStorage.getItem("User") || null);

    useEffect(() => {
        async function getUserId(){
            try{
                const response = await fetch("http://localhost:3600/base/getUser");
                const user = await response.json();

                if(user && user._id){
                    localStorage.setItem("userId", user._id);  
                    setUserId(user._id);
                } 
                
                else{
                    localStorage.removeItem("userId"); 
                    setUserId(null);
                }

            } 
            
            catch(error){
                console.error("Error fetching user ID:", error);
            }

        }

        async function getData(){

            try{
                const response = await fetch("http://localhost:3600/base/getEvents");
                const output = await response.json();
                setData(output.Events);
            } 
            
            catch(error){
                console.error(error);
            }
        }

        if(!userId){
            getUserId();
        }

        getData();

        socket.on("updateAttendees", (updatedEvents) => {
            setData(updatedEvents);
        });

        return () => {socket.off("updateAttendees")};

    }, [userId]);

    useEffect(() => {

        let filtered = data;
        
        if (category !== "All") 
            filtered = filtered.filter(event => event.eventType === category)
        
        if(dateFilter){
            filtered = filtered.filter(event => 
                new Date(event.eventDate).toISOString().split("T")[0] === dateFilter
            );
        }

        setFilteredEvents(filtered);

    }, [category, dateFilter, data]);

    const handleRegister = async (eventId) => {
        
        if(!userId || typeof userId !== "string"){
            // alert("Please log in to register.");
            toast.into("Please log in to register.");
            return;
        }

        console.log("Registering user with ID:", userId); 

        try{

            const response = await fetch(`http://localhost:3600/base/registerAttendee/${eventId}`, {
                method : "POST",
                headers : { "Content-Type": "application/json" },
                body : JSON.stringify({ userId }) 
            });

            const result = await response.json();

            if(result.error){
                toast.info("Already Registered!, Please refresh the page");
            } 
            
            else{
                toast.success("Registration successful!");
            }

        } 
        
        catch(error){
            console.error("Error registering attendee:", error);
        }

    };

    return (
        <>
            <br />
            <div className="Events">
                
                <div>
                    <label className="label">Category : </label>
                    <select className="label" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="All">All</option>
                        <option value="Conference">Conference</option>
                        <option value="Workshop">Workshop</option>
                        <option value="Meetup">Meetup</option>
                    </select>
                </div>

                <div>
                    <label className="label">Date :  </label>
                    <input className="label" type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
                </div>

            </div>

            <br />

            <div className="allEvents">
                {filteredEvents.map(event => (
                    <div key={event._id} className="upcomingEvents">
                        <h2 className="eventItems">{event.eventName}</h2>
                        <h3 className="eventItems">{event.eventDescription}</h3>
                        <p className="eventItems">{new Date(event.eventDate).toLocaleDateString()}</p>
                        <p className="eventItems">{event.eventTime}</p>
                        <p className="eventItems">Attendees : {event.registeredUsers?.length || 0}</p>
                        <button className="registerButton"
                            onClick={() => handleRegister(event._id)} 
                            disabled={event.registeredUsers.includes(userId)}
                        >
                            {event.registeredUsers?.includes(userId) ? "Registered" : "Register"}
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
}
export default Events;