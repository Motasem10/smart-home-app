import React, { Component } from 'react';

import {Route,BrowserRouter} from'react-router-dom'
import {Provider} from "react-redux"

//immport toastify
import {ToastContainer} from 'react-toastify'  
import 'react-toastify/dist/ReactToastify.css'

import Footer from './compnant/layout/footer';
import Navbar from './compnant/layout/navbar';
import Login from './compnant/layout/login';
import Register from './compnant/layout/register';



import store from './store';


import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import {setCurrentUser} from './actions/authAction'
import Profile from './compnant/layout/profile';
import {logoutUser} from './actions/authAction'
import {clearCurrentProfile} from './actions/profileActions'
import Content from './compnant/layout/content';
import AddDevice from './compnant/layout/profile/addDevice';
import Cover from './compnant/layout/cover';
import Forget from './compnant/layout/forgetpassword';
import ActivateAccount from './compnant/layout/activeAccount';
import Docs from './compnant/layout/profile/docs';
import io from 'socket.io-client';
// const socket=io('http://localhost:3000');
// setInterval(()=>
// socket.emit('hellow',{d:'from client side'})
// ,5000);  
// socket.on('connect',()=>{
//   alert('connected');
// })     
//check for token 
if(localStorage.jwtToken){
//set auth token header auth
setAuthToken(localStorage.jwtToken)
//decode token and get user info 
const decode =jwt_decode(localStorage.jwtToken);
//set user  and isAuth...
store.dispatch(setCurrentUser(decode));
const currentTime=Date.now()/1000;
if(currentTime>decode.exp){

//logOut user
store.dispatch(logoutUser());
//clear current profile
store.dispatch(clearCurrentProfile());
//log out 
store.dispatch(logoutUser());
//reirect to login 
window.location.href='/login'


}

}



class App extends Component {
  style={
    width:'80%',
  margin:'auto',
  transition:'all 1s ease-out'
  }


  render() {
    return (
      <Provider  store={store}>
 
      <BrowserRouter>
    
      <div  className="App">
      <Navbar className= 'rotate'/>
  
      <Route exact path='/' component={Cover}/> 
      
      <div style={this.style} >
      <div className="row align-items-center justify-content-center">
      <Route exact path='/login' component={Login}/>
      
      <Route exact path='/profile' component={Profile}/>
      <Route exact path='/sign' component={Register}/>
      <Route exact path='/' component={Content}/>
      <Route exact path='/profile/adddevice' component={AddDevice}/>
     <Route exact path='/forgetpassword' component={Forget} />
     <Route exact path='/activeaccount' component={ActivateAccount}/>
     <Route exact path='/doc' id={store.getState().auth.user.id}  render={(props)=><Docs id={store.getState().auth.user.id }/> }/>

</div>
</div>
 <Route exact path='/' component={Footer}/> 
<ToastContainer autoClose={2000} />

      </div>

      </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
