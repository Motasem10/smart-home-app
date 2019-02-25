 const validator=require('validator');
 const isEmpty=require('./isEmpty');

 module.exports=function(data){
   let errors={};
   data.name=isEmpty(data.name)?'':data.name;
   data.email=isEmpty(data.email)?'':data.email;
   data.password=isEmpty(data.password)?'':data.password;
   data.password2=isEmpty(data.password2)?'':data.password2;
   data.phone=isEmpty(data.phone)?'':data.phone;
       

   if(!validator.isEmail(data.email))errors.email='email is valid ';
   if((!validator.isMobilePhone(data.phone)&&!isEmpty(data.phone))) errors.phone='Phone is valid';
   //confirm password
if(!validator.equals(data.password,data.password2))
errors.password2='it is not asame'


   if(!validator.isLength(data.name,{min:3,max:30})) errors.name='name must be betwen 3 qand 30 char';
   if(!validator.isLength(data.password,{min:8,max:150})) errors.password='password is too short';
   if(validator.isEmpty(data.email)) errors.email='email is required'
   
   if(validator.isEmpty(data.password)) errors.password='password is required'
   
   if(validator.isEmpty(data.password2)) errors.password2='confirm password  is required'
return({
    errors,
    isvalid :isEmpty(errors)
})

 }