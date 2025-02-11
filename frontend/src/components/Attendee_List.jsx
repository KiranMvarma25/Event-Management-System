import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("https://event-management-system-backend-dp0l.onrender.com");

function AttendeeList(){

    const [attendees, setAttendees] = useState([]);

    useEffect(() => {
        fetch("https://event-management-system-backend-dp0l.onrender.com/base/getAttendees")
            .then((res) => res.json())
            .then((data) => setAttendees(data))
            .catch((err) => console.error("Error fetching attendees:", err));

        socket.on("updateAttendeeList", (updatedList) => {
            setAttendees(updatedList);
        });

        return () => {socket.off("updateAttendeeList")};
    }, []);

    return (
        <>
            <div className="list">
                {attendees.length > 0 ? (
                    attendees.map((event) => (
                        <h2 key={event._id} className="listData">
                            <strong>{event.eventName}</strong> - {event.attendees} Attendees
                        </h2>
                    ))
                ) : (
                    <p>No attendees yet.</p>
                )}
            </div>
        </>
    );
}

export default AttendeeList;