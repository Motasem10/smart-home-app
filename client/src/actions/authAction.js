//register user
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import axios from "axios";
import { toast } from "react-toastify";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { clearCurrentProfile } from "./profileActions";
export const registeruser = (userData, history) => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .post("/register", userData)
      .then(user => {
        toast.success("signed up seccsefully");
        console.log(userData);
      resolve(userData);
      })
      .catch(err => {
    
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      });
  });
};

//LOGIN- get user Token

export const loginuser = (userData, history) => dispatch => {
  console.log("SSSSSSSSSSSSSSSSSSASSAD,ASDLS,SAL,D");
  axios
    .post("/login", userData)
    .then(res => {
      const { token } = res.data;
      //set token to ls
      localStorage.setItem("jwtToken", token);
      //set token to auth header
      setAuthToken(token);
      // decode token to get user data

      const decode = jwt_decode(token);
      //set current user

      dispatch(setCurrentUser(decode));
      //clear errrors
      dispatch({
        type: GET_ERRORS,
        payload: "cleared"
      });
      //if account not activated
      if (!res.data.isActive) {
        history.push("/activeaccount");
      } else {
        history.push("/");
      }

      //_____errors cleared
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

//set logged user

export const setCurrentUser = decode => {
  return {
    type: SET_CURRENT_USER,
    payload: decode
  };
};

//log user aut
export const logoutUser = () => dispatch => {
  //remove token from local storge
  localStorage.removeItem("jwtToken");
  //remove auth heder from future req
  setAuthToken(false);
  //set current user to {} which will set isAuthenticated =false
  dispatch(setCurrentUser({}));
  clearCurrentProfile();
};
