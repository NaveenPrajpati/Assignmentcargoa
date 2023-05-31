const mongoose=require("mongoose");


//route handler
const postSchema=new mongoose.Schema({
	orderId:{type:String,required:true},
    from:{type:String},
    quantity:{type:String},
    address:{type:String},
    price:{type:String},
  

}
);
module.exports=mongoose.model("post",postSchema);