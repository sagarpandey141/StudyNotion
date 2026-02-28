import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { getAllEnrolledCourses } from '../../../services/operation/profileApi';
import axios from 'axios';
import ProgressBar from '@ramonak/react-progress-bar';
import {  useNavigate } from 'react-router-dom';

const EnrolledCourse = () => {
    const {token}=useSelector((state)=>state.auth)
    const[enrolledcourse,setEnrolledCoure]=useState();
    const[totalSec,setTotalSec]=useState(0);
    const navigate=useNavigate();
    const hasFetched = useRef(false);

    const getEnrolledcourse=async()=>{

         try{
          const response=await getAllEnrolledCourses(token);
          
          setEnrolledCoure(response);
         } catch(error){
          console.log("Unable to Fetch Enrolled Courses");
         }
    }

   useEffect(() => {
  if (!hasFetched.current) {
    getEnrolledcourse();
    hasFetched.current = true;
  }
}, []);
 


  let totalSecOfVideo;
   console.log("enrolled course",enrolledcourse);
  
  return (
    <div className='text-white'>
         <div className="text-3xl text-richblack-50">Enrolled Courses</div>
         {
          !enrolledcourse ? (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center translate-x-2 ">
              <div className='spinner'>
                   <p></p></div>
            </div>
          ) :  !enrolledcourse.length ? (<p className='text-richblack-300'>You have not enrolled in any course yet</p>)
            : (
              <div className="my-8 text-richblack-5">
                 <div className="flex rounded-t-lg bg-richblack-500 ">
                   <p className="w-[45%] px-5 py-3">Course Name</p>
                   <p className="w-1/4 px-2 py-3">Durations</p>
                   <p className="flex-1 px-2 py-3">Progress</p>
                 </div>

                {/*card start*/}
                  {
                    enrolledcourse.map((course,index,arr)=>(
                       <div 
                       className={`flex items-center border border-richblack-700 ${
                        index === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
                      }`}>
                            <div
                                className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                                onClick={()=>
                               navigate(`/view-course/${course?._id}/section/${course?.courseContent[0]?._id}/sub-section/${course?.courseContent[0]?.subSection[0]?._id}`)}>
                                <img src={course.thumbnail}
                                   className="h-14 w-14 rounded-lg object-cover"
                                />
                                <div className="flex max-w-xs flex-col gap-2">
                                  <p className="font-semibold">{course.courseName}</p>
                                  <p  className="text-xs text-richblack-300">{course.courseDescription}</p>
                                </div>
                            </div>

                            <div className="w-1/4 px-2 py-3">
                                    
                            </div>

                            <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                              <p>Progress {course.progressPercentage || 0}%</p>
                              <ProgressBar
                                        completed={course.progressPercentage || 0}
                                        height='8px'
                                        isLabelVisible={false}
                                        />
                            </div>
                       </div>
                    ))
                  }
             
              </div>

            )
       
         }
    </div>
  )
}

export default EnrolledCourse