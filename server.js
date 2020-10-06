const express = require('express');
//const cors = require('cors');


//connect database

const connectDB = require('./config/db');
//connect database
connectDB();

//const path=require('path')
const app = express();
//app.use(cors())
//Init Middleware
app.use(express.json({
    extended: false
}))

//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));