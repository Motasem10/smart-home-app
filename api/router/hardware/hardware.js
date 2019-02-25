const express=require('express');
const router=express.Router();
const socket=require('socket.io');

const controller=require('../../controller/hardwareController')
   //get all pin data 
//->send req content user id and password
router.get('/',(req,res)=>{
    res.send('hellow');
})

router.post('/:user_id',controller.devicesData);



module.exports=router;