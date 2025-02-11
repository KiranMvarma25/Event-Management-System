import { useNavigate } from "react-router-dom";

function Logout(){

    const navigate = useNavigate();

    function handleClick(){
        localStorage.removeItem("User", result.siggnedUpUser._id); 
        localStorage.removeItem("Email", result.siggnedUpUser.email);
        navigate('/');
    }

    return (
        <>
            <button onClick={handleClick}>Log Out</button>
        </>
    )
}


export default Logout;