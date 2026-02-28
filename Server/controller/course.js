const User=require("../model/User");
const Category=require("../model/category");
const { imageUploadToCloudinary } = require("../utils/imageUpload");
require("dotenv").config();
const Course=require("../model/courses");
const CourseProgress=require("../model/courseprogress");
const { convertSecondsToDuration } = require("../utils/sectoDuration");
const courses = require("../model/courses");
const Section = require("../model/Section");
const subSection = require("../model/subSection");

exports.createCourse=async(req,res)=>{
   try{
     //data fetch
     let{courseName, courseDescription, whatYouWillLearn, price,tag, category,status,instructions}=req.body;
      
     const thumbnail=req.files.thumbnailImage;
     
    // console.log(courseName, courseDescription, whatYouWillLearn, price, category,status,instructions);
     //valiation
     //TODO ADD VELIDATION ON THUMBNAIL AFTER COMPLETING THUMBNAIL
     if(!courseName || !courseDescription || !whatYouWillLearn || ! price || !category || !instructions){
       return  res.status(401).json({
             success:false,
             message:"All Field Are Required",
         })
     }
      
     if (!status || status === undefined) {
        status = "Draft";
    }

     //find instructor
     const userId=req.user.id;
     const instructorDetails = await User.findById(userId, {
        accountType: "Instructor",
    });
   
  
 
     if(!instructorDetails){
         res.status(401).json({
             success:false,
             message:"Instructor Detail Not Found",
         })
     }
     const categoryID=category.trim();
     const Categorycheck=await Category.findById(categoryID);
 
     if(!Categorycheck){
       return  res.status(401).json({
             success:false,
             message:"Category not Found"
         })
     }
 
     //upload to cloudinaryKO
      const thumbnailImage=await imageUploadToCloudinary(thumbnail,process.env.FOLDER_NAME);
      if (typeof instructions === "string") {
        try {
          instructions = JSON.parse(instructions); // converts '["unique"]' -> ["unique"]
        } catch (err) {
          instructions = [];
        }
      }
    
     const newCourse=await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn:whatYouWillLearn,
            Category:Categorycheck._id,
            thumbnail:thumbnailImage.secure_url,
            price,
            tag:tag,
            status:status,
            instructions:instructions,
     })
  
     await User.findByIdAndUpdate(
         {_id:instructorDetails._id},
         {
             $push:{
                 courses:newCourse._id,
             }
         },
         {new:true},
     )
       
     await Category.findByIdAndUpdate(
         {_id:Categorycheck._id},
         {
             $push:{
                 course:newCourse._id,
             }
         },
         {new:true},
     )
 
       //return response
       return res.status(200).json({
         success:true,
         message:"Course Created Successfully",
         data:newCourse,
     });
 
   } catch(err){
    console.error(err);
    return res.status(500).json({
        success:false,
        message:'Failed to create Course',
        error: err.message,
       })
   }
}

exports.courseFind=async(req,res)=>{

    try{
        const data=await Course.find({},{
            courseContent:true,
            courseDescription:true,
            courseName: true,
            status:true,
            price: true,
            thumbnail: true,
            instructor: true,
            ratingAndReviews: true,
            studentsEnroled: true,
        })
        .populate("courseContent")
        .populate("instructor")
        .exec();
        return res.status(200).json({
            success:true,
            message:'Data for all courses fetched successfully',
            data:data,
        })
    } catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Cannot Fetch course data',
            error:error.message,
        })
    }
}

exports.getAllCourseDetail=async(req,res)=>{
    try{
           //data fetch
           const {courseId}=req.body;
          //db call
      
          const fetchedCourse=await Course.findById(
            courseId)
            .populate({
                 path:"instructor",
                 populate:{
                    path:"additionalDetail"
                 }
            }
        )
        .populate("Category")
        .populate("ratingAndReview")
        .populate(
            {
                path:"courseContent",
                populate:{
                    path:"subSection"
                }
            }
        )
        .exec();

        if(!fetchedCourse){
            return res.status(500).json({
                success:false,
                message:`Could Not Find The Course With This ${courseId}`
            })
        }
      console.log("fetched course",fetchedCourse)
        res.status(200).json({
            success:true,
            message:"Course Detail Fetched SuccessFully",
            data:fetchedCourse,
        })
            
          
    } catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body
    const userId = req.user.id
   
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetail",
        },
      })
      .populate("Category")
      .populate("ratingAndReview")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()
     
    
    let courseProgressCount = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    })
   
  
    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })
   

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
      
    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideo
          ? courseProgressCount?.completedVideo
          : [],
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}


exports.editCourse = async (req, res) => {
    try {
      const { courseId } = req.body
      const updates = req.body
      console.log("updates",updates)
      const course = await Course.findById(courseId)
  
      if (!course) {
        return res.status(404).json({ error: "Course not found" })
      }
  
      // If Thumbnail Image is found, update it
      if (req.files) {
       
        const thumbnail = req.files.thumbnail
        const thumbnailImage = await uploadImageToCloudinary(
          thumbnail,
          process.env.FOLDER_NAME
        )
        course.thumbnail = thumbnailImage.secure_url
      }
  
      // Update only the fields that are present in the request body
      //FINDOUT WHY
      for (const key in updates) {
        if (updates.hasOwnProperty(key)) {
          if (key === "tag" || key === "instructions") {
            course[key] = JSON.parse(updates[key])
          } else {
            course[key] = updates[key]
          }
        }
      }
  
      await course.save()
  
      const updatedCourse = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetail",
          },
        })
        .populate("Category")
        .populate("ratingAndReview")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
  
      res.json({
        success: true,
        message: "Course updated successfully",
        data: updatedCourse,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }

exports.deleteCourse=async(req,res)=>{
    try{
      const{courseId}=req.body;
 
      const course=await courses.findById(courseId);
      if(!course){
        return res.json("Course Doesnt Found")
      }
      //delete all enrolled student 
      const StudentEnrolled=course.studentEnrolled
      for(const studentId of StudentEnrolled){
          await User.findByIdAndUpdate(studentId,{
            $pull:{
              courses:courseId
            }
          })
      }

      //delete section and sub section
      const couseSection=course.courseContent
      for( const sectionId of couseSection){
        const section=await Section.findById(sectionId);
        if(section){
        const subsection=section.subSection;
        for(const subsectionId of  subsection){

          await subSection.findByIdAndDelete(subsectionId);
          }
        }
        await Section.findByIdAndDelete(sectionId);
      }

      //delete couse
      await Course.findByIdAndDelete(courseId);
      const data= await Course.find({});
      return res.status(200).json({
        success:true,
        data:data,
        message:"Course Deleted SuccessFully"
      })
    } catch(error){
       return res.json(500).json({
        success:false,
        message:"error in deleting course",
        error:error.message
       })
    }
  }
exports.getInstructorCourses = async (req, res) => {
    try {
      // Get the instructor ID from the authenticated user or request body
      const instructorId = req.user.id
   
      // Find all courses belonging to the instructor
      const instructorCourses = await Course.find({
        instructor: instructorId,
      }).sort({ createdAt: -1 }).populate({
         path:"courseContent",
         populate: {
            path:"subSection"
         }
      }).exec()
      
      // Return the instructor's courses
     
     return res.status(200).json({
        success: true,
        data: instructorCourses,
      })
    } catch (error) {
      console.error(error)
     return res.status(500).json({
        success: false,
        message: "Failed to retrieve instructor courses",
        error: error.message,
      })
    }
  }

exports.InstructorDashboardData=async(req,res)=>{
    try{
      const courseDetail=await Course.find({instructor:req.user.id});

      const courseData=courseDetail.map((course)=>{
          const totalStudent=course.studentEnrolled.length;
          const totalAmountGenerated=totalStudent*course.price;
          
          //course data with stats
          const courseDataWithStats={
               _id:course._id,
               courseName:course.courseName,
               courseDesc:course.courseDescription,
               totalStudent,
              totalAmountGenerated
          }
          return courseDataWithStats
     })
     
    return res.status(200).json({
       success:true,
       data:courseData
     })
    } catch(error){
        console.log("error",error.message);
        return res.status(500).json(
          {
            success:false,
            message:error.message
          }
        )
    } 

        
}