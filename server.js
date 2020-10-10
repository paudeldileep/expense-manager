const express = require('express');
//const cors = require('cors');
const path= require('path')

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
app.use('/api/exp', require('./routes/api/expense'));


//serve static assets in production
if(process.env.NODE_ENV ==='production'){
    //set static folder
    app.use(express.static('client/build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(_dirname,'client','build','index.html'));
    })
}
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));