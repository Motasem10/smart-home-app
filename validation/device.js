const validator=require('validator');
const isEmpty=require('./isEmpty');

module.exports=function(data){
  console.log('data');
  console.log(data);
  let errors={};

  data.Dname=isEmpty(data.Dname)?'':data.Dname;
  data.icon=isEmpty(data.icon)?'':data.icon;
  
  data.sectionName=isEmpty(data.sectionName)?'':data.sectionName;
  data.state=isEmpty(data.state)?'off':'on';
  data.pin=isEmpty(data.pin) ?  '':data.pin;
  if(!validator.isLength(data.Dname,{min:0,max:15}))errors.Dname='name of device mustbe betwen 3 and 15 char ';
  if(validator.isEmpty(data.sectionName)) errors.sectionName='sectionName is required';
  if(validator.isEmpty(data.Dname)) errors.Dname='name is required';
  if(validator.isEmpty(data.pin)) errors.pin='pin is required'
  //if(!(validator.isBoolean(data.state)) )errors.state='state field must be boolean'
         
return({
   errors,
   isvalid :isEmpty(errors)
})

}