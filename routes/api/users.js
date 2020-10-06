var express = require('express');
const Controller=require('../../controllers/usercontroller');
const auth =require('../../middlewares/auth')
const Router=express.Router();

const validation = require('../../controllers/validation')


//@route POST api/users
//@desc register a new user
//@access Public 
Router.post('/',validation.usersignup_validation,Controller.usersignup);


module.exports = Router;