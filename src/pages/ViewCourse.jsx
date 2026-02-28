import React, { useState } from 'react'
import { Outlet, useParams } from 'react-router-dom';
import ViewCourseSidebar from '../component/core/ViewCourse/ViewCourseSidebar';
import ReviewSidebarModal from '../component/core/ViewCourse/ReviewSidebarModal';
import { setCompletedVideo, setCourseSectionData, setEntireCourseData ,settotalNoOfLecture} from '../slices/ViewCourse';
import { editFullCourseDetails } from '../services/operation/CourseApi';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
const ViewCourse = () => {

    const[reviewModal,setreviewModal]=useState(false);
    const {token}=useSelector((state)=>state.auth)
    const {courseId}=useParams();
    const dispatch=useDispatch();
    useEffect(() => {
      const getFullCourse=async()=>{
             try{
               const res=await editFullCourseDetails(courseId,token);
               console.log("res",res);
               if(res){
                  dispatch(setCourseSectionData(res?.courseDetails?.courseContent));
                  dispatch(setEntireCourseData(res?.courseDetails));
                  {/*doubt*/}
                 dispatch(setCompletedVideo(res?.completedVideos))
                let totalLecture=0;
                res?.courseDetails?.courseContent?.forEach((sec)=>{
                   totalLecture+=sec.subSection.length;
                })
                dispatch(settotalNoOfLecture(totalLecture));
               }
           } catch(error){
             console.log(error.message);
           }
      }

      getFullCourse();
   }, [])


  return (
    <div className='text-white'>
          <div className="relative flex min-h-[calc(100vh-3.5rem)]">           
                <ViewCourseSidebar setreviewModal={setreviewModal}/>
                <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
                    <div className='mx-6'>
                    <Outlet/>
                    </div>
                </div>
          </div> 
          {
            reviewModal && (
              <ReviewSidebarModal setreviewModal={setreviewModal}
            />)
          }      
    </div>
    
  )
}

export default ViewCourse