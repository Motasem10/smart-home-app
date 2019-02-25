const express = require("express");
const router = express.Router();

const controller=require('../../controller/login&SignupcController')


//Post login data

router.post("/", controller.Login);

router.post('/forget',controller.forgetPassword);
router.post('/edit',controller.editPassword);
module.exports = router;
