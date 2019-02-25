const validator=require('validator');
const isEmpty=require('./isEmpty');

module.exports=function(data){
  let errors={};

  data.email=isEmpty(data.email)?'':data.email;
  data.password=isEmpty(data.password)?'':data.password;

  if(!validator.isEmail(data.email))errors.email='email is valid ';

  if(validator.isEmpty(data.email)) errors.email='email is required'
  
  if(validator.isEmpty(data.password)) errors.password='password is required'
  
return({
   errors,
   isvalid :isEmpty(errors)
})

}