const { timeStamp } = require("console");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const detailSchema= new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        Required:true
    },
    dateOfBirth:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    bloodGroup:{
        type:String,
        required:true
    },
    height:{
        type:Number,
        required:true
    },
    weight:{
        type:Number,
        required:true
    },
    eireCode:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },

},{timestamp:true});

const Detail=mongoose.model("detail",detailSchema);

module.exports = Detail;