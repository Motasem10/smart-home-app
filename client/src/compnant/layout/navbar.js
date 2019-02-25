import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../componentStyles/navbar.css";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authAction";
import { clearCurrentProfile } from "../../actions/profileActions";
const My = ({ to, label, icon, onClick }) => (
  <li className="nav-item active hvr-grow">
    <NavLink to={to} onClick={onClick} className="nav-link">
      <i name="check" className={`fa  fa-${icon}`} /> {label}
    </NavLink>
  </li>
);

//___________________________________________________________________________

class Navbar extends Component {
  state = {
    dropdown: "false"
  };
  handelDropMenuBack = () => {
    console.log(this.state.dropdown);
    //if drop down menu opened
    if (this.state.dropdown) {
      document.getElementById("dropmenue").click();
      this.setState({ dropdown: false });
    }
  };
  onLogOutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    //auth links
    const authLinks = (
      
      <ul className="nav navbar-nav ml-auto">
        {/* <img  className=' rounded-circle'  src={user.avatar} alt={user.name} title='no avatar' 
            style={{width:'25px',marginRight:'5px'}} />
          } */}
           <My to='./doc' label='doc' icon='book'></My>
        <My
          onClick={this.onLogOutClick.bind(this)}
          to="./"
          label="log out "
          icon="sign-out"
        />
       
      </ul>
    );
    //giust links

    const guestLinks = (
      <ul className="nav navbar-nav ml-auto">
        <My to="/login" label="Login" icon="sign-in" />
        <My to="/sign" label="Sign up" icon="user" />
      </ul>
    );
    return (
      <div>
        <nav className="navbar  navbar-dark navbar-expand-sm   navbar-fixed-top">
          <a className="navbar-brand text-white">SMART CONTROL</a>
          <button
            onClick={e => {
              this.setState({ dropdown: true });
              console.log(this.state.dropdown);
            }}
            type="button"
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#NavbarElement"
            id="dropmenue"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div
            className="collapse navbar-collapse"
            onClick={this.handelDropMenuBack}
            id="NavbarElement"
          >
            <div>
              <ul className="nav navbar-nav">
                <My to="/" label="Home" icon="home" />
                {isAuthenticated && (
                  <My
                    icon="universal-access"
                    to="/profile"
                    label="My Profile"
                  />
                )}
              </ul>
            </div>

            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(Navbar);
