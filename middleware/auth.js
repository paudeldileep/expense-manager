const jwt = require('jsonwebtoken');
var config=require('../config/config');


module.exports = function(req,res,next){
    //Get token from header
    const token = req.header('x-auth-token');

    //Check if not token
    if(!token){
        return res.status(401).json({msg:'Authorization failed!!'});
    }

    //verify token and assign decoded data(here currently email address) to req.user
    try{
        const decoded = jwt.verify(token,config.secretKey);

        req.user = decoded.user;
        next();
    }catch(err){
        console.error(err.message);
        return res.status(401).json({msg: 'Invalid token,Please Login Again'});
    }
};