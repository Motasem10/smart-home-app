import React, { Component } from "react";
import { connect } from "react-redux";
import {editUser}from '../../actions/profileActions'
import jwt_decode from "jwt-decode";
class Edit extends Component {
 constructor(props){
   super(props);
  this.state = {
    nowEdit:'',
    name:'',
    email: '',
    phone: '',
  };
this.change=  this.change.bind(this)
 }
 componentDidMount=()=>{
   this.setState({name:this.props.name,phone:this.props.email})
 }
  change = e => {
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value });
 
  };
  button = e => {

    console.log('now edit ',this.state)
    if (this.state.nowEdit === e.target.name) {
      this.setState({ nowEdit: "" });
      this.props.editUser({ [e.target.name]:this.state[e.target.name]  })
    } else {
      this.setState({ nowEdit: e.target.name });
      this.setState({ [e.target.name]:this.state[e.target.name]  });
     
    }
  };
  Tr=(label,value,nowEdit)=>{

   return (
         <tr>
        <td>{label}</td>
        <td>
          <p
            style={{
              display:
                nowEdit !==label ? "inline-block" : "none"
            }}
          >
            {value}
          </p>
          <input
            name={label}
            type="text"

            style={{
              display:
                nowEdit === label ?"inline-block":"none",
              border: "1px #81bde0 solid"
            }}
            onChange={this.change}
            value={this.state[label]}
          />
        </td>
        <td>
     { label==='email' ||    <button
            name={label}
            className="btn btn-primary"
          onClick={e =>this.button(e)}
          >
            {nowEdit === label ? "save" : "edit"}
          </button>
     }
        </td>
      </tr>
     )}

  render() {
console.log('rendr',this.state)
    return (  
        <table className="table">
          <tbody>
    {this.Tr('name',this.props.name,this.state.nowEdit)}
    {this.Tr('email',this.props.email,this.state.nowEdit)}
    {this.Tr('phone',this.props.phone,this.state.nowEdit)}
    </tbody>
        </table>
      
    ); 
  } 
}

const mapStateToProps = state => ({
  name:state.auth.user.name,
  email:state.auth.user.email,
  phone:state.auth.user.phone,
   errors: state.errors
});
export default connect(mapStateToProps,{editUser})(Edit);
