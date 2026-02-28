import { useEffect, useState } from "react";
import RenderSteps from "../addCourse/RenderSteps";
import { editFullCourseDetails } from "../../../../services/operation/CourseApi";
import { useDispatch, useSelector } from "react-redux";
import { setCourse, setEditCourse } from "../../../../slices/courseSlice";
import { useParams } from "react-router-dom";


export default  function EditCourse(){
    
    const dispatch=useDispatch();
    const {courseId}=useParams();
    const{course}=useSelector((state)=>state.course)
    const{token}=useSelector((state)=>state.auth)
   const[loading,setLoading]=useState(false)

    useEffect(()=>{
        ;(async()=>{
            setLoading(true);
            const result= editFullCourseDetails(courseId,token)
            if(result?.courseDetails){
                   dispatch(setEditCourse(true))
                   dispatch(setCourse(result?.courseDetails));
            }
            setLoading(false);
        })()

    },[])

    if (loading) {
        return (
          <div className="grid flex-1 place-items-center">
            <div className="spinner"></div>
          </div>
        )
      }
      
    return(
        <div className="text-white">
             <h1>Edit Course</h1>
             <div>
              
              
                    <RenderSteps/>
               
              
                
             </div>
        </div>
    )
}