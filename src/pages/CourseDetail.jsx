import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import GetAvgRating from '../utils/avgRating'
import RatingStars from '../component/common/RatingStar'
import {AiOutlineDown} from "react-icons/ai"
import { useNavigate, useParams } from 'react-router-dom'
import { fetchCourse } from '../services/operation/CourseApi'
import {BsFillCameraVideoFill, BsFillCaretRightFill} from "react-icons/bs"
import { buyCourse } from '../services/operation/studentFeaturepi'
import ConfirmationModal from '../component/common/ConfirmationModal'
import { ACCOUNT_TYPE } from '../utils/constant'
import {FaShareSquare} from "react-icons/fa"
import {CopyToClipboard} from "copy-to-clipboard"
import { addToCart } from '../slices/cartSlice'
import { toast } from 'react-hot-toast'
import {formattedDate} from "../../src/utils/dateFormater"
import {BiInfoCircle} from "react-icons/bi"
import {HiOutlineGlobeAlt} from "react-icons/hi"
import {ReactMarkdown} from "react-markdown/lib/react-markdown"
import copy from "copy-to-clipboard"
import Footer from '../component/common/Footer'
const CourseDetail = () => {
    
    const[active,setActive]=useState(null);
    const {courseId}=useParams();
    const[course,setCourse]=useState([])
    const[AvgRating,setavgRating]=useState(0);
    const {token}=useSelector((state)=>state.auth);
    const{user}=useSelector((state)=>state.profile);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const[confirmationModal,setconfirmationModal]=useState(null);
    const {TotalNoOfLecture}=useSelector((state)=>state.ViewCourse)
   

    useEffect(()=>{
        const response= GetAvgRating(course?.ratingAndReview)
        if(response){
            setavgRating(response);
        }
    },[course])
   
    useEffect(()=>{
        const fetchCourseDetail=async()=>{
             try{
                const response=await fetchCourse({courseId});
                console.log("response of fetch course details",response)
                if(response){
                    setCourse(response);
                }
             } catch(error){
                 console.log(error);
             }
        }

        fetchCourseDetail();
    },[courseId])

  
     
    const handleBuyCourse=async(course)=>{
        if(user?.accountType === ACCOUNT_TYPE.INSTRUCTOR){
            toast.error("You Are Instructor You Cant Buy A Course")
            return;
        }

      if (course?.studentEnrolled?.includes(user?._id)) {
        navigate("/dashboard/enrolled-courses");
        return ;
        }

         if(token){
           buyCourse(token, [courseId], user, navigate, dispatch)
         }
         else{
             setconfirmationModal({
                 text1:"You are not logged in!",
                 text2:"Please login to Purchase Course.",
                 btn1Text:"Login",
                 btn2Text:"Cancel",
                 btn1handler:()=> navigate("/login"),
                 btn2handler:()=>setconfirmationModal(null)
             })
         }

    }

    //total lecture
    const[TotalLecture,setTotalLecture]=useState(0);
    useEffect(()=>{
        let totalCount=0;
        course?.courseContent?.forEach((sec) => {
             totalCount+=sec?.subSection?.length
        });
        setTotalLecture(totalCount);
    },[course])
    
   //total video length
   const[totalSec,setTotalSec]=useState(0);

   useEffect(()=>{

        let totalSecOfVideo=0;
        course?.courseContent?.forEach((sec)=>{
             sec?.subSection?.forEach((subsec)=>{
                 totalSecOfVideo+=subsec?.timeDuration
             })
        })
      
        setTotalSec(Math.round(totalSecOfVideo))
   },[course])
   
    const handleAddToCart=()=>{
        if(user?. accountType === ACCOUNT_TYPE.INSTRUCTOR){
            toast.error("You Are Instructor You Cant Buy A Course")
            return;
        }
        else{
         dispatch(addToCart(course));
        }
    }
    const handleShare=()=>{
        copy(window.location.href);
        toast.success("Link Copied to Clipboard")
    }
    console.log("course",course)
  return (
    <div className={`relative w-full bg-richblack-800`}>
    
    <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative text-white lg:flex">
          
       
        <div className=" relative mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px] mt-24 gap-4">
              

            <p className="text-4xl font-bold text-richblack-5 sm:text-[42px]">{course.courseName}</p>
            <p className='text-richblack-200'>{course.courseDescription}</p>

            {/*rating*/}
            <div className="text-md flex flex-wrap items-center gap-2">
                <span className='text-yellow-50'>{AvgRating || 0}</span>
                <RatingStars Review_Count={AvgRating}/>
                <p>{`(${course?.ratingAndReview?.length}) Reviews`}</p>
                <p>{`${course?.studentEnrolled?.length} Student Enrolled`}</p>
            </div>

            <p>Created by {course?.instructor?.firstName} {course?.instructor?.lastName}</p>
          
            <div className="flex flex-wrap gap-5 text-lg">
                 <p className="flex items-center gap-2">
                    {" "}
                    <BiInfoCircle/> Created at {formattedDate(course?.createdAt)}
                 </p>
                 <p className="flex items-center gap-2">
                    {" "}
                    <HiOutlineGlobeAlt/> English
                 </p>
            </div>
            
             <div>
             <div className='bg-richblack-900  ml-[-9%] mt-20 '>
                   {/*WHAT YOU WILL LEARN*/}
            <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]  translate-y-5  ">
                 <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
                    <div  className="my-8 border border-richblack-600 p-8">
                        <p className="text-3xl font-semibold">What You WILL Learn</p>
                        <div className='mt-5'>
                             <ReactMarkdown>{course?.whatYouWillLearn}</ReactMarkdown>
                        </div>
                    </div>
                 </div>
            </div>

            {/*COURSE CONTENT*/}
                <div className="max-w-[830px] flex flex-col gap-3 ml-[6%] ">
                    <h2 className="text-[28px] font-semibold">Course Content</h2>

                    <div className="flex flex-wrap justify-between gap-2">
                        <div className='flex gap-2'>
                            <p>{course?.courseContent?.length} sections{`(s)`}</p>
                            <p>{TotalLecture} {`lecture(s)`}</p>
                            <p>{`${totalSec}s total Length`}</p>
                        </div>
                    </div>
                    {/*lecture */}
                    <div>
                        {
                            course?.courseContent?.map((data,index)=>(
                                <div key={index} className=''>
                                <div className='flex items-center bg-richblack-700 w-[90%] py-4 rounded '>
                                    <AiOutlineDown className='translate-x-2'/>
                                    <p className=' w-[1200px]  translate-x-6'>{data.sectionName}</p>
                                    <p className='ml-[70%] text-yellow-50 -translate-x-4'>{data?.subSection?.length}{`lecture(s)`}</p>
                                    </div>
                                    <div>
                                        {
                                            data?.subSection?.map((subsection,index)=>(
                                            <div key={index} className='flex items-center gap-3  border border-richblack-600 h-fit py-8 w-[46.4rem]'>
                                                <BsFillCameraVideoFill className='ml-4'/>
                                                <p className='font-semibold'>{subsection.title}</p>
                                            </div>
                                            ))
                                            }
                                    </div>
                                 </div>
                                ))
                            }
                            
                        </div>
                    </div>

                    {/*author*/}
                        <div className="mb-12 py-4 ml-[10%]">
                        <h2 className="text-[28px] font-semibold">Author</h2>
                        <div  className="flex items-center gap-4 py-4">
                            <img
                                src={course?.instructor?.images}
                                alt={course?.instructor?.firstName}
                                className="h-14 w-14 rounded-full object-cover"
                            />
                            <p className='text-lg'>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                        </div>
                        <p className='text-yellow-50'>
                            {course?.instructor?.about}
                        </p>
                        </div>
                </div>

             </div>

             {/*right section*/}
        
            <div  className={`absolute flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5  translate-x-[50rem] -translate-y-4`}>
                <img
                    src={course.thumbnail}
                    alt='image'
                    className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full"
                />
                <p className="space-x-3 pb-4 text-3xl font-semibold text-richblack-5">Rs. {course.price}</p>
                
                {/*button*/}
                <div className='flex-col '>
                    <button onClick={()=>handleBuyCourse(course)} className='bg-yellow-200 w-[24rem] py-3 rounded-lg text-black'>
                   {course?.studentEnrolled?.includes(user._id)
                        ? "Go to Course"
                        : "Buy Course"}

                    </button>
                    <br></br>
                  {
                      course?.studentEnrolled?.includes(user._id) ??   <button onClick={handleAddToCart} className='bg-richblack-800 w-[24rem] py-3 rounded-lg mt-4 '>
                                Add To Cart
                    </button>
                  }
                </div>

                <p className="pb-3 pt-6 text-center text-sm text-richblack-25">30-Day Money-Back Guarantee</p>

                {/*course include*/}
                <div>
                    <h2 className={`my-2 text-xl font-semibold `}>This Course Includes :</h2>
                  <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100"> 
                        {
                            course?.instructions?.map((data,index)=>(
                                <div key={index} className='flex gap-2 items-center'>
                                <BsFillCaretRightFill />
                                        <p>{data}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
                
                {/*share*/}
                
                    <div onClick={handleShare}
                    className="mx-auto flex items-center gap-2 py-6 text-yellow-100 cursor-pointer ">
                        <FaShareSquare size={15}/>
                        <p>Share</p>
                    </div>
            
            </div>
     </div>
      
    </div>
    
     {
        confirmationModal && (
            <ConfirmationModal Modaldata={confirmationModal}/>
        )
     }
     <Footer/>
 </div>
  )
}

export default CourseDetail