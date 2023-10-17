const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGODB_URL;

//const url = 'mongodb://localhost:27017';
const connection = async()=>{
    await mongoose.connect(url).then(()=>{
        console.log("Database Connected");
    });
}

module.exports = connection;