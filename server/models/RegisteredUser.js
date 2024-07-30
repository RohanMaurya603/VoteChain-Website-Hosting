const mongoose = require("mongoose");

const registeredUserSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User"
    },
    isVerified : {
        type : Boolean,
        default : false,
    }
})

module.exports = mongoose.model("RegisteredUser",registeredUserSchema);