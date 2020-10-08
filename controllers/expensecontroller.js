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
      msg:"Expense recorded succesfully!",
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
