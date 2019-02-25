import React, { Component } from "react";
import axios from 'axios';
import { toast } from "../../../node_modules/react-toastify";
import  {loginuser}from '../../actions/authAction';
import {connect} from 'react-redux'
import '../componentStyles/login.css'
import TextFieldGroup from '../common/textFieldGroub'
class Forget extends Component {
  state={
    email:'',
    errors:'',
    code:'',
    sendCode:false,
    password:'',
    password2:'',
  }
  handelcgange=(e)=>{

 this.setState({[e.target.name]:e.target.value})

}

//_______________________________________________________________
changePassword=async (e)=>{
e.preventDefault();
try{
  //edit password
await axios.post('/login/edit',{email:this.state.email,password:this.state.password,password2:this.state.password2,code:this.state.code});
await this.props.loginuser({email:this.state.email,password:this.state.password},this.props.history);
this.setState({email:'',errors :'',sendCode:true});
toast.success('email has been send')
}catch(err){
  console.log(err.response.data)
  this.setState({errors:err.response.data});
}
}
//___________________________________________________________________
 sendEmail=async (e)=>{
e.preventDefault();
try{
await axios.post('/login/forget',{email:this.state.email});
this.setState({errors :'',sendCode:true});
toast.success('email has been send')
}catch(err){
  this.setState({errors:err.response.data});
}
}
  render(){
  
    const content=this.state.sendCode? 
    <form className="form-signin" onSubmit={this.changePassword}>
    <TextFieldGroup errors={this.state.errors.code}   placeholder='confirm code '  value={this.state.code} type='number' onChange={this.handelcgange} name='code' />
    <TextFieldGroup errors={this.state.errors.password} type='password' name='password' value={this.state.password} onChange={this.handelcgange}  placeholder='password'/> 
    <TextFieldGroup errors={this.state.errors.password2} type='password' name='password2' value={this.state.password2} onChange={this.handelcgange}  placeholder='confirm password'/>  

    <button type="submit"  className="btn  btn-lg btn-primary btn-block">
change password    
    </button>
    <a href='/' onClick={this.sendEmail} className="txt2">
        send code again
         </a>     </form>
    : 
    <form className=" form-signin" onSubmit={this.sendEmail}>
    <TextFieldGroup errors={this.state.errors} type='email' name='email' value={this.state.email}  onChange={this.handelcgange}  placeholder='email'/> 
    <button type="submit"  className="btn btn-primary btn-lg btn-block">
    send code to email
    </button>
         </form>
    
    

return(

     <div className='containe-form' style={{marginTop:100}}>   
   {content}

    </div>
   
)
}
}

const mapStateToProps=(state)=>({
  auth :state.auth,
  errors:state.errors
  }) 


export default connect(mapStateToProps,{loginuser}) (Forget);