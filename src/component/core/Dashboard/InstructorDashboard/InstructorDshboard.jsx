import React, { useEffect, useState } from 'react'
import { apiConnector } from '../../../../services/apiconnector';
import { GetInstructorDshBoardData, fetchInstructorCourse } from '../../../../services/operation/CourseApi';
import {useSelector} from "react-redux"
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import InstructorChart from './InstructorChart';
const InstructorDshboard = () => {
    
    const navigate=useNavigate();
    const [statData,setStatData]=useState(null);
    const [courseData,setCourseData]=useState([]);
    const{token}=useSelector((state)=>state.auth);
    const{user}=useSelector((state)=>state.profile)
    const[loading,setloading]=useState(false);
    useEffect(()=>{
          
        const fetchCour=async()=>{
          setloading(true);
              const respone=await fetchInstructorCourse(token);
              if(respone)
              {
                setCourseData(respone);
              }
              setloading(false);
        }
        fetchCour();
    },[])

    useEffect(()=>{
       const fetchDshboardStat=async()=>{
            const respone=await GetInstructorDshBoardData(token);
            console.log("frontend response",respone)
            if(respone){
              setStatData(respone);
            }
       }
       fetchDshboardStat();
    },[])

    const totalAmount = statData?.reduce(
      (acc, curr) => acc + curr.totalAmountGenerated,
      0
    )
  
    const totalStudents = statData?.reduce(
      (acc, curr) => acc + curr.totalStudent,
      0
    )
    console.log("stat",statData)

  return (
    <div className='text-white '>
          <div className="space-y-2">
              <h2 className="text-2xl font-bold text-richblack-5">Hi {user?.firstName} 👋</h2>
              <p className="font-medium text-richblack-200">Let's start something new</p>
               {
                loading ? (<div className='spinner'></div>)
                : courseData.length > 0 ? (

                    <div>
                    <div className="my-4 flex h-[450px] space-x-4">
                    { totalAmount >0 || totalStudents>0 ? 
                          (<InstructorChart courses={statData}/>) : (
                            <div className="flex-1 rounded-md bg-richblack-800 p-6">
                          <p  className="text-lg font-bold text-richblack-5">Visualize</p>
                          <p className="mt-4 text-xl font-medium text-richblack-50">Not Enough Data To Visualize</p>
                        </div>
                          )
                    }
                           <div className="flex min-w-[250px] flex-col rounded-md bg-richblack-800 p-6">
                             <h2 className="text-2xl font-bold text-richblack-5">Statictics</h2>

                             {/*total courses*/}
                             <div  className="mt-4 space-y-4">
                               <p className="text-lg text-richblack-200">Total Courses</p>
                               <p className="text-3xl font-semibold text-richblack-50 -translate-y-2">{courseData?.length}</p>
                             </div>
                              
                              {/*total student*/}
                              <div>
                                <p className="text-lg text-richblack-200">Total Students</p>
                                <p className="text-3xl font-semibold text-richblack-50">{totalStudents}</p>
                              </div>
                              {/*total amount generated*/}
                              <div>
                                <p className="text-lg text-richblack-200">Total Income</p>
                                <p className="text-3xl font-semibold text-richblack-50">Rs. {totalAmount}</p>
                              </div>
                          </div>
                             
                     </div>        
                           {/*courses*/}
                        <div className="rounded-md bg-richblack-800 p-6">
                        <div  className="flex-col items-center justify-between">
                          <div className='flex justify-between'>
                          <h2 className="text-lg font-bold text-richblack-5">Your Courses</h2>
                          <button onClick={()=>{
                                navigate("/dashboard/my-courses")
                          }} className="text-xs font-semibold text-yellow-50">
                            View All
                          </button>
                          
                          </div>
                            <div className="my-4 flex items-start space-x-6">
                            {
                              courseData?.map((course,index)=>(
                                  <div  key={index} className='w-1/3'>
                                      <img
                                        src={course?.thumbnail}
                                        alt='Your Course Image'
                                        className="h-[201px] w-full rounded-md object-cover"
                                      />
                                      <div  className="mt-3 w-full">
                                      <p className="text-sm font-medium text-richblack-50">{course?.courseName}</p>
                                      </div>
                                    

                                      <div className="mt-1 flex items-center space-x-2">
                                          <p className="text-xs font-medium text-richblack-300">{statData?.[0]?.totalStudent} students</p>
                                          <p className="text-xs font-medium text-richblack-300">|</p>
                                          <p className="text-xs font-medium text-richblack-300">Rs.{course?.price}</p>
                                      </div>
                                  </div>
                              ))
                          }
                            </div>
                        </div>
                        </div>
                </div>
                  
                ) : (
                  <div className="flex-1 rounded-md bg-richblack-800 p-6">
                       <p className="text-lg font-bold text-richblack-5"> You have not created any courses yet</p>
                       <Link to={"/dashboard/add-courses"}>
                        create A course
                       </Link>
                  </div>
                )
               }
             
          </div>
    </div>
  )
}

export default InstructorDshboard


