const asyncHandler = require('express-async-handler');
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');


exports.registerUser=asyncHandler(async(req,res)=>{
    console.log(req.body)

    const{name,email,password,role,address}=req.body;

    if(!name || !address || !email || !password || !role) {
        res.status(400).json({
            success:false,
            message:"all field ara necessary"
        })
    }
    const userPresent=await userModel.findOne({email});
    if(userPresent){
        res.status(400).json({
            success:false,
            message:"user already register go to login"
        })
    }
    const hashedPassword=await bcrypt.hash(password,10);

    const user=await userModel.create({name,email,address,role,password:hashedPassword});
    if(user){
        res.status(201).json({
            success:true,
            user:{ id:user._id,email:user.email,address:user.address,name:user.name,role:user.role}})
    }else{
        res.status(400).json({
            success:false,
            message:"unable to register user"
        })
    }
   
});



exports.loginUser=asyncHandler(async(req,res)=>{

    const {email,password}=req.body;
    console.log(req.body)
    if(!email || !password){
        res.status(400).json({
            success:false,
            message:"all fields are required"
        })
    }
    const findUser=await userModel.findOne({email});
    
    if(!findUser){
        res.status(400).json({
            success:false,
            message:"user not register"
        })
    }
    //compare password with hashpassword
    if(await bcrypt.compare(password,findUser.password)){
     const user={
            name:findUser.name,
                email:findUser.email,
                role:findUser.role,
                id:findUser._id
        }
        const accessToken=jwt.sign({
            user,
        },process.env.ACCESS_TOKEN_SECREC,{expiresIn:"2h"});

        res.status(200).json({
            success:true,
            token:accessToken,
            user
        });
    }
    else{
        res.status(401).json({
            success:false,
        message:"email or password invalid"
    })
    }
});


//access private
exports.createPassword=asyncHandler(async (req,res)=>{
    const {otp,newPassword,confNewPassword}=req.body;

    const check=await otpModel.findOne({otp});

    if(!check) {
        res.status(400).json({
            status: false,
            message: 'invalid OTP'
        })
    }
        if(newPassword !== confNewPassword){
            res.status(400).json({
                status:false,
                message:'password and confirm password mismatch'
            })
        }

        //hash password
        const hashedPassword=await bcrypt.hash(newPassword,10);


        await userModel.findOneAndUpdate({email:check.email},{password:hashedPassword},{new:true})
            .then(response=>{
                res.status(201).json({
                    success:true,
                    message:'password changed successfully'
                })
            })
            .catch(err=>{
                console.log(err)
            })





});
