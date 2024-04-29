const mongoose = require("mongoose")

const newSchema = new mongoose.Schema({
    email:{
        type: String, 
        required: true
    },
    password:{
        type: String, 
        required: true
    },
    fullName:{
        type: String,
        required: true
    },
    Number: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model("collection", newSchema);