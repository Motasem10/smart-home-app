import React, { Component } from "react";
import PropTypes from 'prop-types' 
import { connect } from "react-redux";
import { getCurrentProfile,addsection ,addDevice} from "../../../actions/profileActions";
//import {update user} from '../../../actions/authAction'
//import  '../../componentStyles/addDevice.css'
const styles={
  card:{
    margin:'10px',
    border:'1px solid rgb(197, 231, 251)',
    boxShadow: '0 0 15px black'
  },
  btn: {
    color: 'white',
    backgroundColor: '#2774a2',
    borderColor:' #17a2b8',
  }
}
class AddDevice extends Component {
  state = {
    Dname: "",
    pin: "" + 1,
    icon: "",
    sectionName: "",
    sections:this.props.profile.profile.section?this.props.profile.profile.section:''

  };

  style = {
    maxWidth: ".length330px",
    padding: "15px",
    margin: "0 auto"
  };
  icons = [
    "flaticon-018-lamps",
    "flaticon-009-fan",
    "flaticon-008-tv",
    "flaticon-020-microwave",
    "flaticon-031-television",
    "flaticon-017-kettle",
    "flaticon-005-coffee-machine",
    "flaticon-024-plug",
    "flaticon-034-washing-machine",
    "glyphicon glyphicon-heart"
  ];
  //___________________________________________________
  handelSubmit = e => {
    
    e.preventDefault();
    this.props.addDevice(this.state).then(()=>{
     //do action 
      this.props.getCurrentProfile();
      //clear fields
      this.setState({Dname:'',sectionName:''})
    
    
    });
    

  };
  //_____________________________________________
  onChangee = e => {
    console.log(e.target.name+''+e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  addNewSection = e => {
    e.preventDefault();
    console.log(this.props);
  //   if(!this.props.auth.user.isActive){
  //  //window.location.replace('/activeaccount')
  //   }else
  {
   this.props.addsection({ sectionName: this.state.sectionName }
  ).then(s=>{
  console.log('oop');
  this.props.getCurrentProfile();
  //close section pane
  document.getElementById("panel1").click();
  //open add device panel
  document.getElementById("panel2").click();
  //clear input from form field
  this.setState({sectionName:''})
  
  
})
}};

  render() {
    //choose section name -  select -opton
                  //if no section
    let sections = this.props.profile.profile.section===undefined
                     ||this.props.profile.profile.section.length<=0?
     <option disabled key={Math.random()}>there are no section</option>
      //display section
      : this.props.profile.profile.section.map(section => {
          return (
            <option key={Math.random()}  >
              {section.sectionName}
            </option>
          );
        });

    //choose device icon

    let icon = this.icons.map(e => {
      return <i key={e} className={e} />;
    });
    return (
      <div>
        <br />

        {/*add section*/}

        <div className="card" style={styles.card}>
          <div className="card-header alert-primary"  href="#section" data-toggle="collapse">
          addNewSection
            <a style={{float:'right'}} id='panel1' href="#section" data-toggle="collapse">
          <span className="fa fa-chevron-down hvr-wobble-vertical"></span>
            </a>
          </div>

          <div id="section"  className="card-body collapse" >
            <form>
              <div className="form-group">
                <label>section Name:</label>
                <input
                  type="text"
                  onChange={this.onChangee}
                  name="sectionName"
                  className="form-control"
                  value={this.state.sectionName}
                  placeholder="section name"
                />
              </div>
              <button className='btn  btn-block' style={styles.btn}  onClick={this.addNewSection}>save </button>
            </form>
          </div>
        </div>
{/*===========================================================*/}
      
      <div className="card" style={styles.card}>
          <div className="card-header alert-primary"  href="#addDevice" data-toggle="collapse">
  add Device
  <a style={{float:'right'}} id='panel2' href="#addDevice" data-toggle="collapse">
       <span  className="fa fa-chevron-down hvr-wobble-vertical"></span>
</a>
            </div>
          <div  id="addDevice" className="card-body">
            <form >
              <div className="form-group">
                <label>Device Name:</label>
                <input
                  type="email"
                  onChange={this.onChangee}
                  value={this.state.Dname}
                  className="form-control"
                  name="Dname"
                  placeholder="Device Name"
                />
              </div>
              <div className="form-group">
                <label>pin Number:</label>
                <input
                  type="number"
                  onChange={this.onChangee}
                  value={this.state.pin}
                  name="pin"
                  className="form-control"
                  id="pwd"
                  placeholder="Enter number"
                />
              </div>
    {/*-----desplay name of section in shosee---------------*/}
              <label>Section Name:</label>
              <select
                className="form-control"
                value={this.state.sectionName}
                name="sectionName"
                onChange={
                  this.onChangee}
              >
                <option  defaultChecked>
                  choose
                </option>
                {sections}
              </select>
{/*=================================================================================*/}
              
              {/* <div className="dropup">
                {/* <div style={{ overflow: "section" }}>{icon}</div>
              </div> */} 

              <button  onClick={this.handelSubmit} className="btn btn-block mt-4" style={styles.btn} >
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
AddDevice.propTypes={
  
  auth:PropTypes.object.isRequired,

}

const mapStateToProps = state => ({
  auth :state.auth,
  profile: state.profile
});
export default connect(
  mapStateToProps,
  { addsection,getCurrentProfile,addDevice }
)(AddDevice);