const User=require("../model/User");
const Profile=require("../model/profile");
const { imageUploadToCloudinary } = require("../utils/imageUpload");
const {convertSecondsToDuration}=require("../utils/sectoDuration")
const CourseProgress=require("../model/courseprogress");
const courses = require("../model/courses");

exports.updateProfile=async(req,res)=>{
    try{
       //data fetch
       const {contactNumber,dateOfBirth="",about="",gender=""}=req.body;
       //fetch id from params
       const userid=req.user.id;
       //update profile
       const userInfo=await User.findById(userid).populate("additionalDetail");
      
       const profile=await Profile.findById(userInfo.additionalDetail);

       profile.dateOfBirth=dateOfBirth,
       profile.contactNumber=contactNumber,
       profile.about=about,
       profile.gender=gender,
       await profile.save();
      

       //response
       res.status(200).json({
        success:true,
        message:"Profile Updated SuccessFully",
        profile,
        userInfo,
    });

    } catch(error){
        res.status(500).json({
            success:false,
            message:"error while Updating Profile",
          error,
         })
    }
}

//delete profile
exports.deleteAccount=async(req,res)=>{
    try{
          //data fetch
          const userid=req.user.id;
          //validation
          const user=await User.findById({_id:userid})
          if(!user){
            res.status(401).json({
                success:false,
                message:"All Field Are Required",
            })
          }
       
          //delete profile
          await Profile.findByIdAndDelete({_id:user.additionalDetail});
          //delete from enrolled course TODO
          await User.findByIdAndDelete({_id:userid});
         // delete courses made by user
        await courses.findByIdAndDelete({instructor:userId})
          
          //response
          console.log("done")
        return  res.status(200).json({
            sucess:true,
            message:"Profile Deleted SuccessFully",
          })


    // Respond to the client
    return res.status(200).json({
        success: true,
        message: "Account deletion scheduled in 30 days",
    });
  
  } catch (error) {
    console.log("error",error)
      return res.status(500).json({
          success: false,
          message: "Error while scheduling account deletion",
          error,
      });
  }
};

//get all user
exports.GetallProfile=async(req,res)=>{
    try{
      //TODO CHECK
       //data fetched
       const id=req.user.id;
       //db call
       const userInfo=await User.findById(id).populate("additionalDetail").exec();
       //response
       res.status(200).json({
        sucess:true,
        message:"User Fetched SuccessFully",
        data:userInfo,
      })
    } catch(error){
        res.status(500).json({
            success:false,
            message:"error while  Fetching User Data",
          error,
         })
    }
}


exports.getAllEnrolledCourses=async(req,res)=>{
  try{
        //data fetch
        const userid=req.user.id;
        //db call
        let userDetail=await User.findById(userid).populate({
          path:"courses",
           populate:{
            path:"courseContent",
            populate: {
               path:"subSection",
            }
           }
        })
        .exec();
    
        userDetail = userDetail.toObject()
        var SubsectionLength = 0
        for (var i = 0; i < userDetail.courses.length; i++) {
        let totalDurationInSeconds = 0
        SubsectionLength = 0
        for (var j = 0; j < userDetail.courses[i].courseContent.length; j++) {
          totalDurationInSeconds += userDetail.courses[i].courseContent[
          j
          ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
          userDetail.courses[i].totalDuration = convertSecondsToDuration(
          totalDurationInSeconds
          )
          SubsectionLength +=
          userDetail.courses[i].courseContent[j].subSection.length
        }
        let courseProgressCount = await CourseProgress.findOne({
          courseID: userDetail.courses[i]._id,
          userId: userid,
        })
        courseProgressCount = courseProgressCount?.completedVideo.length
        if (SubsectionLength === 0) {
          userDetail.courses[i].progressPercentage = 100
        } else {
          // To make it up to 2 decimal point
          const multiplier = Math.pow(10, 2)
          userDetail.courses[i].progressPercentage =
          Math.round(
            (courseProgressCount / SubsectionLength) * 100 * multiplier
          ) / multiplier
        }
        }
      
        if(!userDetail){
          return res.status(400).json({
            success:false,
            message:`Could Not Find User With This ${userid}`,
          })
        }
      console.log("hii",userDetail);
        return res.status(200).json({
          success:true,
          data:userDetail.courses,
        })

  } catch(error){
         res.status(500).json({
          success:false,
           message:"error while  Fetching User Data",
            error:error.message,
      })
  }
}

exports.updateProfilePicture=async(req,res)=>{
  try{
       //data fetch
       const displayPicture=req.files.displayPicture;
       const userid=req.user.id;

       const uploadImage=await imageUploadToCloudinary(
         displayPicture,
         process.env.FOLDER_NAME,
         1000,
         1000,
       )

       console.log(uploadImage);
   
       const updatedProfile=await User.findByIdAndUpdate(
        {_id:userid},
        {images:uploadImage.secure_url},
        {new:true},
       )
       
       res.status(200).json({
        success:true,
        message:"image updated SuccessFully",
        data:updatedProfile
       })

  } catch(error){
    console.log("error is",error);
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
