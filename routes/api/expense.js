var express = require('express');
const Controller=require('../../controllers/expensecontroller');
const auth =require('../../middleware/auth')
const Router=express.Router();

const validation = require('../../controllers/validation')


//@route POST api/exp
//@desc adding new expense
//@access Private 
Router.post('/',auth,validation.exppost_validation,Controller.exppost);

//@route GET api/exp
//@desc get expense of cureent user between given dates 
//@access Private 
Router.get('/',auth,Controller.expget);

//@route GET api/exp/cm
//@desc get expense of cureent user of current month,today and yesterday 
//@access Private 
Router.get('/cm',auth,Controller.expgetcm);


module.exports = Router;