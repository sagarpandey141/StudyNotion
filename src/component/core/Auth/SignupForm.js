import React, { useState } from 'react'
import {AiFillEyeInvisible,AiOutlineEye} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import {toast} from "react-hot-toast"
import { useDispatch } from 'react-redux'
import { ACCOUNT_TYPE } from '../../../utils/constant'
import Tab from '../../common/Tab'
import {setLoading, setSignupData} from "../../../../src/slices/authSlice"
import { sendOtp } from '../../../services/operation/authApi'

import  {endpoints} from "../../../services/api"
import axios from 'axios'

function SignupForm  ()  {

  const navigate=useNavigate();
  const dispatch=useDispatch();
    const[formdata,setFormData]=useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:"",
    })
    const[accountType,setAccountType]=useState(ACCOUNT_TYPE.STUDENT);
    const[showPassword,setShowPassword]=useState(false);
    const[ConfirmPassword,setConfirmPassword]=useState(false);
  
    const { firstName, lastName, email, password, confirmPassword } = formdata

    const changeHandler=(event)=>{
        setFormData( (form) =>
        ( {  
                ...form,
           [event.target.name] : event.target.value })

         )
        
    }
    async function otp() 
    {
      const toastId=toast.loading("Loading...");
    
      dispatch(setLoading(true));
       try{  
       
   
        const signupData={
             ...formdata,
             accountType,
           }

      dispatch(setSignupData(signupData))
       
        const data = await axios.post(endpoints.SENDOTP_API ,formdata);
        

          if(!data.data.success){
            throw new Error(data.message);
          }
          
          toast.success("Otp Sent SuccessFull");
          navigate("/verify-email");
        
       } catch(error)
       {

        toast.error("Otp Not Sent")
         console.log(error.message);
       }
       toast.dismiss(toastId);
       dispatch(setLoading(false));

    }

  

    const submitHandler=(event)=>{
           event.preventDefault();
           otp();
    }

    const tabData=[
      {
        id:1,
        tabName:"Student",
        type:ACCOUNT_TYPE.STUDENT
      },

      {
        id:2,
        tabName:"Instructor",
        type:ACCOUNT_TYPE.INSTRUCTOR
      },
    ]

  return (
    <div >
    <Tab tabData={tabData} field={accountType} setField={setAccountType} />
   
        <form onSubmit={submitHandler}>
        {/*firstname ans last name*/}

          <div className='flex gap-x-4 mt-[20px]'>
                 
       <label className='w-full '> 
        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
        First Name
          <sup className='text-[#EF476F]'> *</sup>
         </p>
         <br/>

        <input
            required
            value={formdata.firstName}
            placeholder='Enter  First Name'
            name="firstName"
            type="text"
            onChange={changeHandler}
            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] -mt-4 '
         />
             </label>
            
             <label className='w-full '> 
             <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                Last Name
          <sup className='text-[#EF476F]'> *</sup>
         </p>
         <br/>

        <input
            required
            value={formdata.lastName}
            placeholder='Enter Last Name'
            name="lastName"
            type="text"
            onChange={changeHandler}
            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] -mt-4'
         />
             </label>
             </div>

             {/*email add*/}

             <div className='mt-[20px]'>
             <label className='w-full '> 
          <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
          Email
          <sup className='text-[#EF476F]'> *</sup>
         </p>
         <br/>

        <input
            required
            value={formdata.email}
            placeholder='Enter Email Address'
            name="email"
            type="email"
            onChange={changeHandler}
            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] -mt-6'
         />
             </label>
             </div>

        

             {/*password and change password */}
             
             <div className='w-full flex gap-x-4 mt-[18px]'>
             <label className='w-full '> 
                  <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                    Password
                    <sup className='text-[#EF476F]'> *</sup>
                   </p>
             <br/>

         <input
            required
            value={formdata.password}
            placeholder='Enter Password'
            name="password"
            type={showPassword? ("text") :("password")}
            onChange={changeHandler}
            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] -mt-4 relative outline-none'
         />
            
            <span onClick={()=>setShowPassword((prev)=>!prev)} className='absolute left-[24.5%] right-1/3 top-[83%] bottom-1/3 cursor-pointer text-richblack-5'>
            {showPassword ? (<AiFillEyeInvisible/>) :(<AiOutlineEye/>) }
        </span>

             </label>

          
             <label className='w-full '> 
              <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
             Confirm  Password
             <sup className='text-[#EF476F]'> *</sup>
         </p>
         <br/>

        <input
            required
            value={formdata.confirmPassword}
            placeholder='Enter Password'
            name="confirmPassword"
            type={ConfirmPassword? ("text") :("password")}
            onChange={changeHandler}
            className='relative bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] -mt-4 outline-none'
         />
         
         <span onClick={()=>setConfirmPassword((prev)=>!prev)} className='absolute left-[40%] right-[30%] top-[83%] bottom-1/3 cursor-pointer text-richblack-5 '>
            {showPassword ? (<AiFillEyeInvisible/>) :(<AiOutlineEye/>) }
        </span>

             </label>
             </div>
            
            {/*button*/}

             <button className="bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6 w-[444px] " type="submit">
                Create Account
              </button>

        </form>

         
    </div>
  )
}

export default SignupForm