import React, { Component } from "react";
import axios from "axios";
import {connect} from 'react-redux'

class ActivateAccount extends Component {
  state = {
    code: "",
    err:'',
    isAcitve:false
  };
  componentWillUnmount=()=>{
  !this.state.isAcitve &&this.props.isAuth && this.props.history.push('activeaccount');
    console.log('componentWillUnmount',this.props);
  }



  handelChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  activeateAccount = e => {
    e.preventDefault();
    axios.post("/profile/code", { code: this.state.code }).then(s => {
      this.setState({isAcitve:true})
      console.log({s});
      this.props.history.push("/profile");
    }).catch(err=>{
      console.log({err});
      this.setState({err:err.response.data})});
  };
  render() {
    return (
      <div className="col-md-6" style={{marginTop:'100px'}}>
                                  
            <form className="input-group"  onSubmit={this.activeateAccount}>
              <input
                type="number"
                value={this.state.code}
                onChange={this.handelChange}
                className=" form-control"
                name="code"
                placeholder="code"
              />
                 {this.state.err &&(<div className="invalid-feedback mb-2">{this.state.err}</div>)}
              <button
                type="submit"
                className="btn  btn-lg btn-primary btn-block"
              >
  
                submit
              </button>
              <div className="container-fluid alert alert-info" role="alert">
              <h5>code has been sent to your email </h5>
</div>
              
            </form>
          </div>
     
    );
  }
}
const mapStateToProps=(state)=>{
return{ isAuth:state.auth.isAuthenticated
}}
export default connect(mapStateToProps)(ActivateAccount);
