const mongoose = require('mongoose');
var config= require('./config');

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    poolSize: 5, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 60000 // Close sockets after 45 seconds of inactivity
    
  };

const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoURI,options);

        console.log('DB Connected');
    } catch (err) {
        console.error(err.message);
        //exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;