import React, { Component } from "react";
import {connect} from 'react-redux';
import { NavLink } from "react-router-dom";
class Footer extends Component {
  render() {
    return (
      <div className="bg-dark   justify-content-center">
        <div className="container">
          <div className="row text-white">
            <div className="col-12  text-white ml-4 mb-2">social media</div>
            <div className="col-4">
              <a
                className="btn btn-social-icon ml-1 btn-google "
                href="http://google.com/+"
              >
                <i className="fa fa-google-plus" />
              </a>
              <a
                className="btn btn-social-icon ml-1 btn-github "
                href="http://google.com/+"
              >
                <i className="fa fa-github" />
              </a>

              <a
                className="btn btn-social-icon ml-1 btn-facebook"
                href="http://www.facebook.com/profile.php?id="
              >
                <i className="fa fa-facebook" />
              </a>
              <a
                className="btn btn-social-icon ml-1 btn-linkedin"
                href="http://www.linkedin.com/in/"
              >
                <i className="fa fa-linkedin" />
              </a>
            </div>
            <div className="col-4">
              <address className="text-white">
               
                <i className="fa fa-phone fa-lg" />:010 2730 4419
                <br />
                <i className="fa fa-fax fa-lg" /> :+ 852 8765 4321
                <br />
                <i className="fa fa-envelope fa-lg" /> : 
                <a href="mailto:confusion@food.net" > controliot@gmail.com</a>
              </address>
            </div>
            <div className="col-3">
         
            <ul className="list-unstyled text-white">
              <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
             { !this.props.isAuth && (<div> <li><NavLink to="./login">login</NavLink></li>
              <li><NavLink to="/sign">signup</NavLink></li></div>)
              }
              { this.props.isAuth && (<div> <li><NavLink to="./doc">doc</NavLink></li></div>)
              }
            </ul>
            </div>
            <span className="glyphicon glyphicon-phone-alt" aria-hidden="true"></span>

            <div className="row text-center align-items-end text-white">
              © 2018 Company, Inc. programming by Moatasem Hussien
              ·Privacy·Terms
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const  mapStateToProps=(state)=>{
  console.log(state);
  return{
    isAuth:state.auth.isAuthenticated
  }
}
export default connect(mapStateToProps)(Footer);
