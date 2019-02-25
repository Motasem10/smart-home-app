const Profile = require("../../model/profileModel");
const User = require("../../model/UserModel");
const bcrypt = require("bcryptjs");

module.exports = {
  devicesData: (req, res) => {

    let password = Object.keys(req.body)[0];
    console.log(Object.keys(req.body)[0]);
    User.findById(req.params.user_id.toString()).then(user => {
      bcrypt
        .compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            Profile.findOne({ user: req.params.user_id.toString()}).then(profile => {
              if (!profile) console.log("no profile");
              var a=1;
              let devices =!profile.section?'':profile.section.map(s=>{
              //     console.log(a + '________________'+s.device.length+'___________________________');  
                   
                if(s.device.length>0) {
          
                  return(s.device);
                }
                


              });
          let arr=[];
         
        let devicesflter=devices.filter(s=>s!=undefined);
      console.log(devicesflter)
              devicesflter.map(e =>{
              e.map(s=>{
 
                arr.push( [
                  s.state === "on" ? "HIGH" : "LOW",
                  s.pin
                ])
                
               });
               });
         //  console.log(arr);
              arr = arr.toString();
        //     console.log('raaay=>'+arr)
              res.send(arr);
            });
          } else {
            res.send("password is false");
          }
        })
        .catch(err => {
          res.send("password is required");
        });
    });
  }
};
