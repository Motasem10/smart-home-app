const jwtStrategy=require('passport-jwt').Strategy;
const ExtractJwt=require('passport-jwt').ExtractJwt;
const User=require('../model/UserModel');
const keys=require('./keys');
const opts={};
//extract token from req header
opts.jwtFromRequest=ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey=keys.SecretOr;
module.exports=passport=>{

passport.use(new jwtStrategy(opts,(jwt_payload,done)=>{
   User.findById(jwt_payload.id).then(user=>{
       if(user){
           return done(null,user);
       }
       return done(null,false);
   }).catch(err=>console.log(err));
}));


}