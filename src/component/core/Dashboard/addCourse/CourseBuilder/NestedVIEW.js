import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {RxDropdownMenu} from "react-icons/rx"
import {MdEdit} from "react-icons/md"
import {RiDeleteBin6Line} from "react-icons/ri"
import {BiDownArrowCircle} from "react-icons/bi"
import {BsFillPatchPlusFill} from "react-icons/bs"
import SubSectionModal from './SubSectionModal'
import ConfirmationModal from '../../../../common/ConfirmationModal'
import { setCourse } from '../../../../../slices/courseSlice'
import { deleteSection } from '../../../../../services/operation/sectionAPI'
import { deletesubSection } from '../../../../../services/operation/subSectionApi'

const NestedVIEW = ({handleChangeEditSectionName}) => {

    const{course}=useSelector((state)=>state.course);
    const{token}=useSelector((state)=>state.auth)
   const dispatch=useDispatch();
    const[addsubSection,setaddSubSection]=useState(null);
    const[viewsubSection,setviewSubSection]=useState(null);
    const[editsubSection,setEditSubSection]=useState(null);
    
    const[confirmationModal,setConfirmationModal]=useState(null);

    const  handleDeleteSection=async(sectionId)=>{
         //backend call
       
     
         const result = await deleteSection({
          sectionId,
          courseId: course._id,
          token,
         });
       
           if(result){
               dispatch(setCourse(result));
           }
         //confirmation mdal null
         setConfirmationModal(null);
    }

    const handleDeleteSubSection=async(subSectionId,sectionId)=>{
              console.log("first")
               const result=await deletesubSection({
                    subSectionId,
                    sectionId
               ,token})

               if(result){
                     // update the structure of course
                    const updatedCourseContent = course.courseContent.map((section) =>
                    section._id === sectionId ? result : section
                  )
                  const updatedCourse={...course,courseContent:updatedCourseContent}
                  dispatch(setCourse(updatedCourse));
               }
               setConfirmationModal(null);
    }

   
  return (
    <div>
          <div className='rounded-lg bg-richblack-700 p-6 px-8 text-white cursor-pointer'>
               {course?.courseContent?.map((section)=>(
                     <details key={section._id} open >
                      
                      <summary className='flex items-center justify-between gap-x-3 border-b-2'>
                           <div className='flex items-center gap-x-3'>
                                <RxDropdownMenu/>
                                <p>{section.sectionName}</p>
                           </div>

                           <div className='flex items-center gap-x-3'>
                              <button
                              onClick={()=>handleChangeEditSectionName(section._id,section.sectionName)}>
                                    <MdEdit/>
                              </button>

                              <button
                              onClick={()=>{

                                 setConfirmationModal({
                                   text1:"Delete This Section",
                                   text2:"All the lectures in this section will be deleted",
                                   btn1Text:"Delete",
                                   btn2Text:"Cancel",
                                   btn1handler:()=>handleDeleteSection(section._id,course._id),
                                   btn2hander:()=>setConfirmationModal(null),
                                 }) 
                              
                              }}>
                                   <RiDeleteBin6Line/>
                              </button>

                             <span>
                              |
                             </span>
                             <BiDownArrowCircle className={`text-xl text-richblack-300`}/>
                           </div>

                          
                      </summary>   

                      <div>
                          {
                              section.subSection?.map((data)=>(
                                   <div key={data?._id}
                                   onClick={()=>setviewSubSection(data)}
                                   className='flex items-center justify-between gap-x-3 border-b-2'>
                                            <div className='flex items-center gap-x-3'>
                                             <RxDropdownMenu/>
                                             <p>{data.title}</p>
                                        </div>
                                        <div className='flex items-center gap-x-3'
                                        onClick={(e)=>e.stopPropagation()}>
                                             <button
                                             onClick={()=>setEditSubSection({...data,sectionId:section._id})}>
                                                  <MdEdit/>
                                             </button>

                                             <button
                                             // onClick={()=>{
                                             //       setConfirmationModal({
                                             //      text1:"Delete This Sub Section",
                                             //      text2:"Selected lectures  will be deleted",
                                             //      btn1Text:"Delete",
                                             //      btn2Text:"Cancel",
                                             //      btn1handler:()=> handleDeleteSubSection(data._id,section._id),
                                             //      btn2handler:()=>setConfirmationModal(null),
                                             // })
                                             // }}
                                            onClick={() =>
                                             setConfirmationModal({
                                                  text1: "Delete this Sub-Section?",
                                                  text2: "This lecture will be deleted",
                                                  btn1Text: "Delete",
                                                  btn2Text: "Cancel",
                                                  btn1handler: () =>
                                                  handleDeleteSubSection(data._id, section._id),
                                                  btn2handler: () => setConfirmationModal(null),
                                             })
                                             }>
                                                       <RiDeleteBin6Line/>
                                             </button>
                                        </div>
                                   </div>
                              ))
                          }
                          <button
                          onClick={()=>setaddSubSection(section._id)}
                          className='flex items-center gap-x-2 text-yellow-50'>
                              <BsFillPatchPlusFill/>
                              <p>Add Lecture</p>
                          </button>
                      </div>
                     </details>
               ))}
          </div>

          {addsubSection ? (<SubSectionModal
               modalData={addsubSection}
               setModalData={setaddSubSection}
               add={true}
          />)
          : viewsubSection ? (<SubSectionModal
               modalData={viewsubSection}
               setModalData={setviewSubSection}
               view={true}
          />)
          : editsubSection ? (<SubSectionModal
               modalData={editsubSection}
               setModalData={setEditSubSection}
               edit={true}
          />)
          : (<div></div>)}

          {confirmationModal ? (
               <ConfirmationModal Modaldata={confirmationModal}/>
          ) : (
               <div></div>
          )}
    </div>
  )
}

export default NestedVIEW