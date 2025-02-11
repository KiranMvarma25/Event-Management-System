import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/userSlice"; 

function Login() {

  const [data, setData] = useState({ 
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
      const response = await fetch("http://localhost:3600/base/login", {
        method : "POST",
        headers : { "Content-Type": "application/json" },
        // credentials: "include",
        body : JSON.stringify(data),
      });

      const result = await response.json();

      if(result.success){
        console.log(result);

        localStorage.setItem("User", result.User.id); 
        localStorage.setItem("Email", result.User.email);
        localStorage.setItem("Token", result.Token);

        dispatch(login(result.User));

        navigate("/navbar");
      } 
      
      else{
        alert(result.message);
      }
    } 
    
    catch(error){
      console.log("Login Error:", error);
    }

  }

  return (
    <form onSubmit={handleSubmit} className="forms">
      <label htmlFor="email" className="formLabel">Email</label>
      <br />
      <input className="formInput"
        type="text"
        value={data.email}
        name="email"
        placeholder="Enter your Email"
        onChange={handleChange}
        required
      />

      <br />
      <br />

      <label htmlFor="password" className="formLabel">Password</label>
      <br />
      <input className="formInput"
        type="password"
        value={data.password}
        name="password"
        placeholder="Enter your Password"
        onChange={handleChange}
        required
      />

      <br />
      <br />

      <button className="formButton" type="submit">Log In</button>
    </form>
  );
}

export default Login;