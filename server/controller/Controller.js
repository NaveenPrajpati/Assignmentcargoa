


const transporterModel = require("../models/transporterModel");


exports.addTransporter=async(req,res)=>{
    try {
        const {name}=req.body
        const po=await transporterModel.find({name:name})
        if(po){
            res.status(400).json({
                success:false,
                message:'transporter already registered'
            })
        }
         

         const ids=await transporterModel.create(req.body)

         res.status(201).json(ids)
    } catch (error) {
        console.log(error)
        console.log('error occured in save post controller')
    }
}
exports.getAllTransporter=async(req,res)=>{
    try {
        
        const po=await transporterModel.find()
        if(!po){
            res.send({
                seuccess:false,
                message:'transporter not found'
            })
        }
    
         res.status(200).json(po)
    } catch (error) {
        console.log(error)
        console.log('error occured in save post controller')
    }
}
