import React, { Component } from "react";
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {registeruser,loginuser} from '../../actions/authAction'
import {withRouter} from 'react-router-dom'
import TextFielGroub from "../common/textFieldGroub";
import '../componentStyles/login.css'
class Register extends Component {
    constructor(){
super();
this.state={
    name :'',
    email:'',
    password:'',
    password2:'',
    phone:'',
    errors:''
   
}

}


//redirect when user try to access
componentDidMount(){
  if(this.props.auth.isAuthenticated){
    console.log('go to profile')
    this.props.history.push('/profile')
  }
}

componentWillReceiveProps(nextProps){
  if(nextProps.errors){
    this.setState({errors:nextProps.errors})
  

}}

     onChange=(e) =>{
      // console.log(this.props)
       this.setState({ [e.target.name]:e.target.value });
       this.setState({errors:''})
    }

    //on submit 
onSubmit=(e)=>{
    e.preventDefault();
   let  newUser={
        name :this.state.name,
        email:this.state.email,
        password:this.state.password,
        password2:this.state.password2,
        phone:this.state.phone

    }
 //pass data to store in redux 
   this.props.registeruser(newUser,this.props.history).then(s=>{
  this.props.loginuser(s,this.props.history);
  });

  }


    
  render() {
    const {errors}=this.props;
    const {user}=this.props.auth;
    return (
    
     
  

      <div style={{marginTop:'100px'}} className='container row align-items-center justify-content-center'>   
      <form className=" inputHover col-md-6 justify-content-center align-items-center" onSubmit={this.onSubmit}>
      <h2>Login</h2>
      <TextFielGroub
          type="text"
      
          placeholder="name"
          name="name"
          value={this.state.name}
          onChange={this.onChange}
          errors ={errors&&errors.name}
        />
        
        
        <TextFielGroub
        
          placeholder="E-mail"
          type="email"
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          errors ={errors&&errors.email}
 
        />
           <TextFielGroub
        
        placeholder="Phone"
        type="phone"
        name="phone"
        value={this.state.phone}
        onChange={this.onChange}
        errors ={errors&&errors.phone}

      />
        <TextFielGroub
          type="password"
      
          placeholder="Password"
          name="password"
          value={this.state.password}
          onChange={this.onChange}
          errors ={errors&&errors.password}
        />
           <TextFielGroub
          type="password"
      
          placeholder="Password"
          name="password2"
          value={this.state.password2}
          onChange={this.onChange}
          errors ={errors&&errors.password2}
        />
     
        <button type="submit" style={{backgroundColor:'#2774a2',color:'white'}} className="btn btn-lg btn-block">
        <span >  SignUP <i name='check' className='fa  fa-user'></i></span>
        
        </button>
       
      </form>
      
 </div>
 
 
     );
    
    
  }
}

Register.propTypes={
  registeruser :PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  errors:PropTypes.object.isRequired
}
//mapstatrToProps acces compine reducer => state.Elelment_in_combinereduce
const mapStateToProps=(state)=>({
  auth :state.auth,
  errors :state.errors
})
export default connect(mapStateToProps, { registeruser ,loginuser})(withRouter(Register) );
