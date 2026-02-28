const { default: mongoose } = require("mongoose");
const {instance}=require("../config/razorPay")
const Course=require("../model/courses")
const User=require("../model/User")
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const mailsender=require("../utils/mailSender");

const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");
const crypto=require("crypto");
const CourseProgress = require("../model/courseprogress");

exports.capturePayment=async(req,res)=>{
   
         //fetch userid and course id
       
         const {courses}=req.body;
         const userid=req.user.id;
        
         //validation
         if(courses.length===0){
            return res.status(401).json({
                success:false,
                message:"Please Send CourseId"
            })
         }

         let totalAmount=0;
          for(const course_id of courses){
                 let course;
                 try{
                     course=await Course.findById(course_id);
                     if(!course){
                         return res.status(200).json({success:false,message:"Could Not Found The Courses"})
                     }
                    
                     const uid=new mongoose.Types.ObjectId(userid);
                     if(course.studentEnrolled.includes(uid))
                     {
                        return res.status(200).json({
                            success:false,
                           message:"Student Already Enrolled"
                         })
                     }
                     const newPrice=parseInt(course.price)
                     totalAmount+=newPrice;
                 } catch(error){
                     console.log(error);
                     return res.json(
                        {
                            success:false,
                            message:error.message
                        })
                 }
          }
             //options create
             
       
            const options={
                amount:totalAmount*100,
                currency:"INR",
                receipt: Math.random(Date.now()).toString(),

            }
            
            try{
              //Intiate the Payment with Razorpay
             
              const paymentResponse=await instance.orders.create(options);
              
              
              //response
             return res.status(200).json({
                success:true,
                 message:paymentResponse,
            });
      
            } catch(error){
                 console.log(error);
               return  res.status(500).json({
                       success:false,
                       message:"error while Intiating the Payment with Razorpay"
                 })
            }
}


exports.verifySignature=async(req,res)=>{
    
   const razorpay_order_id=req.body?.razorpay_order_id;
   const razorPay_payment_id=req.body?.razorpay_payment_id;
   const razorpay_signature=req.body?.razorpay_signature;
   const courses=req.body?.courses;
   const userId=req.user.id;

   //validatit_id ||
  
   if(  !razorpay_order_id ||  !razorpay_signature || !razorPay_payment_id || !courses || !userId){
        return res.status(400).json({success:false,message:"All Field Are Required"})
    }

    let body=razorpay_order_id+"|"+razorPay_payment_id;
    const expectedSigntaure=crypto
    .createHmac("sha256",process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

    if(expectedSigntaure===razorpay_signature){
        //enroll the student
       await enrollStudent(courses,userId)
        //return res
        return res.status(200).json(
            {
                   success:true,
                   message:"Payment Verified"
            })
    }
    return res.status(500).json(
        {
          success:false,
          message:"Payment Failed"
        }
        )
}

// const enrollStudent=async(courses,userId,res)=>{
//         console.log("int the enrolled course")
//            //course ma traverse
//            if(!courses || !userId){
//             return res.status(400).json({success:false,message:"Please Provide Data For Courses"})
//            }
     
//            for(const courseid of courses){
         
//             try {
//                 const EnrolledCourse = await Course.findOneAndUpdate({_id:courseid}, {
//                     $push: {
//                         studentEnrolled: userId,
//                     },
//                 }, { new: true });

//                 if(!EnrolledCourse){
//                   return  res.status(400).json({success:false,message:"SomeThing Went Wrong"})
//                 }
               
//                 const courseprogressUpdated=await CourseProgress.create(
//                     {
//                         userId:userId,
//                         courseID:courseid,
//                         completedVideo:[]
//                     }
//                 )
//                 console.log("coure progress",courseprogressUpdated)
//                 //student model insert course id
//                 const EnrolledStudent=await User.findByIdAndUpdate(userId,
//                     {
//                         $push:{
//                              courses:courseid,
//                             courseProgress:courseprogressUpdated._id
//                         }
//                     },{new:true}
//                     )
//                     // email 
//                     console.log("email",EnrolledStudent)
//                     const emailResponse=await mailsender(
//                         EnrolledStudent.email,
//                         `Successfully Enrolled into ${EnrolledCourse.courseName}`,
//                         courseEnrollmentEmail(
//                             EnrolledCourse.courseName,`${EnrolledStudent.firstName}`
//                         )
//                     )
//                   console.log("done")
//                    return res.json({
//                         success:true,
//                         message:"Course Enrolled SuccesssFully"
//                     })
//             } catch (error) {
//                 // Handle the error here
//               return  res.status(500).json({
//                     success:false,
//                     message:error.message
//                 })
//             }
//      }
    
// }

const enrollStudent = async (courses, userId) => {
  if (!courses || !userId) {
    throw new Error("Please provide data for courses");
  }

  for (const courseid of courses) {
    const EnrolledCourse = await Course.findOneAndUpdate(
      { _id: courseid },
      { $push: { studentEnrolled: userId } },
      { new: true }
    );

    if (!EnrolledCourse) throw new Error("Course not found");

    const courseProgress = await CourseProgress.create({
      userId,
      courseID: courseid,
      completedVideo: [],
    });

    await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          courses: courseid,
          courseProgress: courseProgress._id,
        },
      },
      { new: true }
    );

    const enrolledStudent = await User.findById(userId);

    await mailsender(
      enrolledStudent.email,
      `Successfully Enrolled into ${EnrolledCourse.courseName}`,
      courseEnrollmentEmail(EnrolledCourse.courseName, `${enrolledStudent.firstName}`)
    );
  }
};


exports.sendPaymentSuccessEmail=async(req,res)=>{
    //data fetch
      const {orderId,paymentId,amount}=req.body;
      const userId=req.user.id

      //validation
    
    if(!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({success:false, message:"Please provide all the fields"});
    }
 
   try{
    const enrolledStudent=await User.findById(userId);

        await mailsender(
            enrolledStudent.email,
            "Payment Recieved",
            paymentSuccessEmail(`${enrolledStudent.firstName}`,
                    amount/100,orderId,paymentId
                )
                
        )
      
   } catch(error){
      console.log(error.message);
      return res.json({success:false,message:"Error in Sending Payment SuccessFull Mail"})
   }


}