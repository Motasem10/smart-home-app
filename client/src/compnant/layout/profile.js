import React, { Component } from "react";
import { connect } from "react-redux";
import LodingImg from "../common/loading";
import { getCurrentProfile } from "../../actions/profileActions";
import AddDevice from "./profile/addDevice";
import Control from "./profile/control";
import Code from "./profile/docs";
import Edit from "./edit";
const Li = ({ text, name, onClick }) => (
  <li className="nav-item" role="presentation" onClick={onClick}>
    <a
      className="nav-link"
      name={name}
      aria-expanded="true"
      aria-controls={name}
      role="tab"
      id={name}
      data-toggle="tab"
    >
      {text}
    </a>
  </li>
);
class Profile extends Component {
  state = {
    control: "tab-pane active",
    doc: "tab-pane ",
    add: "tab-pane ",
    edit: "tab-pane",
    newDevice: "",
    devices: []
  };

  //when ask the page do it
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  handelActiveTap = e => {
    //reset tabs
    this.setState({
      control: "tab-pane ",
      doc: "tab-pane ",
      add: "tab-pane ",
      edit: "tab-pane"
    });
    this.setState({ [e.target.name]: "tab-pane active" });
  };

  render() {
    const { name } = this.props.auth.user;
    const { loading, profile } = this.props.profile;
    //if user not authanitcated =>redirect to login
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("./login");
    } //________________________________________
    //___________________________________
    let content;
    if (loading || profile === null) {
      content = <LodingImg />;
    } else {
      content = (
        <Control
          newDevice={this.state.newDevice}
          //  updateprofile={()=>this.props.getCurrentProfile()}
          sections={this.props.profile.profile.section}
        />
      );
    }

    return (
      <div className="container">
        <h1 style={{ transition: "0.5s" }} className="row">
          Hello {name}
        </h1>
        <div className="row container">
          <ul className="nav nav-tabs  " role="tablist">
            <Li text="control" name="control" onClick={this.handelActiveTap} />
            <Li text="add decice" name="add" onClick={this.handelActiveTap} />
            <Li text="edit" name="edit" onClick={this.handelActiveTap} />
          </ul>
        </div>

        <div>
          {/*if profile loaded*/}
          {this.props.profile.profile ? (
            <div>
              <div className="tab-content">
                <div
                  role="tabpanel"
                  className={this.state.control}
                  id="control"
                >
                  {content}
                </div>

                <div role="tabpanel" className={this.state.add} id="add">
                  <AddDevice />{" "}
                </div>

                <div role="tabpanel" className={this.state.doc} id="doc">
                  <Code id={this.props.auth.user.id} />
                </div>
                <div role="tabpanel" className={this.state.edit} id="edit">
                  <Edit id={this.props.auth.user.id} />
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
//_______________________________________________________

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});
export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Profile);

// return (
//   <div>
//     <h1 style={{ transition: "0.5s" }} className="slide">
//       Hello {name}
//     </h1>
//     <div>
//       <ul className="nav nav-tabs flex-column " role="tablist">
//         <li
//           role="presentation"
//           className="nav-item"
//           onClick={this.handelActiveTap}
//         >
//           <a
//             name="control"
//             className='nav-link'
//             aria-expanded="true"
//             aria-controls="control"
//             role="tab"
//             id="control"
//             data-toggle="tab"
//           >
//             Control
//           </a>
//         </li>

//         <li role="presentation" className='nav-item' onClick={this.handelActiveTap}>
//           <a
//             name="add"
//             className='nav-link'
//             aria-controls="profile"
//             role="tab"
//             data-toggle="tab"
//           >
//             Add device
//           </a>
//         </li>

//         <li role="presentation" className='nav-item' onClick={this.handelActiveTap}>
//           <a
//           className='nav-link'
//             name="doc"
//             aria-controls="doc"
//             role="tab"
//             data-toggle="tab"
//           >
//             doc
//           </a>
//         </li>
//         <li style={{float:'right',marginRight:'0'}} className='nav-item' role="presentation" onClick={this.handelActiveTap}>
//           <a
//           className='nav-link'
//           style={{marginRight:'0'}}
//             name="edit"
//             aria-controls="edit"
//             role="tab"
//             data-toggle="tab"
//           >
//             edit
//           </a>
//         </li>
//       </ul>

//     </div>

//     <div>
//       {/*if profile loaded*/}
//       {this.props.profile.profile ? (
//         <div>
//           <div className="tab-content">
//             <div role="tabpanel" className={this.state.control} id="control">
//               {content}
//             </div>

//             <div role="tabpanel" className={this.state.add} id="profile">
//               <AddDevice />{" "}
//             </div>

//             <div role="tabpanel" className={this.state.doc} id="doc">
//               <Code id={this.props.auth.user.id} />
//             </div>
//              <div role="tabpanel" className={this.state.edit} id="edit">
//               <Edit id={this.props.auth.user.id} />
//             </div>
//           </div>
//         </div>
//       ) : (
//         ""
//       )}
//     </div>
//   </div>
// );
