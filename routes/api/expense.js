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

//@route GET api/exp/cg
//@desc get expenses by category 
//@access Private 
Router.get('/cg',auth,Controller.expgetcg);

//@route POST api/exp/plotm
//@desc monthly plot
//@access Private 
Router.get('/plotm',auth,Controller.expplotm);

//@route POST api/exp/ploty
//@desc yearly plot
//@access Private 
Router.get('/ploty',auth,Controller.expplotyearly);

//@route POST api/exp/plotavg
//@desc avg plot
//@access Private 
Router.get('/plotavg',auth,Controller.expplotavg);


module.exports = Router;