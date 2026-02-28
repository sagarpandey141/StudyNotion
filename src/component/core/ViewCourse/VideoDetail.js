import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Player } from 'video-react';
import IconBtn from "../../common/IconBtn"
import {AiFillPlayCircle} from "react-icons/ai"
import { MarkLectureCompletion } from '../../../services/operation/CourseApi';
import { setCompletedVideo } from '../../../slices/ViewCourse';
const VideoDetail = () => {
 

  const {courseId,sectionId,subSectionId}=useParams();
  const navigate=useNavigate();
  const location=useLocation();
  const playRef=useRef();
  const dispatch=useDispatch();
  const[loading,setLoading]=useState(false);
  const[videoData,setVideoData]=useState([]);
  const[videoEnded,setVideoEnded]=useState(false);
  const{token}=useSelector((state)=>state.auth)
  const{SectionData,FullCourseData,CompletedVideo}=useSelector((state)=>state.ViewCourse);
  
  useEffect(()=>{
     
    const VideoSpecificData=()=>{
          if(!SectionData?.length){
            return;
          }
          if(!courseId || !sectionId || !subSectionId){
             navigate("/dashboard/enrolled-courses")
          }
          else{
              
            const filterData=SectionData.filter((section)=>section._id===sectionId);
            console.log("filter data",filterData);
            const videoFilterData=filterData?.[0]?.subSection.filter((subsection)=>subsection._id===subSectionId);
             console.log("video fiter",videoFilterData)
            setVideoData(videoFilterData?.[0]);
         
          }
    }

    VideoSpecificData();
  },[SectionData,FullCourseData,location.pathname])
   
  const isFirstVideo=()=>{
       
    const currentSectionIndex=SectionData?.findIndex(
       (data)=>data._id===sectionId
    )

    const currentSubSectionIndex=SectionData[currentSectionIndex]?.subSection?.findIndex(
      (data)=>data._id===subSectionId
    )

    if(currentSectionIndex===0 && currentSubSectionIndex===0){
      return true;
    }
    return false;
  }
  
  const isLastVideo=()=>{
       
    const currentSectionIndex=SectionData?.findIndex(
       (data)=>data._id===sectionId
    )

    const subSectionLength=SectionData?.[currentSectionIndex].subSection.length;

    const currentSubSectionIndex=SectionData[currentSectionIndex]?.subSection?.findIndex(
      (data)=>data._id===subSectionId
    )

    if(currentSectionIndex===SectionData.length-1 && currentSubSectionIndex===subSectionLength-1){
      return true;
    }
    return false;
  }
 
  const goToNextVideo=()=>{
    const currentSectionIndex=SectionData?.findIndex(
          (data)=>data._id===sectionId
      )

      const subSectionLength=SectionData?.[currentSectionIndex].subSection.length;

      const currentSubSectionIndex=SectionData[currentSectionIndex]?.subSection?.findIndex(
        (data)=>data._id===subSectionId
      )

      if(currentSubSectionIndex !== subSectionLength-1){
        //same section next video
        const nextSubSectionId=SectionData[currentSectionIndex]?.subSection[currentSubSectionIndex+1]._id;
        //navigate
        navigate(`view-course/${courseId}/section/${SectionData._id}/sub-section/${nextSubSectionId}`)
      }
      else{
        //next section first video
        const nextSectionid=SectionData?.[currentSectionIndex+1]._id;
        const nextSubSectionId=SectionData?.[nextSectionid].subSection[0]._id;
        //navigate
        navigate(`view-course/${courseId}/section/${nextSectionid}/sub-section/${nextSubSectionId}`)
      }
  }
     
  const gotoPrevVideo=()=>{
        const currentSectionIndex=SectionData?.findIndex(
          (data)=>data._id===sectionId
      )

      const subSectionLength=SectionData?.[currentSectionIndex].subSection.length;

      const currentSubSectionIndex=SectionData[currentSectionIndex]?.subSection?.findIndex(
        (data)=>data._id===subSectionId
      )

      if(currentSubSectionIndex !== 0){
        //same section prev video
        const PrevSubSectionId=SectionData[currentSectionIndex]?.subSection[currentSubSectionIndex-1]._id;
        //navigate
        navigate(`view-course/${courseId}/section/${SectionData._id}/sub-section/${PrevSubSectionId}`)
      }
      else{
            //prev section last video
        const prevSectionid=SectionData?.[currentSectionIndex-1]._id;
        const prevSubSectionId=SectionData?.[prevSectionid].subSection[currentSubSectionIndex-1]._id;
        //navigate
        navigate(`view-course/${courseId}/section/${prevSectionid}/sub-section/${prevSubSectionId}`)
      }
  }

  const handleLectureCompletion=async()=>{
    console.log("hii")
              const res=await MarkLectureCompletion({
                 courseId:courseId , subsectionId:subSectionId
              },token)

              if(res){
                  dispatch(setCompletedVideo(subSectionId))
              }
  }
  return (
    <div className="flex flex-col gap-5 text-white">
         {
          !videoData ? (
            <div>
                  Video Not Found
            </div>
          ) : (
            <div >
                     <Player
                        ref={playRef}
                        aspectRatio="4:3"
                        playsInline
                        onEnded={()=>setVideoEnded(true)}
                        src={videoData?.videoUrl}
                     >
                     <AiFillPlayCircle className=''/>
                      
                    {
                      videoEnded && (
                        <div
                      style={{
                      backgroundImage:
                        "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
                    }}
                    className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter">
                              {
                                !CompletedVideo?.includes(subSectionId) && (
                                  <IconBtn
                                      disabled={loading}
                                      onClick={()=>handleLectureCompletion()}
                                      text={!loading? "Mark As Completed" : "Loading"}
                                      customClasses="text-xl max-w-max px-4 mx-auto"

                                  />
                                )
                              }

                              <IconBtn
                                disabled={loading}
                                onClick={()=>{
                                  if(playRef?.current) {
                                         playRef.current?.seek(0);
                                         setVideoEnded(false);
                                    }
                                }}
                                text="ReWatch"
                                customClasses="text-xl max-w-max px-4 mx-auto mt-2"
                              />

                              <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                                  {
                                     !isFirstVideo() && (
                                      <div>
                                            <button>
                                                Prev
                                            </button>
                                      </div>
                                     )
                                  }
                                  {
                                    !isLastVideo && (
                                      <div>
                                          <button>
                                               Next
                                          </button>
                                      </div>
                                    )
                                  }
                              </div>
                        </div>
                      )
                    }

                  
                     </Player>
              
            </div>
          )
         }

         <p className="mt-4 text-3xl font-semibold">{SectionData?.sectionName}</p>
        <p className='pt-2 pb-6'>{SectionData?.description}</p>
    </div>
  )
}

export default VideoDetail