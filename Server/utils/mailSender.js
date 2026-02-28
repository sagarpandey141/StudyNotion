const nodemailer=require("nodemailer");

const nodemamailSender=async (email,title,body)=>{
  console.log("nodemailer",email,title,body);
    try{
         
      let transporter=nodemailer.createTransport({
        host:process.env.MAIL_HOST,
        auth:{
            user:process.env.MAIL_USER,
            pass:process.env.MAIL_PASS,
        }
      })
   
      let info=await transporter.sendMail({
        from:'StudyNotion ',
        to:`${email}`,
        subject:`${title}`,
        html:`${body}`,
      })
     
      return info;
      
    } catch(err){
      console.log(err.message)

    }
}

module.exports=nodemamailSender;