const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    gender : {
        type : String,
    },
    dateOfBirth : {
        type : String,
    },
    age : {
        type : Number,
        trim : true
    },
    contactNumber : {
        type : Number,
        trim : true
    },
    aadharNumber : {
        type : Number,
        trim : true
    },
    accountAddress: {
        type: String, // Assuming the Metamask account address is a string
        trim : true,
    },
    isRegistered : {
        type : Boolean,
        default : false,
    },
})

module.exports = mongoose.model("Profile",profileSchema);