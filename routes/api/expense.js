var express = require('express');
const Controller=require('../../controllers/expensecontroller');
const auth =require('../../middleware/auth')
const Router=express.Router();

const validation = require('../../controllers/validation')


//@route POST api/exp
//@desc adding new expense
//@access Private 
Router.post('/',auth,validation.exppost_validation,Controller.exppost);


module.exports = Router;