import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {BsPlusCircle} from "react-icons/bs"
import { createSection } from '../../../../../services/operation/sectionAPI'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../../../common/IconBtn'
import { setCourse, setEditCourse, setStep, setStepOne } from '../../../../../slices/courseSlice'
import { section } from '../../../../../services/api'
import { updateSection } from '../../../../../services/operation/sectionAPI'
import NestedVIEW from './NestedVIEW'
import thunk from 'redux-thunk';

const CourseBuilderForm = () => {

        const{
          register,
          formState : {errors},
          handleSubmit,
          setValue,
        }=useForm();
        
        const{token}=useSelector((state)=>state.auth)
        const{toast}=useSelector((state)=>state.auth)
        const dispatch=useDispatch();
        const[editSection,setEditSection]=useState(null);
        const{course}=useSelector((state)=>state.course)
        const[loading,setLoading]=useState(false);

        const onSubmitHandler=async(data)=>{
               setLoading(true);
               let result;
               if(editSection){
                  result=await updateSection(
                    {
                      sectionName:data.sectionName,
                        sectionId:editSection,
                       courseId:course._id,
                    },token
                  )
               } 
               else{
                result=await createSection({
                  sectionName:data.sectionName,
                  courseid:course._id,                  
                },token)
               }

               //update value
               if(result){
                  dispatch(setCourse(result));
                  setEditSection(null);
                  setValue("sectionName","");
               }
               setLoading(false);
        }
      
        const goBack=()=>{
            console.log("go back function")
             dispatch(setStep(1));
             dispatch(setEditCourse(true));
        }
      
        const goToNext=(e)=>{
            //validation
            e.stopPropagation();
            if(course.courseContent.length ===0){
              toast.error("please add 1 Section")
            }
            if(course.courseContent.some((section)=>section.subSection.length===0)){
                toast.error("Please atleast one lecture in each section")
                return;
            }
            //if everthing is good
            dispatch(setStep(3));
        }
        const cancelEdit=()=>{
            setEditSection(null);
            setValue("sectionName","");
        }

      const handleChangeEditSectionName=(sectionID,sectionName)=>{
         
              if(editSection===sectionID){
                 cancelEdit();
                 return;
              }
                setEditSection(sectionID);
                setValue("sectionName",sectionName);
      }

  return (
    <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6  "> 
       <h2 className="text-2xl font-semibold text-richblack-5">Course Builder</h2>

       <form onSubmit={handleSubmit(onSubmitHandler)}>
        {/*section name*/}
            <div  className="flex flex-col space-y-2">
                <label htmlFor='sectionName' className='lable-style text-sm text-richblack-5'>Section Name <sup className='text-pink-100'>*</sup></label>
                <input
                  id='sectionName'
                  name='sectionName'
                  placeholder='Add a section to build your course'
                  className='form-style'
                  {...register("sectionName",{required:true})}
                />
                {
                  errors.sectionName && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        Section Name is Required
                    </span>
                  )
                }
            </div>

            {/*button*/}
             <div className='flex mt-3 '>
                <IconBtn className='gap-2 mt-2'
                  type='submit'
                  text={!editSection ? "Create Section" : "Edit section Name" }>
                       
                        <BsPlusCircle/>

                  </IconBtn>
                  {
                    editSection && (
                      <button type='button'
                      onClick={cancelEdit}
                      className='text-sm text-richblack-300 underline ml-1'>
                         Cancel Edit
                      </button>
                    )
                  }
             </div>
       </form>
     
     {course.courseContent.length>0 && (
        <NestedVIEW handleChangeEditSectionName={handleChangeEditSectionName}/>
     )}
       
       <div className='flex justify-end gap-5'>
         <div  onClick={(e) => {
          e.stopPropagation();
          dispatch(setStep(1));
          dispatch(setEditCourse(true));
         }}
         className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}>
          back 
         </div>
         <IconBtn text="Next" onClick={goToNext } />

       </div>
    </div>
  )
}

export default CourseBuilderForm