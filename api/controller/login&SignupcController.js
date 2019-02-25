const User = require("../../model/UserModel");
const Profile = require("../../model/profileModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateRegister = require("../../validation/register");
const gravatar = require("gravatar");
const Keys = require("../../config/keys");
const validateLogin = require("../../validation/login");
const validateEditPassword = require("../../validation/editpassword");
const validator = require("validator");
const mailer=require('../email');
module.exports = {
  Login: async (req, res) => {
    
  
    //validate login
    const { errors, isvalid } = validateLogin(req.body);
    if (!isvalid) return res.status(400).json(errors);
    const email = req.body.email;
    const password = req.body.password;
    try {
      const user = await User.findOne({ email:email });
      console.log(user);
      if (!user) {
        errors.email = "no user has this email";
        return res.status(400).json(errors);
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        errors.password = "incorrect password";
        return res.status(400).json(errors);
      }

      const payload = {
        id: user._id,
        name: user.name,
        phone:user.phone,
        email: user.email,
        avatar: user.avatar,
        isActive:user.isActive
      };
      //----------------------
      jwt.sign(
        payload,
        Keys.SecretOr,
        { expiresIn: Keys.time },
        (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token,
            isActive:user.isActive
          });
        }
      );
      //----------------------------
    } catch (err) {
      console.log(err);
    }
  },

  //__________________________________________________________________________________

  signUp: async (req, res) => {
    //validate register
    const { errors, isvalid } = validateRegister(req.body);
    if (!isvalid) return res.status(400).json(errors);

    // check if user ids registered

    const user = await User.findOne({ email: req.body.email });
    if (user) {
      errors.user = "user is already exict";
      return res.status(400).json(errors);
    }
    //else
    const avatar = gravatar.url(req.body.email, {
      s: 200, //size
      r: "pg",
      d: "mm"
    });
    let newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      avatar: avatar,
      code: (Math.random() * 10000).toFixed()
    };

console.log(newUser.code);    
    //hash password
    try {

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newUser.password, salt);
      //if (err) throw err;
      newUser.password = hash;
      //save user in db

      const data = await new User(newUser).save();

      //create profile
      let profile = { user: data._id };
      const user=await new Profile(profile).save();
       console.log(user);
      //send email with activation code  to user
      mailer(user.name,newUser.email,newUser.code);
//login
const payload = {
  id: user._id,
  name: user.name,
  email: user.email,
  phone:user.phone,
  avatar: user.avatar,
  isActive:user.isActive
};
//----------------------
jwt.sign(
  payload,
  Keys.SecretOr,
  { expiresIn: Keys.time },
  (err, token) => {
    res.json({
      success: true,
      token: "Bearer " + token,
      isActive:user.isActive
    });
  }
);




    } catch (err) {
      console.log(err);
      res.status(400).json(err);

    }
  },
  //________________________________________________________________________________________________
  //it generte new code to user
  forgetPassword: (req, res) => {
    console.log(req.body.email);
    const email = req.body.email === undefined ? "" : req.body.email;
    if (!validator.isEmail(email)) return res.status(400).json("it is not email");

    //generate code
    const code = (Math.random() * 10000).toFixed();
    //find user in db and updatee activate code
    User.findOneAndUpdate({ email }, { $set: { code } })
      .then(s => {
        if (!s) {
          return res
            .status(404)
            .json({ email: "there are no account by this name" });
        } //else
        //send code by email
       // console.log('sssssssss'+s.name)
        mailer(s.name,email,code);
        res.json('code has been sent');
      })
      .catch(err => res.status(404).json(err));
  },
  //_____________________edit password_______
  editPassword: async (req, res) => {
    const { errors, isvalid } = validateEditPassword(req.body);
    if (!isvalid) return res.status(400).json(errors);
    
      const userReq = {};
      userReq.password = req.body.password;
      userReq.code = ""; //delete code
      //hash password
      try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(userReq.password, salt);
        userReq.password = hash;

        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json("emial not found");
        if (user.code.toString() != req.body.code.toString()) {
          return res.status(400).json("err in code ");
        }
        const updated = await User.findOneAndUpdate(
          { email: req.body.email },
          { $set: userReq },
          { new: true }
        );
        if (!updated) return res.json("no user");
        res.json("updated");
     //login__________________________________________________________
        } catch (err) {
        res.json(err);
      }
    
  },


  
};

