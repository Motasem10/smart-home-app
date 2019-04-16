import React, { Component } from "react";
import axios from "axios";
import "../../../img/device img/001-air-conditioner.png";
import '../../componentStyles/control.css';
import click from '../../../img/click.mp3'


const sound=new Audio(click)
const style = {
  transition: "all 1s ease-out"
};
class Control extends Component {
  state = {
    sections: this.props.sections ? this.props.sections : "",
    newstate: ""
  };

  //____________________________________________
  handelSwitch = (e, sectionId, device) => {
    sound.play();
    let indexOfDevice = [e.target.getAttribute("indexOfDevice")];
    let indexOfSection = [e.target.getAttribute("indexofsection")];
    let state = device.state === "on" ? "off" : "on";
    axios
      .post(`/profile/device/${sectionId}/${device._id}`, { state: state })
      .then(res => {
        let updatedState = this.state;

        updatedState.sections[indexOfSection].device[indexOfDevice].state =
          res.data.state;
        this.setState(updatedState);
      })
      .catch(err => console.log(err));
  };

  //======================================================================================================

  handelDeleteSection = (e, sectionId) => {
    let indexOfSection = [e.target.getAttribute("indexofsection")];
    axios
      .delete(`profile/device/${sectionId}`)
      .then(res => {
        let state = this.state.sections.splice(indexOfSection, 1);
        this.setState(state);
      })
      .catch(err => console.log(err));
  };
  handelDeleteDevice = (e, sectionId, deviceId) => {
    let indexOfDevice = [e.target.getAttribute("indexofdevice")];
    let indexOfSection = [e.target.getAttribute("indexofsection")];
    axios.delete(`/profile/device/${sectionId}/${deviceId}`).then(() => {
      //get state
      let state = this.state;
      //edit state
      if(state.sections!==''){
      state.sections[indexOfSection].device.splice(indexOfDevice, 1);
      this.setState(state);
      }
    });
  };

  render() {
    let indexOfDevice = 0;
    let indexOfSection = -1;
    let devices =
      this.state.sections.length <= 0 ? (
        //if no sction
        <div style={{ marginTop: "10px" }}>

          <div
          
            style={{ textAlign: "center" }}
            className="alert-danger panel-primary"
         
          >
            <p> there are no section </p>
            <p>go to addd device to add section</p>
          </div>
        </div>
      ) : (
        this.state.sections.map(section => {
          indexOfDevice = -1;

          indexOfSection++;
          return (
            //if no device in section
            section.device.length === 0 ? (
              <div
                key={Math.random() * 2}
                style={{ textAlign: "center" }}
                className="alert-danger "
                role="alert"
              >
                <div
                  className="alert alert"
                  style={{ backgroundColor:"#425566",
                  color: 'white' }}
                >
                  {section.sectionName}

                  <span
                    className="delete"
                    onClick={e => this.handelDeleteSection(e, section._id)}
                  >&times;
                  </span>
                </div>
                <p className="text-active">{section.sectionName} </p>
                there are no device in {section.sectionName}...
              </div>
            ) : (
              //else
              <div className="panel-primary" key={Math.random}>
                <div
                  className="alert section"
                  style={{ backgroundColor: "#425566"}}
                >
                  {section.sectionName}

                  <span
                    className="delete"
                    onClick={e => this.handelDeleteSection(e, section._id)}
                  >
                    {" "}
                    &times;
                  </span>
                </div>
                <table className="table showslow m-0">
                  {section.device.map(devices => {
                    return (
                      <tbody key={devices._id}>
                        <tr
                          style={{
                            backgroundColor:
                              devices.state === "off" ? "#ffefef" : "#e1edf1"
                          }}
                        >
                          <th scope="row" style={{ display: "none" }}>
                            {indexOfDevice++}
                          </th>

                          <td>
                          <i className="flaticon-018-lamps"/>
                          {devices.Dname}</td>
                         
                          <td>
                            <button
                              className={
                                devices.state === "off"
                                  ? "btn btn-danger"
                                  : "btn btn-info"
                              }
                              indexofdevice={indexOfDevice}
                              indexofsection={indexOfSection}
                              onClick={e => {
                                this.handelSwitch(e, section._id, devices);
                                this.setState({ stateus: e });
                              }}
                            >
                              {devices.state}
                            </button>
                          </td>
                          <td>
                            <span
                              className="delete"
                              indexofdevice={indexOfDevice}
                              indexofsection={indexOfSection}
                              onClick={e =>
                                this.handelDeleteDevice(
                                  e,
                                  section._id,
                                  devices._id
                                )
                              }
                            >
                              &times;
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
                </table>
              </div>
            )
          );
        })
      );

    return <div style={{ ...style }}>{devices}</div>;
  }
}

export default Control;
