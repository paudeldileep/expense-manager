const { check } = require("express-validator")

exports.userlogin_validation = [
    check("email", "Please provide a valid email").isEmail(),
    check("password", "Password is Required").exists(),
  ]

exports.usersignup_validation=[
    check('name', 'Name is required')
    .not()
    .isEmpty(),
    check('email', 'Please provide a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters')
    .isLength({
        min: 6
    })
]