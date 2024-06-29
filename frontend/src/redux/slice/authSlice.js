import { createSlice } from "@reduxjs/toolkit";

//initial state 
const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:JSON.parse(localStorage.getItem("userInfo")) || null
    },
    reducers:{
        loginAction:(state , action)=>{
        state.user = action.payload;
        },
        logoutAction :(state , action )=>{
           state.user = null;
        }
    }
});

//generate actions 
export const {loginAction , logoutAction} = authSlice.actions;

//generate the reducers 
const authreducer = authSlice.reducer;
export default authreducer;
