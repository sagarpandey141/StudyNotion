import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import {AiOutlineLeft} from "react-icons/ai"
import { fetchCourse } from '../../../services/operation/CourseApi';
import {AiFillCaretDown} from "react-icons/ai"
import { useEffect } from 'react';
import IconBtn from '../../common/IconBtn';
const ViewCourseSidebar = ({setreviewModal}) => {
    
    const navigate=useNavigate();
    const location=useLocation();
    const{sectionId,subSectionId}=useParams()
    const[active,setactive]=useState(null);
    const[videoBar,setVideoBar]=useState(null);
    const {CompletedVideo,TotalNoOfLecture,SectionData,FullCourseData}=useSelector((state)=>state.ViewCourse)
    const handleReviewModal=()=>{
          setreviewModal(true);
      }
  
   useEffect(()=>
   {

    if(!SectionData?.length){
         return;
    }
      const currentSectionIndex=SectionData?.findIndex(
        (data)=>data._id===sectionId
      )

      const currentSubSectionIndex=SectionData[currentSectionIndex]?.subSection?.findIndex(
        (data)=>data._id===subSectionId
      )

      const activeSubSectionId=SectionData[currentSectionIndex]?.subSection[currentSubSectionIndex]?._id
      //set current section id
      setactive(SectionData?.[currentSectionIndex]?._id);
      //set sub section id
      setVideoBar(SectionData?.[currentSectionIndex]?._id)
   },[SectionData,FullCourseData,location.pathname])
   
   
 
  return (
    <div  className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
              {/*button icon*/}
              <div className="flex w-full items-center justify-between ">
                  <div onClick={()=>
                  navigate("dashboard/enrolled-courses")}>
                        <AiOutlineLeft/>
                  </div>
                   
                   <div>
                       <IconBtn onClick={handleReviewModal} text="Add Review">
                            
                       </IconBtn>
                   </div>
              </div>
              
              {/*data*/}
              <p>My Course</p>
              <p className="text-sm font-semibold text-richblack-500">{CompletedVideo?.length || 0} /{TotalNoOfLecture}</p>

              {/*section && subsection*/}
              <div  className="h-[calc(100vh - 5rem)] overflow-y-auto">
                    {
                      SectionData?.map((section,index)=>(
                        
                           <div key={index}
                             className="mt-2 cursor-pointer text-sm text-richblack-5"
                            onClick={()=>setactive(section?._id)}>
                                 {/*section name*/}
                                <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4 w-[18rem]">
                                   <p className="w-[90%] font-semibold">{section?.sectionName}</p>
                                   <AiFillCaretDown />
                                </div>

                                {/*subsection*/}
                                {
                                  section?._id===active  && (
                                    <div className="transition-[height] duration-500 ease-in-out">
                                        {
                                        section?.subSection?.map((topic,index)=>(
                                            <div key={index}
                                              className={`flex gap-3  px-5 py-2 ${
                                             videoBar === topic._id
                                            ? "bg-yellow-200 font-semibold text-richblack-800"
                                            : "hover:bg-richblack-900"
                                        } `}
                                            onClick={()=>{
                                               navigate(`/view-course/${FullCourseData?._id}/section/${section?._id}/sub-section/${topic?._id}`)
                                            }}>
                                                   <input
                                                    type='checkbox'
                                                    checked={CompletedVideo.includes(topic?._id)}
                                                    onChange={()=>{}}
                                                   />
                                                   <span>
                                                      {topic.title}
                                                   </span>
                                            </div>
                                           
                                        ))
                                       }
                                    </div>
                                  )
                                }
                           </div>
                      ))
                    }
              </div>
          </div>    
    </div>
  )
}

export default ViewCourseSidebar