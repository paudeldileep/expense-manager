var express = require('express');
const Controller=require('../../controllers/usercontroller');
//const auth =require('../../middleware/auth')
const Router=express.Router();

const validation = require('../../controllers/validation')


//@route POST api/users
//@desc register a new user
//@access Public 
Router.post('/',validation.usersignup_validation,Controller.usersignup);


//@route POST api/users/g
//@desc register a new google user
//@access Public 
Router.post('/g',Controller.gusersignup);


module.exports = Router;