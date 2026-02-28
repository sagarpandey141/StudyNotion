const SubSection=require("../model/subSection");
const section=require("../model/Section");
const {imageUploadToCloudinary}=require("../utils/imageUpload");
const Section = require("../model/Section");
require("dotenv").config();

exports.createsubSection=async(req,res)=>{
    try{
        //data fetch
        const{title,description,sectionid}=req.body;
        //extract files
        const videoFile=req.files.video;
        //validation
        if(!title  || ! description  || !sectionid || !videoFile){
            return res.status(401).json({
                success:false,
                message:"All Field Are Required",
             })
        }
        console.log("videofile is",videoFile);
        //upload videofile to cloudinary
        const uploadvideoCloud=await imageUploadToCloudinary(videoFile,process.env.FOLDER_NAME);
         //create subsection
         const savesubsection=await SubSection.create({
            title:title,
            timeDuration:`${uploadvideoCloud.duration}`,
            description:description,
            videoUrl:uploadvideoCloud.secure_url,
         })
         // update section
      const updatedSection =await section.findByIdAndUpdate(
            {_id:sectionid},
            {
                $push:{
                    subSection:savesubsection._id,
                }
            },
            {new:true},
         ).populate("subSection")
         //res
        return res.status(200).json({
            success:true,
            message:"successFully created sub Section",
            data:updatedSection
         })


    } catch(error){
        res.status(500).json({
            success:false,
            message:"error while Creating subSection",
           error:error.message,
         })
    }
}

exports.updateSubSection=async(req,res)=>{
    try{
          //data feth
          const {title,description,subSectionId,sectionId}=req.body;
          const subSection=await SubSection.findById(subSectionId)
          //update
          if (!subSection) {
            return res.status(404).json({
              success: false,
              message: "SubSection not found",
            })
          }
        
          if (title !== undefined) {
            subSection.title = title
          }
      
          if (description !== undefined) {
            subSection.description = description
          }
         
          if (req.files && req.files.videoFile !== undefined) {
            const video = req.files.videoFile
            const uploadDetails = await imageUploadToCloudinary(
              video,
              process.env.FOLDER_NAME
            )
           
            subSection.videoUrl = uploadDetails.secure_url
            subSection.timeDuration = `${uploadDetails.duration}`
          }
          
          await subSection.save()
           
          const updateSection=await Section.findById(sectionId).populate("subSection")
      
          res.status(200).json({
            success:true,
            message:"successFully Updated sub Section",
            data:updateSection
         })

    } catch(error){
        res.status(500).json({
            success:false,
            message:"error while Updating subSection",
           error:error,
         })
    }
}


exports.deletesubSection=async(req,res)=>{
    try{
         //data fetch
         const { subSectionId, sectionId } = req.body;
         await section.findByIdAndUpdate(
           { _id: sectionId },
           {
             $pull: {
              subSection: subSectionId,
             },
           }
         )
         const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })
     
         if (!subSection) {
           return res
             .status(404)
             .json({ success: false, message: "SubSection not found" })
         }

         const updatedSection=await Section.findById(sectionId).populate("subSection");
        return res.status(200).json({
             success:true,
             message:'Sub-Section Deleted SuccessFully',
             data:updatedSection
         })

    } catch(error){
      console.log(error);
        res.status(500).json({
            success:false,
            message:"error while Deleting Sub-Section",
           error:error.message,
         })
    }
}

