import React from 'react'
import {useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import IconBtn from '../../common/IconBtn'
import {RiEditBoxLine} from "react-icons/ri"
import { formattedDate } from '../../../utils/dateFormater'
const MyProfile = () => {
  const {user} =useSelector((state)=>state.profile)
  const navigate=useNavigate();
  return (
    <div className='text-white bg-richblack-900  items-center max-w-maxContent'>
    
          <h1 className='mb-14 text-3xl font-medium text-richblack-5'>My Profile</h1>
               {/*section 1*/}
          <section className='flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12'>
              <div className="flex items-center gap-x-4">
                  <img
                     src={user?.images}
                    alt={`profile-${user?.firstName}`}
                    className='aspect-square w-[78px] rounded-full object-cover'
                    />
                      <div className='space-y-1'>
                     <p className="text-lg font-semibold text-richblack-5">
                     {user?.firstName+" "+user?.lastName} </p>
                      <p className="text-sm text-richblack-300">{user?.email}</p>
               </div>
                <div>
              
               </div>
              </div>
              <button className='flex flex-row items-center gap-2 text-black bg-yellow-50 hover:bg-yellow-70 font-bold py-2 px-4 rounded' onClick={()=>{
                navigate("/dashboard/settings")
              }}>
                  <p>Edit</p>
                <span> <RiEditBoxLine/></span>
              </button>
          </section>

          {/*section 2*/}
          <section className="my-10 flex  gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
               <div className="flex  w-full items-center justify-between">
                      <div className=''>
                      <h2 className="text-lg font-semibold text-richblack-5">About</h2>
                   <p
                   className={`${
                 user?.additionalDetails?.about
                ? "text-richblack-5"
                : "text-richblack-400"
                   } text-sm font-medium mt-2`}>
                    {
                      user?.additionalDetail.about ?? "Write Something About Yourself"
                    }
                   </p>
                      </div>
                   <button className='flex flex-row items-center gap-2 text-black bg-yellow-50 hover:bg-yellow-70 font-bold py-2 px-4 rounded'
                   onClick={()=>{
                     navigate("/dashboard/settings")
                   }}>
                     <p>Edit</p>
                     <span> <RiEditBoxLine/></span>
                     </button>
               </div>
          </section>

          {/*section 3*/}
          <section className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                <div className="flex w-full items-center justify-between">
                  <p className="text-lg font-semibold text-richblack-5">additional Detail</p>
                    <button className='flex flex-row items-center gap-2 text-black bg-yellow-50 hover:bg-yellow-70 font-bold py-2 px-4 rounded'
                    onClick={()=>{
                      navigate("/dashboard/settings")
                    }}>
                          <p>Edit</p>
                          <span><RiEditBoxLine/></span>
                    </button>
                </div>


              <div className='flex max-w-[500px] justify-between'>               
              <div  className="flex flex-col gap-y-5">
              <div >
                    <p className="mb-2 text-sm text-richblack-600">First Name</p>
                    <p className="text-sm font-medium text-richblack-5">
                      {
                        user?.firstName 
                      }
                    </p>
                </div>
                 
                 <div>
                     <p className="mb-2 text-sm text-richblack-600">Email</p>
                       <p className="text-sm font-medium text-richblack-5"> {user?.email}</p>
                 </div>
                     
                     <div>
                           <p className="mb-2 text-sm text-richblack-600">Gender</p>
                          <p className="text-sm font-medium text-richblack-5">{user?.additionalDetail?.gender ?? "Add Gender"}</p>
                     </div>
              </div>
        
            
            <div className="flex flex-col gap-y-5">
                <div>
                  <p className="mb-2 text-sm text-richblack-600">last Name</p>
                  <p className="text-sm font-medium text-richblack-5">{user?.lastName}</p>
                </div>

                <div>
                   <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
                   <p>{user?.additionalDetail?.contactNumber ?? "Add Contact Number"}</p>
                </div>

                <div>
                  <p className="mb-2 text-sm text-richblack-600">date Of Birth</p>
                  <p  className="text-sm font-medium text-richblack-5">{formattedDate(user?.additionalDetail?.dateOfBirth) ?? "Add Date of Birth"}</p>
                </div>
              </div>
              </div>
          </section>
    
    </div>
  )
}

export default MyProfile