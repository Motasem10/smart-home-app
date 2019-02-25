const express = require("express");
const router = express.Router();

//Post login data
const controller=require('../../controller/login&SignupcController')
router.post("/",controller.signUp );

module.exports = router;
