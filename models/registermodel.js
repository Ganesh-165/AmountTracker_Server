const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const register = new Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    refreshToken:{
        type:String,
        required:false,
    }
});

const registercollection = mongoose.model('register',register);

module.exports = registercollection;