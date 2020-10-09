const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require("../config/config")
const User = require('../models/User');
const { validationResult } = require("express-validator")

const { JsonWebTokenError } = require('jsonwebtoken');

exports.usersignup=async(req,res)=>{

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {name,email,password} = req.body;

        try {
            //see if user exists
            let user=await User.findOne({email});

            if(user){
                return res.status(400).json({errors:[{msg:'User already exists'}]});
            }

            user=new User({name,email,password});

            //encrypt password

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password,salt);

            //saving user to db

            await user.save();

            //return jsonwebtoken
            const payload={
                user:{
                    id:user.id
                }
            }

            jwt.sign(
                payload, 
                config.secretKey,
                {expiresIn: 36000},
                (err,token)=>{ 
                    if(err) throw err;
                    res.json({token});
                }
            );


        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');

        }

}