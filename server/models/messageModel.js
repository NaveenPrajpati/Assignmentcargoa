const mongoose=require("mongoose");


//route handler
const messageSchema=new mongoose.Schema({
	orderId:{type:String,required:true},
    to:{type:String},
    from:{type:String},
    quantity:{type:String},
    address:{type:String},
    price:{type:String},
    transporter:{type:String},
    creator:{type:String},
    
  
}
);
module.exports=mongoose.model("message",messageSchema);