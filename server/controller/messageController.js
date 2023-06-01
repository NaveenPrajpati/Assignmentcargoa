


const messageModel = require("../models/messageModel");
const transporterModel = require("../models/transporterModel");
const userModel = require("../models/userModel");






exports.saveMessage=async(req,res)=>{
    try {
        console.log(req.body)
         const ids=await messageModel.create(req.body)
         res.status(201).json(ids)
        
    } catch (error) {
        console.log(error)
        console.log('error occured in save controller')
    }
}
exports.addPriceMessage=async(req,res)=>{
    try {
        const{id,price}=req.body
        console.log(req.body)
         const ids=await messageModel.findByIdAndUpdate({_id:id},{price:price},{new:true})
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
