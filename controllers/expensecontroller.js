const Expense = require("../models/Expense")
const { validationResult } = require("express-validator")
const { json } = require("express")

exports.exppost = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    })
  }
  req.body.author = req.user.id
  //console.log(req.user);

  //const { title, amount, category, incurred_on, notes, author } = req.body

  try{
    expense=new Expense(req.body);

    await expense.save();

    return res.status(200).json({
        message: "Expense recorded succesfully!"
        })

  }
  catch(err){
    console.error(err.message);
    res.status(500).send('Server error');
  }

  
}
