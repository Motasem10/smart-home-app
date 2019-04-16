const Profile = require("../../model/profileModel");
const User = require("../../model/UserModel");
const validateDevice = require("../../validation/device");
const jwt =require('jsonwebtoken')
const validateEditProfile = require("../../validation/editProfile");
const Keys=require('../../config/keys')
module.exports={
createProfile :(req, res) => {
    let profile = {
      user: req.user.id
    };
    User.findOne({ _id: req.user.id }).then(user => {
      new Profile(profile).save().then(profile => {
        profile = profile;
        res.json(profile);
        console.log(profile);
      });
    });
  },
//_____________________________________________________
addDevice :(req, res) => {
  //validate device
  const { errors, isvalid } = validateDevice(req.body);
  if (!isvalid) {
    
    return res.status(400).json(errors);
  }

  let newdevice = {
    Dname: req.body.Dname,
    state: req.body.state,
    pin :req.body.pin,
    icon:req.body.icon
    
  };

  Profile.findOne({ user: req.user.id }).then(profile => {

     
   
   let isFoundSection=false;
   let i=0;
    for( i ; i<profile.section.length;i++){
    if(profile.section[i].sectionName==req.body.sectionName){

        isFoundSection=true;
     break;
    }
  }
  if(!isFoundSection) return res.json({errors:'error in section name'});
  
  profile.section[i].device.unshift(newdevice);
  profile.save().then(profile => {
return res.json(profile);

}).catch(err=>{
  console.error({err});
res.status(500).json(err);
});  
  

}).catch(err=>{
 console.log(err);
 res.json(err);
})
}
,
//__________________________________________________________________________________
addsection :(req, res) => {
  //validate device
const sectionName=req.body.sectionName===undefined?'':req.body.sectionName;
  if (sectionName.length>20)  {   
    return res.status(400).json('section must be less than 20 char ');
  }else if(sectionName.length<4){
    return res.status(400).json({s:'section must be more than 3 char '});
    
  }
  let newsection = {
    sectionName
    
  };
  
  Profile.findOne({ user: req.user.id }).then(profile => {
    if(!profile){  
    return res.json('create profile')
    }
    profile.section.unshift(newsection);
    profile.save().then(profile => {
      res.json(profile);
    });
  }).catch(err=>res.status(400).json(err));
}
,







//_______________________________________________________________________
deleteDevice : (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
   //find  index of section
    let indexOfSection = profile.section
      .map(index => index.id)
      .indexOf(req.params.sectionId);
    if (indexOfSection=== -1) return res.json("section not found");
//find index of device
let indexOfDevice = profile.section[indexOfSection].device
.map(index => index.id)
.indexOf(req.params.deviceId);
if (indexOfDevice === -1) return res.json("deice not found");

    profile.section[indexOfSection].device.splice(indexOfDevice, 1);
    profile.save().then(() => {
      res.json({ sucsess: "device deleted" });
    });
  });
},
//_______________________________________________________

deleteSection : (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
   //find  index of section
    let indexOfSection = profile.section
      .map(index => index.id)
      .indexOf(req.params.sectionId);
    if (indexOfSection=== -1) return res.json("section not found");

    profile.section.splice(indexOfSection, 1);
    profile.save().then(() => {
      res.json({ sucsess: "section deleted" });
    });
  });
}

//__________________________________________________________
,
switchDevice :  (req, res) => {
  let newState =  req.body.state;
  console.log(newState);
  Profile.findOne({ user: req.user.id })
    .then(profile => {

let sectionIndex=profile.section.map(section=>section.id).indexOf(req.params.sectionId);


let deviceIndex=profile.section[sectionIndex].device.map(section=>section.id)
.indexOf(req.params.deviceId);

 
      profile.section[sectionIndex].device[deviceIndex].state = newState;

      profile.save().then(profile => {
        console.log(profile.section[sectionIndex].device[deviceIndex]);
        res.json( profile.section[sectionIndex].device[deviceIndex])});
    })
    .catch(err => res.json(err));
}
,
//___________________________________________________________________
userProfile:(req, res) => {

  User.findById(req.user.id).then(user=>{
    console.log(user);
      if(!user.isActive){
      //active your email 
      return res.json('active your email')
      }else{

        Profile.findOne({user:req.user.id}).populate('user',['name','email']).then(profile => {
          res.json(profile);
        });
      }
  
  })

},
activeEmail:(req,res)=>{
  if(req.body.code===''||req.body.code===undefined){
    return res.status(400).json('enter activation  code ')
  }
  User.findById(req.user.id).then(user=>{
console.log(user.code);
if(user.code.toString()===req.body.code.toString()){

  User.findByIdAndUpdate(req.user.id,{$set:{isActive:true}},{new:true}).then(s=>{
    console.log(s);

return res.json('email activated');

  }).catch(err=>res.json(err))


}


else{ res.status(400).json('code is incorrect');}
  }).catch(err=>{

    console.log(err);
    res.json(err);
  })

},
editProfile:async (req,res)=>{
  console.log('edit profile be=========================================')
  const {errors,isvalid}=validateEditProfile(req.body);
  if(!isvalid){
    
    return res.status(400).json(errors);
  }
  const profile={};
if(req.body.name)  profile.name=req.body.name;
if(req.body.email)  profile.email=req.body.email;
//if(req.body.password)  profile.password=req.body.password;
if(req.body.phone) profile.phone=req.body.phone;
try{
await User.findByIdAndUpdate(req.user.id,{$set:profile});
const user=await User.findById(req.user.id);
const payload={name:user.name,
  email:user.email,
  phone:user.phone,
  isActive:user.isActive,
  id:user.id,
  avatar:user.avatar
}
jwt.sign(
  payload,
  Keys.SecretOr,
  { expiresIn: Keys.time },
  (err, token) => {
    res.json({
      success: true,
      token: "Bearer " + token,
      isActive:user.isActive
    });
    
  }
);

}catch(err){
 console.log(err);
 //return res.status(400).json(err);
}




}




}
///______________________________________________________________




