import { createSlice } from "@reduxjs/toolkit";
// import { dummyUser } from "../assets";

const initialState = {
    user: JSON.parse(window?.localStorage.getItem('user')) ,
    edit: false

/* We have a EditProfile component so the edit state determines whether the modal should be open or not. When the edit button is clicked in ProfileCard.jsx edit is set to true and Modal gets opened and after updating the profile, in Editprofile.js, this edit is again set as False determining the Modal to get Closed */

};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, action){
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        logout(state){
            state.user = null;
            localStorage.removeItem('user');
        },
        updateProfile(state, action){
            state.edit = action.payload;
        }
    }
})

export default userSlice.reducer;

export function userLogin(user){
    return(dispatch, getState) => {
        dispatch(userSlice.actions.login(user));
    }
}
export function Logout(){
    return(dispatch, getState) => {
        dispatch(userSlice.actions.logout());
    }
}
export function UpdateProfile(val){
    return(dispatch, getState) => {
        dispatch(userSlice.actions.updateProfile(val));
    }
}