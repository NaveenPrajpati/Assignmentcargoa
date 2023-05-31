const mongoose = require("mongoose");


//route handler
const transporterSchema = new mongoose.Schema({
        name: {type: String}
    }
)

module.exports = mongoose.model("transporter",transporterSchema);