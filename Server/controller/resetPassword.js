const User=require("../model/User");
const mailSender=require("../utils/mailSender")
const bcrypt=require("bcrypt")
const crypto = require("crypto");

exports.resetPasswordLink=async(req,res)=>{
    try{
        //data fetch from request
        const email=req.body.email;
        //check in dataBase if User Exists
        const user=await User.findOne({email:email});
        //send response if user dosent exists
        if(!user){
            res.status(500).json({
                sucess:false,
                message:"User Dosent Exists Please Sign In First",
            })
        }

        //generat link (we will diferentiate link by token)
        const token=crypto.randomBytes(20).toString("hex");

        const updatedDetail=await User.findOneAndUpdate(
            {email:email},
            {
                token:token,
                resetPasswordExpires:Date.now()+3600000,
            },
            {new:true}
        )

        //link generation
        const url=`https://study-notion-ruddy-xi.vercel.app/update-password/${token}`;
     
        await mailSender(email,
                 "Password Reset Link",
               `password Reset Link:${url}`,
            )

            res.status(200).json({
                success:true,
                message:"Email sent successfully, please check email and change Password",
            });



    } catch(err){
        console.log(err);
       res.status(500).json({sucess:false,
        message:"error while sending mail for reseting password",
       });
    }
}

exports.resetPassword=async(req,res)=>{
    try{
        //fetch data from request
        const {password,confirmPassword,token}=req.body;
        //validation
        if(confirmPassword!==password){
          return  res.status(401).json({
                sucess:false,
                message:"password dosent match Please Try Again"
            })
        }

        //database check
        const dbCheck=await User.findOne({token:token});

        if(!dbCheck){
          return  res.status(500).json({
                sucess:false,
                message:"Token is Invalid",
            })
        }

        if(!(dbCheck.resetPasswordExpires  >Date.now())){
            res.status(403).json({
                sucess:false,
                message:"Token expires Please try again "
            })
        }
        //hashing password
        const hashedPassword=await bcrypt.hash(password,10);

        await User.findOneAndUpdate(
            {token:token},
            {
                password:hashedPassword,

            },
            {new:true},
        )
       
       return res.status(200).json({
            success:true,
            message:"Password Change SuccessFully",
           
        });



    } catch(err){
        console.log(err);
        res.status(500).json({
         sucess:false,
         message:"error while  reseting password",
        });
    }
}
