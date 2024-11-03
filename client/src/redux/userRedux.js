import { createSlice } from '@reduxjs/toolkit'

export const userSlice=createSlice({
    name:"user",
    initialState:{
        userInfo:JSON.parse(localStorage.getItem("user"))||null,
        isLoggedIn:false,
        isFetching:false,
        error:false
    },reducers:{
        loginStart:(state)=>{
            state.isFetching=true
        },
        loginSucess:(state,action)=>{
            state.userInfo=action.payload;
            state.isLoggedIn=true;
            state.isFetching=false
        },
        loginError:(state)=>{
            state.userInfo=null;
            state.isLoggedIn=false;
            state.error=false
            state.isFetching=false
        }
    }
})

export const {loginStart,loginError,loginSucess}=userSlice.actions;
export default userSlice.reducer;