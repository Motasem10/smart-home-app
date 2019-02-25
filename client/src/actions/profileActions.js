import {toast} from 'react-toastify'
import React from "react";
import {setCurrentUser} from './authAction'
import axios from "axios";
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken'
import {
  PROFILE_LOADING,
  GET_PROFILE,
  CLEAR_CURRENT_PROFILE
  
} from "./types";


export const getCurrentProfile2=() => dispatch => {

  //after loading ...
  axios
    .get("/profile")
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err =>
      
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};
export const getCurrentProfile = () => dispatch => {
  //whebn profile loading
  dispatch(setProfileLoading());
  //after loading ...
  axios
    .get("/profile")
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err =>
      
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  
  };
};
//section
export const addsection = (data) =>(dispatch)=> {
 
 
 
  return (
 
    
    axios.post("/profile/section",data)
    .then(res => {
      toast.info(<span className='glyphicon glyphicon-ok'>{'section has been added'}</span>); 
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err =>{
    toast.error(<span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true">
    {' '+err.response.data.s}</span>) 
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })})
    )}


//add device

export const addDevice = (data) =>(dispatch)=> {
  return (
    axios.post("/profile/device",data)
    .then(res => {
      toast.info(<span className='glyphicon glyphicon-ok'>{'device has been added'}</span>); 
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
      return true;
    })
    .catch(err =>{
  
    toast.error(<span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true">
    {' '+err.response.data[Object.keys(err.response.data)[0]]}</span>) 
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })})
    )}
export const editUser=(data)=>dispatch=>{

  axios.put('profile/editUser',data).then(res=>{
    const {token}=res.data
 let decode= jwt_decode(token)  
localStorage.setItem("jwtToken", token);
//set token to auth header
setAuthToken(token);
dispatch(setCurrentUser(decode));
console.log({decode})

  }).catch(err=>console.log({err}))
}