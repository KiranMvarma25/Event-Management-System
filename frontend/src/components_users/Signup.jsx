import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/userSlice"; 

function Signup() {
  const [data, setData] = useState({ 
     name : "",
     email : "", 
     password : "" 
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleChange(e){
    const { name, value } = e.target;
    setData(prev => ({ 
      ...prev, 
      [name] : value 
    }));
  }

  async function handleSubmit(e){

    e.preventDefault();

    try{
      const response = await fetch("http://localhost:3600/base/signup", {
        method : "POST",
        headers : { "Content-Type": "application/json" },
        // credentials: "include",
        body : JSON.stringify(data),
      });

      const result = await response.json();

      if(result.success){
        console.log(result);

        localStorage.setItem("User", result.siggnedUpUser._id);
        localStorage.setItem("Email", result.siggnedUpUser.email);
 
        dispatch(login(result.User));

        navigate("/navbar");
      } 
      
      else{
        alert(result.message);
      }
    } 
    
    catch(error){
      console.log("Signup Error:", error);
    }

  }

  return (
    <form onSubmit={handleSubmit} className="forms">
      <label htmlFor="name" className="formLabel">Name</label>
      <br />
      <input className="formInput"
        type="text"
        name="name"
        value={data.name}
        placeholder="Enter your Name"
        required
        onChange={handleChange}
      />

      <br />
      <br />

      <label htmlFor="email" className="formLabel">Email</label>
      <br />
      <input className="formInput"
        type="text"
        name="email"
        value={data.email}
        placeholder="Enter your Email"
        required
        onChange={handleChange}
      />

      <br />
      <br />

      <label htmlFor="password" className="formLabel">Password</label>
      <br />
      <input className="formInput"
        type="password"
        name="password"
        value={data.password}
        placeholder="Enter your Password"
        required
        onChange={handleChange}
      />

      <br />
      <br />

      <button className="formButton" type="submit">Sign Up</button>
    </form>
  );
}

export default Signup;