


const messageModel = require("../models/messageModel");

const userModel = require("../models/userModel");






exports.saveMessage=async(req,res)=>{
    try {
        console.log(req.body)
         const ids=await messageModel.create(req.body)
         res.status(201).json({
            success:true,
            message:'message send success',
            ids})
        
    } catch (error) {
        console.log(error)
        console.log('error occured in save controller')
    }
}
exports.addPriceMessage=async(req,res)=>{
    try {
        console.log(req.params)
        const id=req.params.id
        const{price}=req.body
      
         const ids=await messageModel.findByIdAndUpdate({_id:id},{price:price},{new:true})
console.log(ids)
         res.status(201).json({
            success:true,
            message:'message sent to manufacturer'
         })
        
    } catch (error) {
        console.log(error)
        console.log('error occured in save controller')
    }
}
exports.allMessage=async(req,res)=>{
    try {
        const messages=await messageModel.find()
        if(messages==[]){
            res.status(400).json({
                success:false,
                message:'no message in available'
            })
        }else{
            res.status(200).json({
                success:true,
                messages
            })
        }

    } catch (error) {
        console.log(error)
        console.log('error occured in save controller')
    }
}
exports.generateOrderId=async(req,res)=>{
    try {
        const messages=await messageModel.find()
        let text =messages.length.toString();
        text = text.padStart(3,"0");
          let oid="XB"+text
            
         return res.status(200).json({
                success:true,
                orderId:oid
            })
        
         
        

    } catch (error) {
        console.log(error)
        console.log('error occured in geting id')
    }
}


exports.getAllTransporter=async(req,res)=>{
    try {
        const po=await userModel.find({role:"transporter"})
        let transporter=[]
        po.forEach(it=>{
            transporter.push({
                id:it._id,
                name:it.name
            })
        })
        if(po==[]){
            res.send({
                seuccess:false,
                message:'transporter not found'
            })
        }else
         res.status(200).json({
            success:true,
            transporters:transporter
         })
    } catch (error) {
        console.log(error)
        console.log('error occured in save post controller')
    }
}
