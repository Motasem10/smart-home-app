const validator=require('validator');
const isEmpty=require('./isEmpty');

module.exports=function(data){
  let errors={};
  data.name=isEmpty(data.name)?'':data.name;
  data.email=isEmpty(data.email)?'':data.email;
 // data.password=isEmpty(data.password)?'':data.password;
  //data.password2=isEmpty(data.password2)?'':data.password2;
  data.phone=isEmpty(data.phone)?'':data.phone;
      
console.log({email:data.email})
 if( data.email.length>2&& !validator.isEmail(data.email))errors.email='email is valid ';
  //confirm password
//if(!validator.equals(data.password,data.password2))
//errors.password2='it is not asame'

if(data.phone.length>4&&!validator.isMobilePhone(data.phone)) errors.phone='invalid phone';

  if(data.name.length>2&& !validator.isLength(data.name,{min:3,max:30})) errors.name='name must be betwen 3 qand 30 char';

return({
   errors,
   isvalid :isEmpty(errors)
})

}