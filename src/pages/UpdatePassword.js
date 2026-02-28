import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {AiOutlineEyeInvisible,AiOutlineEye} from "react-icons/ai"
import {BiArrowBack} from "react-icons/bi"
import { useLocation } from 'react-router-dom'
import { setLoading } from '../slices/authSlice'
import { toast } from 'react-hot-toast'
import { endpoints } from '../services/api'
import { Link } from 'react-router-dom'
import axios from 'axios'

const UpdatePassword = () => {
    const [formdata,setFormData]=useState({
        password:"",
        confirmPassword:""
    })
    const location=useLocation();
    const dispatch=useDispatch();
    const[showPassword,setShowPassword]=useState(false);
    const[showconfirmPassword,setConfirmPassword]=useState(false);
    const {loading}=useSelector((state)=>state.auth);

      const handlechange=(e)=>{
        setFormData( (prevdata)=>
        (
            {
                ...prevdata,
                [e.target.name]:e.target.value,
            }
        ))
      }
      
      const {password,confirmPassword}=formdata;

       async function resetpass(password,confirmPassword,token){
        dispatch(setLoading(true));
        const toastId=toast.loading("Loading......")
           try{
                   const response=await axios.post(endpoints.RESETPASSWORD_API,{password,confirmPassword,token});

                   console.log("Reset Password Token.......",response);
                                    
                  if(!response.data.success) {
                   throw new Error(response.data.message);
                   }
               
                   toast.success("password has been reset SuccessFully");

           } catch(error){
            console.log("RESET PASSWORD TOKEN Error", error.message);
            toast.error("Unable to reset password");
           }
           dispatch(setLoading(false));
           toast.dismiss(toastId);
       }



      const handleonsubmit=(e)=>{
        e.preventDefault();
        const token=location.pathname.split("/").at(-1)
        resetpass(password,confirmPassword,token);
       // dispatchEvent(resetPassword(password,confirmPassword,token))
      }

  return (
    <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
       {
        loading ? (
            <div>
                Loading....
            </div>
        ) : (
            <div className='max-w-[500px] p-4 lg:p-8'>
                 <h1 className='text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5'>Choose  new password</h1>
                 <p className='my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100'>Almost done. Enter your new password and youre all set.</p>
                 <form onSubmit={handleonsubmit}>
                     <label className='relative'>
                        <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>New Password <sup className='text-pink-200'>*</sup></p>
                        <input
                           required
                            type={showPassword ? "text" : "password"}
                           name="password"
                           value={formdata.password}
                           placeholder='Password'
                           onChange={handlechange}
                           className='form-style w-full !pr-10 bg-[#161D29] px-3 py-2 outline-none'
                        />
                        <span onClick={()=>setShowPassword((prev)=>!prev)}
                        className='absolute right-3 top-[38px] z-[10] cursor-pointer'>
                          {
                            showPassword ? (
                              <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                            ) :(
                              <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )
                          }
                        </span>
                     </label>

                     <label className="relative mt-3 block">
                        <p  className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Confirm Password <sup className='text-pink-200'>*</sup></p>
                        <input 
                           required
                            type={showconfirmPassword ? "text" : "password"}
                           name="confirmPassword"
                           value={formdata.confirmPassword}
                           onChange={handlechange}
                           className="form-style w-full !pr-10 bg-[#161D29] px-3 py-2 outline-none "
                           placeholder='Confirm Password'
                        />
                        <span onClick={()=>setConfirmPassword((prev)=>!prev)}
                         className="absolute right-3 top-[38px] z-[10] cursor-pointer">
                          {
                            showconfirmPassword ? (
                              <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                            ) :(
                              <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )
                          }
                        </span>
                     </label>

                     <button type='submit'
                      className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900">
                        Reset Password
                     </button>
                 </form>

                 <div className="mt-6 flex items-center justify-between">
                  <Link to="/login">
                      <p className="flex items-center gap-x-2 text-richblack-5">  <BiArrowBack /> Back To Login</p>
                  </Link>
                 </div>
            </div>
        )
       }
    </div>
  )
}

export default UpdatePassword