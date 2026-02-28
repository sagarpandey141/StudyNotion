import React, { useEffect, useState } from 'react'
import {useForm} from "react-hook-form"
import{useDispatch} from "react-redux"
import { useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import { editCourseDetails, fetchcourseCategories } from '../../../../../services/operation/CourseApi'
import {HiOutlineCurrencyRupee} from "react-icons/hi"
import ReqirmentFields from './ReqirmentFields'
import IconBtn from "../../../../common/IconBtn"
import { setStep,setCourse } from '../../../../../slices/courseSlice'
import { addCourseDetails } from '../../../../../services/operation/CourseApi'
import { COURSE_STATUS } from '../../../../../utils/constant'
import ChipInput from './ChipInput'
import Upload from '../Upload'

const CourseInfromationForm = () => {

  const{
     register,
     handleSubmit,
     setValue,
     getValues,
     formState:{errors},
  }=useForm();
  
 const {token}=useSelector((state)=>state.auth)
  const dispatch=useDispatch();
  const {course,editCourse}=useSelector((state)=>state.course);
  const[loading,setloading]=useState(false);
  const[courseCategory,setCourseCategory]=useState([]);

  useEffect(()=>{
     const getCategories=async()=>{
        const toastID=toast.loading("Loading....")
        const categories=await fetchcourseCategories();
        
        if(categories.length>0){
          setCourseCategory(categories);
        }
        toast.dismiss(toastID);

     }
  
    if(editCourse){
      setValue("courseTitle",course.courseName);
      setValue("courseshortdesc",course.courseDescription);
      setValue("coursePrice",course.price);
      setValue("courseTags",course.tag);
      
      setValue("courseCategory",course.categories);
      setValue("courseRequirments",course.instructions);
      setValue("courseImage",course.thumbnail);
      setValue("courseBenefits",course.whatYouWillLearn);
    }

     getCategories();
  },[])
 
  const isFormUpdated=async(data)=>{
      const currentvalues=getValues();

      if(currentvalues.courseTitle!==course.courseName 
        || currentvalues.courseshortdesc!==course.courseDescription
        || currentvalues.coursePrice!==course.price
        ||  currentvalues.courseTags.toString()!==course.tag.toString()
        ||  currentvalues.courseBenefits!==course.whatYouWillLearn
        ||  currentvalues.courseRequirments.toString()!==course.instructions.toString()
        ||  currentvalues.courseCategory!==course.categories._id
        ||  currentvalues.courseBenefits!==course.whatYouWillLearn
        ||  currentvalues.courseImage!==course.thumbnail
        ){
         return true;
      }
      return false;
  }
  //handles next button click
  const onSubmit=async(data)=>{
  
        if(editCourse){
              
          if(isFormUpdated()){
            const currentvalues=getValues();
           
            const formData=new FormData();
  
            formData.append("courseId",course._id);
            
            if(currentvalues.courseTitle!==course.courseName){
              formData.append("courseName",data.courseTitle)
            }
  
            if(currentvalues.courseshortdesc!==course.courseDescription){
              formData.append("courseDescription",data.courseshortdesc)
            }
  
            if(currentvalues.coursePrice!==course.price){
              formData.append("coursePrice",data.coursePrice)
            }
  
            if(currentvalues.courseBenefits!==course.whatYouWillLearn){
              formData.append("whatYouWillLearn",data.courseBenefits)
            }
  
            if(currentvalues.courseCategory!==course.categories){
              formData.append("Category",data.courseCategory)
            }
  
            if (currentvalues.courseTags.toString() !== course.tag.toString()) {
              formData.append("tag", JSON.stringify(data.courseTags))
            }
  
            if(currentvalues.courseImage!==course.thumbnail){
              formData.append("thumbnail",data.courseImage)
            }
          
            if(currentvalues.courseRequirments.toString()!==course.instructions.toString()){
              formData.append("instructions",JSON.stringify(data.courseRequirments))
            }
          
            setloading(true);
            const result=await editCourseDetails(formData,token);
            setloading(false);
            if(result){
              dispatch(setStep(2));
              dispatch(setCourse(result));
            }
          } 
          else{
              toast.error("No change Made So Far")
          }
        
       

          return;
        }
        //new form create
     
        const formData=new FormData();
       
        
        formData.append("courseName",data.courseTitle)
        formData.append("courseDescription",data.courseshortdesc)
        formData.append("price",data.coursePrice)
        formData.append("whatYouWillLearn",data.courseBenefits)
        formData.append("category",data.courseCategory)
        formData.append("instructions",JSON.stringify(data?.courseRequirments))
        formData.append("tag",JSON.stringify(data.courseTags))
        formData.append("status",COURSE_STATUS.DRAFT)  
        formData.append("thumbnailImage", data.courseImage)
        
        setloading(true);
            for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

        const result=await addCourseDetails(formData,token);

        if(result){
          dispatch(setStep(2));
          dispatch(setCourse(result));
        }
        setloading(false);
        
  }
 

    return (
   <form
   onSubmit={handleSubmit(onSubmit)}
   className='rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8 text-white'>
         
         {/*course title*/}
           <div className="flex flex-col space-y-2">
           <label className="text-sm text-richblack-5" htmlFor='courseTitle'>Course Title <sup>*</sup></label>
              
              <input
             
                 id='courseTitle'
                 placeholder='Enter Course Title'
               {...register("courseTitle",{required:true})}
              
               className="form-style w-full"
              />
              {
                errors.courseTitle && (
                  <span
                  className="ml-2 text-xs tracking-wide text-pink-200">Course Title is required</span>
                )
              }
           </div>

           {/*course description*/}
           <div className='flex flex-col space-y-2'>
              <label htmlFor='courseshortdesc' className='text-sm text-richblack-5 lable-style'>Course Description <sup>*</sup></label>
              
              <input
             
                 id='courseshortdesc'
                 placeholder='Enter Course Description'
               {...register("courseshortdesc",{required:true})}
               className='form-style resize-x-none min-h-[130px] w-full'
              />
              {
                errors.courseshortdesc && (
                  <span>Course Description is required</span>
                )
              }
           </div>
           
           {/*course price*/}
           <div className=' relative flex flex-col space-y-2'>
              <label htmlFor='coursePrice' className='lable-style'>Course Price <sup className='text-pink-200'>*</sup></label>
              
              <input
             
                 id='coursePrice'
                 placeholder='Enter Course Price'
               {...register("coursePrice",{required:true,
               valueAsNumber:true,})}
               className="form-style w-full !pl-12"
              />
              <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400"
              />
              {
                errors.coursePrice && (
                  <span>Course Price is required</span>
                )
              }
           </div>
          
          {/*course category*/}
           <div className="flex flex-col space-y-2">
              <label htmlFor="courseCategory" className="text-sm text-richblack-5 lable-style">Course Category <sup className='text-pink-200'>*</sup></label>
              <select
                id="courseCategory"
                defaultValue=""
                {...register("courseCategory",{required:true})}
                className="form-style w-full"
              >
                <option value="" disabled>Choose A category</option>

                {
                  !loading && courseCategory.map((category,index)=>(
                           <option key={index} value={category?._id}>
                              {category?.name}
                           </option>
                  ))
                }
              </select>
              {
                errors.courseCategory && (
                  <span
                  className="ml-2 text-xs tracking-wide text-pink-200">Course Category is Required</span>
                )
              }
           </div>
 
           <>
             <ChipInput
              label='Tags'
              name="courseTags"
              placeholder="Enter tags and press enter"
              register={register}
              errors={errors}
              setValue={setValue}
              getValues={getValues}
             />
           </>

          {/* Course Thumbnail Image */}
          <Upload
            name="courseImage"
            label="Course Thumbnail"
            register={register}
            setValue={setValue}
            errors={errors}
            editData={editCourse ? course?.thumbnail : null}
          />
           
           {/*benifits of the Course*/}
            <div className="flex flex-col space-y-2">
               <label className="text-sm text-richblack-5 lable-style">Benefits of the course <sup className="text-pink-200">*</sup></label>
               <textarea
                id="courseBenefits"
                placeholder="Enter Benefits of the COURSE"
                {...register("courseBenefits",{required:true})}
                className="form-style resize-x-none min-h-[130px] w-full"
               />
               {
                errors.courseBenefits && (
                  <span>Benefits of the Course are required</span>
                )
               }
            </div>

            {/*requirement of the course*/}
            <>
              <ReqirmentFields
                name="courseRequirments"
                label="Requirements/Instructions"
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
              />
            </>

            {/*button*/}
            <div className="flex justify-end gap-x-2">
              {
                editCourse && (
                  <button  className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
                  onClick={()=>dispatch(setStep(2))}>
                      Continue Without Saving
                  </button>
                )
              }

              <button
              className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-yellow-100 py-[8px] px-[20px] font-semibold text-richblack-900`}
              type='submit'
               
              >
                {!editCourse ? "Next" : "Save Changes"}
              </button>
            </div>
   </form>
  )
}

export default CourseInfromationForm