const validator=require('validator');
const isEmpty=require('./isEmpty');

module.exports=function(data){
  let errors={};
  data.email=isEmpty(data.email)?'':data.email;
  data.password=isEmpty(data.password)?'':data.password;
  data.password2=isEmpty(data.password2)?'':data.password2;
  data.code=isEmpty(data.code)?'':data.code;

  if(!validator.isEmail(data.email))errors.email='email is valid ';
  if(!validator.isLength(data.code,{min:3,max:6})) errors.code= 'error in code ' 
  if(!validator.isLength(data.password,{min:8,max:150})) errors.password='password is too short';
  if(validator.isEmpty(data.password2)) errors.password2='confirm password  is required'
  const user={};
  //confirm password
if(!validator.equals(data.password,data.password2))
errors.password2='it is not asame'

  if(validator.isEmpty(data.email)) errors.email='email is required'
  if(validator.isEmpty(data.code)) errors.code='code is required'
  if(validator.isEmpty(data.password)) errors.password='password is required'
  
  
return({
   errors,
   isvalid :isEmpty(errors)
})

}