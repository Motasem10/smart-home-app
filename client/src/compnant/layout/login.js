import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { loginuser } from "../../actions/authAction";
import TextFielGroub from "../common/textFieldGroub";
import "../componentStyles/login.css";
//import { disconnect } from "cluster";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/profile");
    }
  }
  onChange(e) {
    this.setState({ errors: "" });
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    let User = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginuser(User, this.props.history);
  }
  componentWillReceiveProps(next) {
    if (next.auth.isAuthenticated) {
      // this.props.history.push('/');
    }
    if (next.errors) {
    }
  }

  render() {
    // console.log({errors:this.props})
    const errors = this.props.errors.data ? this.props.errors.data : null;
    console.log(this.props.errors);

    return (
      <div className="container row center justify-content-center">
        <form
          className="inputHover col-md-6  form-signin"
          onSubmit={this.onSubmit}
        >
          <h2>Login </h2>
          <TextFielGroub
            placeholder="E-mail"
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            errors={errors && errors.email}
          />
          <TextFielGroub
            type="password"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
            errors={errors && errors.password}
          />

          <button
            type="submit"
            style={{ backgroundColor: "#2774a2", color: "white" }}
            className="btn btn-lg btn-block"
          >
            <span>
              {" "}
              Login <i name="check" className="fa  fa-sign-in" />
            </span>
          </button>
          <div style={{ color: "#3F51B5" }} className="success">
            <NavLink to="/forgetpassword" className="text-dark">
              forget password?
            </NavLink>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  loginuser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginuser }
)(Login);
//cluster
