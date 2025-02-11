import Login from "./components_users/Login";
import Signup from "./components_users/Signup";

import { useNavigate } from "react-router-dom";

function App(){

  const navigate = useNavigate();

  return (
    <>
      <div className="signuplogin">
        <Signup />
        <button className="formButton" onClick={() => navigate('/navbar')}>Guest</button>
        <Login />
      </div>
    </>
  )
}


export default App;