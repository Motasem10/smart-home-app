const express=require('express');
const router=express.Router();
const Profile=require('../../../model/profileModel');
const User=require('../../../model/UserModel');
const Admin=require('../../../model/adminModule');
const bcrypt=require('bcryptjs');
const passport=require('passport')

const controller=require('../../controller/profileController')






router.get('/device',
passport.authenticate('jwt',{session:false})
,(req,res)=>{  
Profile.find().then(profiles=>{
let device=profiles.map(item=>{
    return {
        user:item,
        device : item.device, //devices 
                    
    
    }
})

let numberOfDevices=0;
for (let index = 0; index < device.length; index++) {
     numberOfDevices += device[index].device.length
     
    
}
let data={
    
    numberOfDevices,
    numberOfUsers:device.length,
    device:device
}

res.json(data)
})
});

router.delete('/:id',(req,res)=>{

User.deleteOne({_id:req.params.id}).then(user=>{
user.n=='1'? res.json('deleted'):res.status(404).json('not found')

}).catch(err=>{
    res.json(err);
})


})



module.exports=router;