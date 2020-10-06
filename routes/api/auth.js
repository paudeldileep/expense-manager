var express = require('express');
const Controller=require('../../controllers/authcontroller');
const auth =require('../../middlewares/auth')
const Router=express.Router();

const validation = require('../../controllers/validation')


//@todo user authorization part 


//@route GET api/auth
//@desc return userdata based on id(email)
//@access Public
Router.get('/',auth,Controller.getuser);

//@route POST api/auth
//@desc  login a user and return token
//@access Public
Router.post('/',validation.userlogin_validation,Controller.userlogin);


module.exports = Router