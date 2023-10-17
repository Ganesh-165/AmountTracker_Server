const mongoose = require('mongoose');

const userdata = new mongoose.Schema({
    userid:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    amounttype:{
        type:String,
        required:true
    }
});

const userdatacollection = mongoose.model('userdata',userdata);

module.exports = userdatacollection;