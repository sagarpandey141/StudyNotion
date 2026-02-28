import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import {RxCross2} from "react-icons/rx"
import Upload from '../Upload';
import IconBtn from '../../../../common/IconBtn';
import { toast } from 'react-hot-toast';
import { setCourse } from '../../../../../slices/courseSlice';
import {handleUpdateSubSection} from "../../../../../services/operation/subSectionApi"
import {createsubSection} from "../../../../../services/operation/subSectionApi"
import { FiTrendingUp } from 'react-icons/fi';
const SubSectionModal = ({
    modalData,
    setModalData,
    add=false,
    view=false,
    edit=false,
}) => {

    const{
        register,
        handleSubmit,
        setValue,
        formState: {errors},
        getValues,
    }=useForm();
     const dispatch=useDispatch();
    const[loading,setloading]=useState(false);
    const{course}=useSelector((state)=>state.course);
    const{token}=useSelector((state)=>state.auth)

    useEffect(()=>{
        if(view || edit){
             setValue("lectureTitle",modalData.title)
             setValue("LectureDecs",modalData.decsription)
             setValue("LectureView",modalData.videoUrl)
        }
    },[]);
     
    //is form updated
     const isFormUpdated=()=>{
          const currentValue=getValues();

          if(currentValue.lectureTitle!==modalData.title ||
            currentValue.LectureDecs!==modalData.decsription ||
            currentValue.LectureView!==modalData.videoUrl){
                return true
            }
            return false;
     }

    const handleEditSubSection=async()=>{
              const currentValue=getValues();

              const formData=new FormData();
              formData.append("sectionId",modalData.sectionId);
              formData.append("subSectionId",modalData._id);

              if(currentValue.lectureTitle !== modalData.title){
                formData.append("title",currentValue.lectureTitle);
              }

              if(currentValue.LectureDecs!==modalData.decsription){
                  formData.append("description",currentValue.LectureDecs);
              }

              if(currentValue.LectureView!==modalData.videoUrl){
                  formData.append("videoFile",currentValue.LectureView);
              }
           
            //   setloading(true);
              console.log("setloadig",loading);
              const response=await handleUpdateSubSection(formData,token);

                if(response){
                    // update the structure of course
                    const updatedCourseContent = course.courseContent.map((section) =>
                    section._id === modalData ? response : section
                    )
                    const updatedCourse={...course,courseContent:updatedCourseContent};
                    dispatch(setCourse(updatedCourse));
                }
                console.log("come i")
                setModalData(null);
                // setloading(false);


    }

    const onsubmit=async(data)=>{
        //if view return
        if(view) return
        //valid eddit
        if(edit){
            if(!isFormUpdated){
                toast.error("No Changes Made So Far.")
            }
            else{
                handleEditSubSection()
            }
            return
        }

        //formdata
        const formData=new FormData();
        formData.append("sectionid",modalData)
        formData.append("title",data.lectureTitle)
        formData.append("description",data.LectureDecs)
        formData.append("video",data.LectureView)
        setloading(true)
        console.log("formdata",formData);
        const response=await createsubSection(formData,token);
        
        if(response){
            // update the structure of course
            const updatedCourseContent = course.courseContent.map((section) =>
            section._id === modalData ? response : section
            )
            const updatedCourse={...course,courseContent:updatedCourseContent};
            dispatch(setCourse(updatedCourse));
        }
        setModalData(null);
        setloading(false);
    }
    console.log("lading",loading);
  return (
    <div className=" fixed  inset-0 z-[1000] !mt-0 grid h-screen w-screen  place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm border border-white">
          <div className="   my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
              {/*modal header*/}
              <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
                  <p className="text-xl font-semibold text-richblack-5">
                    {view && "Viewing"} {add && "Adding"}  {edit && "Editing"} Lecture
                  </p>
                  
                  <button onClick={()=>{setModalData(null)}}>
                     <RxCross2/>
                  </button>
              </div>
              {/*modal form*/}
              <form onSubmit={handleSubmit(onsubmit)}
                className="space-y-8 px-8 py-10">
                  <Upload
                     name="LectureView"
                    label="Lecture Video"
                    register={register}
                    setValue={setValue}
                    errors={errors}
                    video={true}
                    viewData={view ? modalData.videoUrl : null}
                    editData={edit ? modalData.videoUrl :null}
                  />
                  {/*lecture title*/}
                   <div className="flex flex-col space-y-2">
                    <label htmlFor='lectureTitle' className="text-sm text-richblack-5">Lecture Title  {!view && <sup>*</sup>}</label>
                    <input
                       disabled={view || loading}
                        id='lectureTitle'
                        name='lectureTitle'
                        placeholder='Enter Lecture Title'
                        className="form-style w-full"
                        {...register("lectureTitle",{required:true})}
                    />
                    {
                        errors.lectureTitle && (
                            <span>
                                Lecture Ttle is Required
                            </span>
                        )
                    }
                   </div>

                   {/*lecture description*/}
                   <div className="flex flex-col space-y-2">
                      <label htmlFor='LectureDecs' className="text-sm text-richblack-5">Lecture Description {" "}
                      {!view && <sup className="text-pink-200">*</sup>}</label>

                      <textarea                  
                      disabled={view || loading}
                        id='LectureDecs'
                        placeholder='Enter Lecture Description'
                        {...register("LectureDecs",{required:true})}
                        className="form-style resize-x-none min-h-[130px] w-full"
                      />
                      {
                        errors.lectureDescription && (
                            <span className="ml-2 text-xs tracking-wide text-pink-200">>
                                Lecture Description Required
                            </span>
                        )
                      }

                   </div>
                    
                    {
                       !view && (
                         <div className="flex justify-end">
                            <IconBtn
                           
                                disabled={loading}
                                text={loading ? "Loading..." : edit ? "Save Changes" : "Save"}
                            />
                         </div>

                       ) 
                    }
              </form>
          </div>
    </div>
  )
}

export default SubSectionModal