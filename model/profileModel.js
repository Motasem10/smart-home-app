const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const ProfileSchema=new Schema({
 user:{
    type: Schema.Types.ObjectId,
    ref: "User"
 }
 
,
section: [{
    sectionName:{
        type :String ,
        required:true
    }
    ,
    device:[{
     
    Dname :{
             
        type :String,
        required:true,
        max:20,
       
     }  ,
     state:{
     type :String,
     default:true,

     },
    
     timer:{
    type:Date,
    default:Date.now()
     },
     icon:{
       type :  String,
       max:20
     }
     ,
     pin:{
type :Number,
required:true,
unique:true

     }}]
     ,
    





}] 
   

})

module.exports=mongoose.model('Profile',ProfileSchema,'profiles');