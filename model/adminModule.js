const mongoose=require('mongoose');

const Admin=mongoose.Schema({
 users :Number,
 devices:Number,




});

module.exports=mongoose.model('Admin',Admin);