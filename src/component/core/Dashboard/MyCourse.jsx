import React, { useEffect, useState } from 'react'
import {MdModeEditOutline} from "react-icons/md"
import {AiOutlinePlusCircle} from "react-icons/ai"
import {RiDeleteBin5Line} from "react-icons/ri"
import { useDispatch, useSelector } from 'react-redux'
import { deleteCourseHandler, fetchInstructorCourse, getAllCourses } from '../../../services/operation/CourseApi'
import {BiTime} from "react-icons/bi"
import {BsCheck} from "react-icons/bs"
import { useNavigate } from 'react-router-dom'
import { setCourse, setEditCourse } from '../../../slices/courseSlice'
const MyCourse = () => {
    const dispatch = useDispatch();
    const{token}=useSelector((state)=>state.auth)
    const {user}=useSelector((state)=>state.profile)
    const[AllCourse,setAllCourse]=useState();
    const navigate=useNavigate();
     const GetAllCourse=async()=>{
          try{
             const response=await fetchInstructorCourse(token);
             console.log("my coure res",response);
             setAllCourse(response);
          } catch(error){
            console.log("Unable to Fetch  Courses");
          }
     }
 console.log("all course is",AllCourse)
  useEffect(()=>{
    GetAllCourse();
  },[])
    const deleteCourseHandle=async(courseId)=>{
       const res=await deleteCourseHandler({
        courseId
       },token)
       setAllCourse(res);
    }
    
     

  return (
    <div className=''>
         <div className='flex justify-between text-white text-3xl'>
            <p className=" font-semibold">My Course</p>
            <button className='flex items-center gap-2 bg-yellow-50 hover:bg-yellow-70 text-black text-xl py-2 px-4 rounded'>
                 <AiOutlinePlusCircle/>
                 <p onClick={()=>{
                   navigate("/dashboard/add-course")
                 }}>New</p>
            </button>
         </div>

         {
            !AllCourse ? (
                <div>
                   spinner...
                </div>
            ) : !AllCourse.length ? (
                <p>You have not Created  any course yet</p>
            ) : (
                <div className='flex flex-col lg:mt-7'>
                     <div className='text-richblack-100 flex lg:flex-row justify-between'>
                        <p>courses</p>
                      <div className='flex flex-row gap-10'>
                      <p>Durations</p>
                        <p>Price</p>
                        <p>Actions</p>
                      </div>
                     </div>

                     {
                        AllCourse.map((course,index)=>(
                         
                            <div className=' flex lg:flex-row justify-between text-white mt-5'>
                                  <div className='flex lg:flex-row gap-5'>
                                    <img src={course.thumbnail} height="148" width="221" className='rounded-md'/>
                                    <div className='gap-4'>
                                         <h2 className='text-2xl'>{course.courseName}</h2>
                                         <p className='text-richblack-100 lg:max-w-[70%] lg:mt-2'>{course.courseDescription}</p>
                                         <div className={`flex flex-row items-center gap-3 bg-richblack-700 lg:mt-3
                                           font-bold py-2 px-4 rounded-full w-fit ${course.status === "Draft" ? "text-pink-100" : "text-yellow-50"}`}>
                                         
                                           {
                                             course.status==="Draft" ?<BiTime/>
                                             : <BsCheck/>
                                           }
                                            <p>{course.status}</p>
                                         </div>
                                        
                                    </div>
                                  </div>
                                
                              <div className='flex '>
                                   
                                     <div className='lg:-translate-x-16 translate-y-10 text-richblack-200'>
                                      6s
                                    </div>

                                    <div className='lg:mr-14 text-richblack-100 lg:mt-10'>
                                      {course.price}
                                    </div>

                                    <div className='flex text-richblack-100 lg:-mt-2'>
                                   <button
                                        onClick={()=>{
                                          navigate(`/dashboard/edit-course/${course._id}`);
                                          dispatch(setEditCourse(true));
                                          dispatch(setCourse(course));
                                        }}>
                                        <MdModeEditOutline/>
                                   </button> 

                                    <button onClick={()=>{deleteCourseHandle(course._id)}}>
                                        <RiDeleteBin5Line/>
                                    </button>
                                        
                                    </div>
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

export default MyCourse