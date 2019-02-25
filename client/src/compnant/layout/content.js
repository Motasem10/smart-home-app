import React, { Component } from "react";

import easy from "../../img/easy.png";
import quick from "../../img/Rocket-icon-blue-1.png";
import anywhere from "../../img/anywhere.png";

const styles = {
 card:{
  borderRadius: "20%",
  boxShadow:'0px 0 20px 3px #00aeef' 
},
p:{
  boxShadow: '0 0 20px black'
}

};

class Content extends Component {
  state = {
    rotate1: true,
    rotate2: true,
    rotate3: true
  };
  handelRotateContent = e => {
    this.setState({
      rotate1: false,
      rotate2: false,
      rotate3: false
    });

    this.setState({ [e.target.getAttribute("name")]: true });
    console.log(this.state);
  };

  render() {
    return (
      <div className="container">
        <div className="card-deck mt-5 mb-3 row">
          <div className=" card   text-center   " style={{ minWidth: "300px" }}>
            <img
              height="100px"
              width="100px"
              onMouseMove={this.handelRotateContent}
              name="rotate1"
              style={{borderRadius:'50%'}}
              className={
                "img-circle card-img-top " +
                (this.state.rotate1 ? "rotate" : "")
              }
              src={quick}
              alt="jsx-a11y/img-redundant-alt"
            
            />
            <div className="card-body first-card" style={styles.card}>
              <h2>Quick Start</h2>
              <h4>
                You can remote control your hardware device in few seconds{" "}
              </h4>
            </div>
          </div>

          <div className=" card  text-center " style={{ minWidth: "300px" }}>
            <img
              onMouseMove={this.handelRotateContent}
              name="rotate2"
              className={
                "img-circle card-img-top " +
                (this.state.rotate2 ? "rotate" : "")
              }
              src={easy}
              alt="jsx-a11y/img-redundant-alt"
              width="140"
              height="140"
            />

            <div className="card-body first-card" style={styles.card} style={styles.card}>
              <h2 className="card-title">Easy to Use </h2>
              <h4 className="card-text">
                you can control your poject easly without having to learn web
                development
              </h4>
            </div>
          </div>
          <div className=" card  text-center " style={{ minWidth: "300px" }}>
            <img
              onMouseMove={this.handelRotateContent}
              name="rotate3"
              className={
                "img-circle card-img-top " +
                (this.state.rotate3 ? "rotate" : "")
              }
              src={anywhere}
              alt="jsx-a11y/img-redundant-alt"
              width="140"
              height="140"
            />

            <div className="card-body first-card" style={styles.card}>
              <h2 className="card-title">Mange Anywhere</h2>
              <h4 className="card-text">
                you can control your Project from Anywhere, You can also resive
                te values of sensors on your profile..
              </h4>
            </div>
          </div>
        </div>

        <div className="card s  last-card">
          <div className="card-header " >
            <h4 className="card-title text-center text-white">It's useful for </h4>
          </div>
          <div className="card-body   row" style={styles.p}>
            <div className="col-12 col-md">
              <p><span className='fa fa-hand-o-right hvr-pulse'/> A student wonts to work for an IOT graduate Project </p>
            </div>

            <div className="col-12 col-md">
              <p> <span className='fa fa-hand-o-right  hvr-pulse'/> some one wonts to control the things in his home remotly</p>
            </div>

            <div className="col-12 col-md">
              <p> <span className='fa fa-hand-o-right  hvr-pulse'/>Any other idea related to iot</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Content;
