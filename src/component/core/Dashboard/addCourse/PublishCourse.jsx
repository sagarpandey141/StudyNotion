import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { resetCourseState, setCourse, setStep } from '../../../../slices/courseSlice';
import { COURSE_STATUS } from '../../../../utils/constant';
import { editCourseDetails } from '../../../../services/operation/CourseApi';
import { setEditCourse } from '../../../../slices/courseSlice';
import {useNavigate} from "react-router-dom"

const PublishCourse = () => {

    const{
        register,
        handleSubmit,
        formState : {errors},
        getValues,
    }=useForm();

     const dispatch=useDispatch();
     const{course}=useSelector((state)=>state.course)
     const {token}=useSelector((state)=>state.auth)
     const navigate=useNavigate();
    const goBack=()=>{
      dispatch(setStep(2));

    } 

    const GoToCourses=()=>{
          dispatch(resetCourseState());
          navigate("/dashboard/my-courses");
    }

    const handleCoursePublic=async()=>{
          if(course.status===COURSE_STATUS.PUBLISHED && 
            getValues("public")===true || course.status===COURSE_STATUS.DRAFT &&
            getValues("Public")===false){
                //no api call as no changes are made
                GoToCourses();
                return
            }
         
            const currentvalues=getValues();
            const formData=new FormData();

            formData.append("courseId",course._id)
            const course_status=getValues("public")
             ? COURSE_STATUS.PUBLISHED
             : COURSE_STATUS.DRAFT

             formData.append("status",course_status);
             console.log("formdata on final",formData)
             const result=await editCourseDetails(formData,token)

             if(result){
                GoToCourses();
             }


    }

    const HandleSubmit=(data)=>{
           handleCoursePublic();
    }

  return (
    <div className="rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
        <h2 className="text-2xl font-semibold text-richblack-5">Publish Settings</h2>
        
        <form onSubmit={handleSubmit(HandleSubmit)}>
        {/*checkbox*/}
             <div className="my-6 mb-8 ">
                <label htmlFor='public'  className="inline-flex items-center text-lg">
                <input
                    type='checkbox'
                    id='public'
                    name='public'
                    className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
                    {...register("public")}
                />
                   <span className="ml-2 text-richblack-400">Make this Course as public</span>
             </label>
             </div>
            
            {/*button*/}
             <div className="ml-auto flex max-w-max items-center gap-x-4">
                 <button
                 type='button'
                 onClick={goBack}
                 className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900">
                    Back
                 </button>

                 <button
                    className="flex cursor-pointer items-center gap-x-2 rounded-md bg-yellow-100 py-[8px] px-[20px] font-semibold text-richblack-900"
                 type='submit'>
                    Save Changes
                 </button>
             </div>
        </form>
    </div>
  )
}

export default PublishCourse