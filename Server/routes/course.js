const express=require("express");
const router=express.Router();

//import Course Controller
const{
    createCourse,
    courseFind,
    getAllCourseDetail,
    editCourse,
    getFullCourseDetails,
    deleteCourse,
    InstructorDashboardData,
    getInstructorCourses
}=require("../controller/course");

//import Category controller

const{
    createCategory,
    showAllCategory,
    categoryPageDetail,

}=require("../controller/Category");

//import rating and review

const {
    createRating,
    getAverageRating,
    getAllRating,
}=require("../controller/ratingAndReview");

//import section controller

const{
    createSection,
    updateSection,
    deleteSection,
}=require("../controller/section");

//import subsection controller

const{
    createsubSection,
    updateSubSection,
    deletesubSection,

}=require("../controller/subSection");

const{
    updateCourseProgress
}=require("../controller/courseProgress")

const{Auth,Student,isAdmin,isInstructor}=require("../middleware/auth");


// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

router.post("/createCourse",Auth,isInstructor,createCourse);
router.post("/addSection",Auth,isInstructor,createSection);
router.post("/updateSection",Auth,isInstructor,updateSection);
router.post("/deleteSection",Auth,isInstructor,deleteSection);
router.post("/deleteSubSection",Auth,deletesubSection);
router.post("/updateSubSection",Auth,updateSubSection);
router.post("/addsubSection",Auth,isInstructor,createsubSection);
router.post("/editCourse",Auth,editCourse)
router.get("/getAllCourses",courseFind);
router.post("/getcourseDetails",getAllCourseDetail);
router.post("/getfullcoursedetail",Auth,getFullCourseDetails)
router.post("/deleteCourse",Auth,deleteCourse)
router.get("/InstructorDashboardData",Auth,InstructorDashboardData)
router.get("/getInstructorCourses",Auth,getInstructorCourses);
router.post("/updateCourseProgress",Auth,Student,updateCourseProgress)
// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************

router.post("/createCategory",Auth,isAdmin,createCategory);
router.get("/showAllCategories",showAllCategory);
router.post("/getCategoryPageDetails",categoryPageDetail);


// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************

router.post("/createRating", Auth,Student, createRating)
router.get("/getAverageRating",getAverageRating);
router.get("/getRatingandReviews",getAllRating);

module.exports=router;


