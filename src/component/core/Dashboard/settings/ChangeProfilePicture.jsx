import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn';
import {BiUpload} from "react-icons/bi"
import { setDisplayPicture } from '../../../../services/operation/setting.API';

const ChangeProfilePicture = () => {


    const {user}=useSelector((state)=>state.profile)
    const[previewSource,setpreviewSource]=useState(null);
    const[ImageFile,setImageFile]=useState(null);
    const fileInputRef=useRef();
    const[loading,setLoading]=useState(false);
    const dispatch=useDispatch();
    const{token}=useSelector((state)=>state.auth);
 
    console.log("user is ",user);

  const handleFileChange=(e)=>{
         console.log("target",e.target.files[0])
        const file=e.target.files[0];
        console.log("file",file)
        if(file){
            setImageFile(file);
            PreviewFile(file);
        }
  }
 
  const handleClick=()=>{
      fileInputRef.current.click();
  }

  const PreviewFile=(file)=>{
          const reader=new FileReader()
          reader.readAsDataURL(file)
          reader.onloadend=()=>{
            setpreviewSource(reader.result)
          }
  }

  const handleFileUpload=()=>{
   console.log("handle file upload")
     try{
        setLoading(true);
        const formData=new FormData();
        formData.append("displayPicture",ImageFile);
        dispatch(setDisplayPicture(token,formData))
        setLoading(false);
     } catch(error){
        console.log("ERROR MESSAGE - ", error.message)
     }
  }

  useEffect(()=>{
     if(ImageFile){
        PreviewFile(ImageFile);
     }
  },[ImageFile])

  return (
    <>
        <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5">
              <div className="flex items-center gap-x-4">
                   <img
                    src={previewSource||user?.images}
                    alt={`profile-${user?.firstName}`}
                    className="aspect-square w-[78px] rounded-full object-cover"
                   />
                  <div className='space-y-2'>
                     <h2>Change Profile Picture</h2>
                      <div className="flex flex-row gap-3">
                         <input
                            ref={fileInputRef}
                            type='file'
                            className='hidden'
                            accept="image/png, image/gif, image/jpeg"
                            onChange={handleFileChange}
                         />
                         <button
                         onClick={handleClick}
                         disabled={loading}
                         className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50">
                              Select
                         </button>
                   
                        <button
                           onClick={ImageFile != null ? handleFileUpload : null}
                            className={`cursor-pointer rounded-md ${ImageFile!=null ? 'bg-yellow-50' : 'text-richblack-50 bg-richblack-700' } py-2 px-5 font-semibold text-black flex flex-row items-center`} 
                         >
                         {loading ? "Uploading...." : ImageFile==null ? "Please Select The File First" : "Upload"}
                         <BiUpload className="text-lg text-richblack-900 ml-2"/>
                         </button>
                       
                    
                      </div>
                  </div>

              </div>
        </div>

    </>
  )
}

export default ChangeProfilePicture