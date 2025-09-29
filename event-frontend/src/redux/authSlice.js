import { createSlice } from "@reduxjs/toolkit";

     const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

const authSlice = createSlice({
   name: "userAuth",
   initialState: {
    userInfo: userInfoFromStorage
   },
   reducers:{
    loginSuccess: (state, action)=>{
        state.userInfo = action.payload;
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state, action)=>{
        state.userInfo = null;
        localStorage.removeItem("userInfo");
    }
   }
})

export const {loginSuccess, logout} = authSlice.actions;
export default authSlice.reducer;