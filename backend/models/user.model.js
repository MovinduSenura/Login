const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    profilePicture: {
        type: String,
    },
    userName: {
        type: String,
        required: true,
        trim: true,
    },
    password:{
        type : String,
        required:true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    }, 
})

const userModel = mongoose.model("user",UserSchema);

module.exports = userModel;