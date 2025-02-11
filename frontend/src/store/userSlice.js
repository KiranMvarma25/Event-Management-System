import { createSlice } from "@reduxjs/toolkit";

let initialUserData = null;
const storedUserId = localStorage.getItem("userId");

try{
    initialUserData = storedUserId;
} 

catch(error){
    console.log("Error parsing user data:", error);
    initialUserData = null;
}

const userSlice = createSlice({

  name:  "user",

  initialState : {
    userStatus : !!initialUserData,  
    userId : initialUserData,
  },

  reducers : {

    login : (state, action) => {
      state.userStatus = true;
      state.userId = action.payload;
      localStorage.setItem("userId", action.payload);  
    },

    logout : (state) => {
      state.userStatus = false;
      state.userId = null;
      localStorage.removeItem("userId");
      localStorage.removeItem("User");
      localStorage.removeItem("Token");
      localStorage.removeItem("Email");
    },

  },

});

export default userSlice.reducer;
export const { login, logout } = userSlice.actions;