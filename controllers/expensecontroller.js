const Expense = require("../models/Expense")
//const User = require("../models/User")
const mongoose = require("mongoose")
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

  try {
    expense = new Expense(req.body)

    await expense.save()

    return res.status(200).json({
      msg: "Expense recorded succesfully!",
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server error")
  }
}

//get expenses

exports.expget = async (req, res) => {
  let start = req.query.startdate
  let end = req.query.enddate

  console.log(start)
  console.log(end)
  console.log(req.user.id)
  try {
    let expenses = await Expense.find({
      $and: [
        { incurred_on: { $gte: start, $lte: end } },
        { author: req.user.id },
      ],
    })
      .sort("incurred_on")
      .populate("author", "id name", "user")

    res.json(expenses)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server error")
  }
}

exports.expgetcm = async (req, res) => {
  const date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth()
  const firstDay = new Date(y, m, 1)
  const lastDay = new Date(y, m + 1, 0)

  const today = new Date()
  today.setUTCHours(0, 0, 0, 0)

  const tomorrow = new Date()
  tomorrow.setUTCHours(0, 0, 0, 0)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const yesterday = new Date()
  yesterday.setUTCHours(0, 0, 0, 0)
  yesterday.setDate(yesterday.getDate() - 1)

  try {
    let currentPreview = await Expense.aggregate([
      {
        $facet: {
          month: [
            {
              $match: {
                incurred_on: { $gte: firstDay, $lt: lastDay },
                author: mongoose.Types.ObjectId(req.user.id),
              },
            },
            {
              $group: { _id: "currentMonth", totalSpent: { $sum: "$amount" } },
            },
          ],
          today: [
            {
              $match: {
                incurred_on: { $gte: today, $lt: tomorrow },
                author: mongoose.Types.ObjectId(req.user.id),
              },
            },
            { $group: { _id: "today", totalSpent: { $sum: "$amount" } } },
          ],
          yesterday: [
            {
              $match: {
                incurred_on: { $gte: yesterday, $lt: today },
                author: mongoose.Types.ObjectId(req.user.id),
              },
            },
            { $group: { _id: "yesterday", totalSpent: { $sum: "$amount" } } },
          ],
        },
      },
    ])
    let expensescm = {
      month: currentPreview[0].month[0],
      today: currentPreview[0].today[0],
      yesterday: currentPreview[0].yesterday[0],
    }
    res.json(expensescm)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server error")
  }

  // res.json({firstday:firstDay,lastDay:lastDay,today:today,tomorrow:tomorrow,yesterday:yesterday});
}

//expense by category
exports.expgetcg = async (req, res) => {
  const date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth()
  const firstDay = new Date(y, m, 1)
  const lastDay = new Date(y, m + 1, 0)

  try {
    let categoryMonthlyAvg = await Expense.aggregate([
      {
        $facet: {
          average: [
            { $match: { author: mongoose.Types.ObjectId(req.user.id) } },
            {
              $group: {
                _id: {
                  category: "$category",
                  month: { $month: "$incurred_on" },
                },
                totalSpent: { $sum: "$amount" },
              },
            },
            {
              $group: {
                _id: "$_id.category",
                avgSpent: { $avg: "$totalSpent" },
              },
            },
            {
              $project: {
                _id: "$_id",
                value: { average: "$avgSpent" },
              },
            },
          ],
          total: [
            {
              $match: {
                incurred_on: { $gte: firstDay, $lte: lastDay },
                author: mongoose.Types.ObjectId(req.user.id),
              },
            },
            { $group: { _id: "$category", totalSpent: { $sum: "$amount" } } },
            {
              $project: {
                _id: "$_id",
                value: { total: "$totalSpent" },
              },
            },
          ],
        },
      },
      {
        $project: {
          overview: { $setUnion: ["$average", "$total"] },
        },
      },
      { $unwind: "$overview" },
      { $replaceRoot: { newRoot: "$overview" } },
      { $group: { _id: "$_id", expenses: { $mergeObjects: "$value" } } },
    ]).exec()
    res.json(categoryMonthlyAvg)
  } catch (err) {
    console.log(err)
    //console.error(err.message)
    res.status(500).send("Server error")
  }
}

//delete expense

exports.expdelete=async(req,res)=>{

  
  const expid=req.query.expid;

  try{
    const exp = await Expense.findById(expid);

    if(!exp){
        return res.status(404).json({msg:'Expense data not found'});
    }
    //check user todo
    

    await exp.remove();

    res.json({msg: 'Expense data deleted!'});
  }
  catch(err){
    console.error(err.message);
    if(err.kind === 'ObjectId'){
        return res.status(404).json({msg:'Expense data not found'});
    }
    res.status(500).send('Server Error');
}

}


//plots


// plot 1
exports.expplotavg = async (req, res) => {
  const firstdate = new Date(req.query.startdate)
  const lastdate = new Date(req.query.enddate)

  try {
    let categoryavg = await Expense.aggregate([
      { $match : { incurred_on : { $gte : firstdate, $lte: lastdate }, author: mongoose.Types.ObjectId(req.user.id)}},
      { $group : { _id : {category: "$category"}, totalSpent:  {$sum: "$amount"} } },
      { $group: { _id: "$_id.category", avgSpent: { $avg: "$totalSpent"}}},
      { $project: {x: '$_id', y: '$avgSpent'}}
    ]).exec()
    res.json({avgdata:categoryavg})
  } catch (err){
    console.log(err)
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

// plot 2
 exports.expplotyearly = async (req, res) => {
  const y = req.query.year
  const firstdate = new Date(y, 0, 1)
  const lastdate = new Date(y, 12, 0)
  try {
    let totalMonthly = await Expense.aggregate(  [
      { $match: { incurred_on: { $gte : firstdate, $lt: lastdate }, author: mongoose.Types.ObjectId(req.user.id) }},
      { $group: { _id: {$month: "$incurred_on"}, totalSpent:  {$sum: "$amount"} } },
      { $project: {x: '$_id', y: '$totalSpent'}}
    ]).exec()
    res.json({monthTot:totalMonthly})
  } catch (err){
    console.log(err)
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

//plot 3
exports.expplotm = async (req, res) => {
  const date = new Date(req.query.month), y = date.getFullYear(), m = date.getMonth()
  const firstdate = new Date(y, m, 1)
  const lastdate = new Date(y, m + 1, 0)

  try {
    let totalMonthly = await Expense.aggregate(  [
      { $match: { incurred_on: { $gte : firstdate, $lt: lastdate }, author: mongoose.Types.ObjectId(req.user.id) }},
      { $project: {x: {$dayOfMonth: '$incurred_on'}, y: '$amount'}}
    ]).exec()
    res.json(totalMonthly)
  } catch (err){
    console.log(err)
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}
