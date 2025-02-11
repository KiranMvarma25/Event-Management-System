import { useDispatch } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../store/userSlice";

function Navbar(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleClick(){
        dispatch(logout());
        window.alert("Logged Out");
        navigate("/")
    }

    return (
        <>
            <div className="navbar">
                <Link to="events" className="navbarChild"><h2>Events</h2></Link>
                <Link to="createevent" className="navbarChild"><h2>Create Event</h2></Link>
                <Link to="attendeelist" className="navbarChild"><h2>Attendee List</h2></Link>
                <button onClick={handleClick} className="logoutButton">Log Out</button>
            </div>
            <Outlet />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
        </>
    )
}


export default Navbar;