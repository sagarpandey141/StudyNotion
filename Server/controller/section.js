const Section=require("../model/Section");
const { populate } = require("../model/User");
const Course=require("../model/courses");
const subSection = require("../model/subSection");

exports.createSection=async(req,res)=>{
     try{
        //data fetch
        const {sectionName,courseid}=req.body;
        //validation
           if(!sectionName || !courseid){
             return res.status(401).json({
                success:false,
                message:"All Field Are Required",
             })
           }
        //create
        const createSec=await Section.create({
            sectionName
        });
        //course model ma update
        
        const updatecourse=await Course.findByIdAndUpdate(
            courseid,
            {
                $push:{
                    courseContent:createSec._id,
                }
            },
            {new:true},
        )   
        .populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        })
        .exec();
         //HW: use populate to replace sections/sub-sections both in the updatedCourseDetails
        //res

        res.status(200).json({
            success:true,
            message:"Section created successFully",
            updatecourse,
        })
     } catch(err){
        console.log(err);
         res.status(500).json({
            success:false,
            message:"error while Creating Section",
           error:err,
         })
     }
}

//check
exports.updateSection=async(req,res)=>{
    try{
          //data fetch
          const {sectionName,sectionId,courseId}=req.body;
          //validation
          
          
        const updatedsec =await Section.findByIdAndUpdate(
            sectionId,
            {
              sectionName,
            },
            {new:true},
          )
          
          const course=await Course.findById(courseId)
          .populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
          }).exec();

          res.status(200).json({
            
            success:true,
            message:updatedsec,
            data:course,
            
          })
         
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"error while Creating Section",
           error:error,
         })
    }
}

exports.deleteSection=async(req,res)=>{
    try{
        //data fetch
        const {sectionId,courseId}=req.body;

        await Course.findByIdAndUpdate(courseId,{
            $pull:{
                courseContent:sectionId,
            }
        }) 

        const section=await Section.findById(sectionId);

        if(!section){
            return res.status(400).json({
                success:false,
                message:"Section Not Found",
            })
        }
     
        //delete sub section
        await subSection.deleteMany({_id:{$in:section.subSection}})

        await Section.findByIdAndDelete(sectionId);

        const course=await  Course.findById(courseId).populate({
         path:"courseContent",
         populate: {
               path:"subSection"
         }
        })
        .exec();

        res.status(200).json({
            success:true,
            message:"Section Deleted SuccessFully",
            data:course
        })

    } catch(err){
        res.status(500).json({
            success:false,
            message:"error while Deleting Section",
           error:err.message,
         })
    }
}