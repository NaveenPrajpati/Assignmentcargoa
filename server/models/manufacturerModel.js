const mongoose=require('mongoose')


const commentSchema=new mongoose.Schema({
    orderId:{type:String,required:true},
    to:{type:String},
    from:{type:String},
    quantity:{type:String},
    address:{type:String},
    transporter:{type:mongoose.Schema.Types.ObjectId,ref:'transporter'}
})

module.exports=mongoose.model('comment',commentSchema);