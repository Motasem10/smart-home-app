const mongoose=require('mongoose');

const User=mongoose.Schema({
 name :{

    type :String,
    required:true,
     maxlength:20,
     minlength:3,
    
    }

,
 email:{
type:String,
required:true,
maxlength:30,

 }
,
 password:{
    type:String,
    required:true,

 },

 date:{
type:Date,
default:Date.now()
 },
 phone:{

    type:String,
    maxlength:30,
 }
,
avatar:{
    type :String ,

}
,
isActive:{
 type:Boolean,
 default:false,   
}
,
code:{
    type:String,
    maxlength:5,
}
})

module.exports=mongoose.model('User',User,'User');