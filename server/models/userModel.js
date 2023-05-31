const mongoose = require("mongoose");



//route handler
const userSchema = new mongoose.Schema({
        firstName: {type: String, required: [true, "enter user name"]},
        lastName: {type: String, required: [true, "enter user name"]},
        email: {type: String, required: [true, "enter email"], unique: [true, "email taken"]},
       userType:{type:String,default:'public'},
        password: {type: String, required: [true, "enter password"],},
    additionalDetails:{type:mongoose.Schema.Types.ObjectId,ref:'profile'}

    },
    {
        timestamps: true
    }
)


module.exports = mongoose.model("user", userSchema);