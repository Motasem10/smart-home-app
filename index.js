const express=require('express');
const app=express();
const server =require('http').createServer(app);
const KEYS=require('./config/keys');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const passport=require('passport');
const config =require('config');
//router
const profile=require('./api/router/profile/profile');
const login=require('./api/router/user/login');
const register=require('./api/router/user/register');
const hardware=require('./api/router/hardware/hardware');
const admin=require('./api/router/admin/admin')





if(!(config.get('jwtKey')&&config.get('password')&&config.get('dbPassword') )){
 console.error(`FATEL ERROR :please set envireonment val (password,jwtKey,dbPassword)`)   
process.exit(1);
}

//midlware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(passport.initialize());
//passport config
require('./config/passportConfig')(passport);
//router

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/login',login);
app.use('/register',register);
app.use('/profile',profile);
app.use('/hardware',hardware);
app.use('/admin',admin);
//connect to mongodb
mongoose.connect(KEYS.DB_URL_CLOUD,(err)=>{
    if(err) {
        console.log('local db')
        mongoose.connect(KEYS.DB_URL_LOCAL,(err)=>{
     if(err) return(err);
     else{

        console.log('db connected localy')
     }
 
        })
        
    }else{

    console.log(`db is connected on CLOUD`);
    }
});
if(process.env.NODE_ENV==='production'){
    //heroku 
    app.use(express.static('client/build'));
    app.get('*',(req,res)=>{
    
        res.sendfile(path.resolve(__dirname,'client','build','index.html'))
    
    })
    }
    

server.listen(KEYS.PORT,(req,res)=>{

    console.log(`server is runing at ${KEYS.PORT}`);
});

// const socket=require('socket.io')(server);
 
// socket.on('connection',(user)=>{
//  console.log('socket connected ');
//  user.on('hellow',(data)=>{
//      console.log('hellow',{data});
//  })
 
// })
