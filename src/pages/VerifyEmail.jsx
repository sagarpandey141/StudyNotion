import React, { useEffect,useState } from 'react'
import {RxCountdownTimer} from "react-icons/rx"
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setToken } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import {BiArrowBack} from "react-icons/bi"
import { toast } from 'react-hot-toast';
import OtpInput from "react-otp-input"
import { endpoints } from '../services/api';
import axios from 'axios';
import { Link } from 'react-router-dom';

const VerifyEmail = () => {

  const dispatch=useDispatch();
  const[otp,setotp]=useState(" ");
  const{signupData,loading}=useSelector((state)=>state.auth);
  const navigate=useNavigate();

  async function otpsend(email){
      const toastId=toast.loading('Loading');
      try{
        const response=await axios.post(endpoints.SENDOTP_API,{email});
       
        toast.success("Email Sent");

      } catch(error){
          console.log("error in sending otp",error.message);
          toast.error("Otp not sent");
      }
      toast.dismiss(toastId);
  }

  useEffect(()=>{
    if(!signupData){
         navigate("/signup")
    }
  },[])
     
 

  async function signuphandler(signupData){
       
    const finaldata={
        ...signupData,
        otp,
    }

   
    
            dispatch(setLoading(true));
           
            try{
                const response=await axios.post(endpoints.SIGNUP_API,
                    finaldata
                )

                
                toast.success("Sign Up SuccessFull");
                navigate("/login");
              
            } catch(error){
                 console.log("Error in Signup", error.message);
                 toast.error("Unable to Signup");
            }
            dispatch(setLoading(false));
  }
     const handleVerifyAndSignup=(e)=>{
        e.preventDefault();

        const{
            firstName,
            lastName,
            email,
        
            password,
            confirmPassword
        }=signupData
      
         

     
        signuphandler(signupData);
     }

    const handleotp=()=>{
      
        otpsend(signupData.email);
    }
      
  return (
    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center"> 

    {
        loading ? (
            <div>Loading....</div>
        ) : (
            <div className="max-w-[500px] p-4 lg:p-8">
           <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">Verify email</h1>
           <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">A verification code has been sent to you. Enter the code below</p>

          <form onSubmit={handleVerifyAndSignup}>
          <OtpInput
                value={otp}
                onChange={setotp}
                numInputs={6}
                renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                />
              )}
              containerStyle={{
                justifyContent: "",
                gap: "0 6px",
              }}

           />

           <button type='submit'
            className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900">
             Verify Email
           </button>
          </form>

          <div className="mt-6 flex items-center justify-between">
               <Link to="/login">
                  <p  className="text-richblack-5 flex items-center gap-x-2"> <BiArrowBack />   Back to login</p>
               </Link>

               <button onClick={handleotp} className='flex gap-2 items-center '>
               <RxCountdownTimer />
                   <p>Resend it</p>
               </button>
          </div>
       </div>

        )
    }
          
    </div>
  )
}

export default VerifyEmail