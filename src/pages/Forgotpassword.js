import React, { useState } from 'react'
import {AiOutlineArrowLeft} from "react-icons/ai"
import { useDispatch, useSelector } from 'react-redux';
import {getpasswordresetToken} from "../services/operation/authApi"
import { Link } from 'react-router-dom';
import { endpoints } from '../services/api';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { setLoading } from '../slices/authSlice';

const Forgotpassword = () => {

    const[sentEmail,setSentEmail]=useState(false);
    const[email,setemail]=useState("");
    const loading=useSelector((state)=>state.auth)
    const dispatch=useDispatch();
   
           

      async function resetPassword(){
        dispatch(setLoading(true));
        try{
            const data=await axios.post(endpoints.RESETPASSWORDTOKEN_API,{email})

            console.log("data is",data);

            toast.success("email sent");
            setSentEmail(true);

        } catch(error){
            console.log("RESET PASSWORD TOKEN Error", error);
            toast.error("Failed to send email for resetting password");
        }
        dispatch(setLoading(false));
      }


      const submitHandler=(e)=>{
            console.log("email",email);
                e.preventDefault();
                //dispatch(getpasswordresetToken(email,setSentEmail));
               resetPassword()
             
            
     }

     
  return (
    <div className=''>
        <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
            {
                loading.loading ? (
                    <div>Loading...</div>
                ) :(
                    <div className='max-w-[500px] p-4 lg:p-8'>
                        <h1 className='text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5'>
                            {
                                !sentEmail ? "Reset your password" :
                                             "Check email"
                            }
                        </h1>

                        <p className='my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100'>
                            {
                                !sentEmail ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery" :
                                             `We have sent the reset email to ${email}`
                            }
                        </p>
                         
                         <form onSubmit={submitHandler}>
                            {

                                !sentEmail && (
                                    <label className='w-full '>
                                        <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5 text-xl'>Email Address
                                         <sup className='text-pink-200'>*</sup></p>
                                        <input
                                        required
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={(e)=>setemail(e.target.value)}
                                            placeholder="Enter Email Address"
                                            
                                            className='form-style w-full bg-[#161D29] px-2 py-3 outline-none mt-2 rounded-md'
                                        />
                                    
                                    </label>
                                )
                            }

                            <button type='submit'
                              className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900">
                               {
                                !sentEmail ? "Reset Password" :" Resend Email"
                               }
                             </button>
                         </form>

                       

                     <div className='mt-6 flex items-center justify-between'>
                     <Link to="/signup">
                        <p className='flex items-center gap-x-2 text-richblack-5'>
                        <AiOutlineArrowLeft/>
                            Back to Login
                        </p>
                            
                        </Link>
                     </div>
                    </div>
                )
            }
        </div>
    </div>
  )
}

export default Forgotpassword