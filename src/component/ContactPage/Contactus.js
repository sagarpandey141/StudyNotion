import React, { useEffect, useState } from 'react'
import {useForm} from "react-hook-form"
import BTN from '../core/HomePage/BTN';
import {contactusEndpoint} from "../../services/api"
import axios from "axios"
import { toast } from 'react-hot-toast';
import { apiConnector } from '../../services/apiconnector';
const Contactus = () => {

    const[loading,setloading]=useState(false);
    const{
        register,
        handleSubmit,
        reset,
        formState: {errors,isSubmitSuccessful}
    }=useForm();
    

   const submitContactForm=async(data)=>{
      const toastId=toast.loading("Sending The Message To The Team")
         try{
            setloading(true);
            const res=await apiConnector("POST",contactusEndpoint.CONTACT_US_API,{data})
            const sendingMessageToHead=await apiConnector("POST",contactusEndpoint.CONTACT_US_API,{})
            console.log("res",res);
            if(res){
                toast.dismiss(toastId);
                toast.success("Message Sent SuccessFully Our Team Will Contact You Shortly")
            }
            setloading(false);
         } catch(err){
            console.log("ERROR MESSAGE - ", err.message)
            setloading(false)
         }
         toast.dismiss(toastId);

   }



    useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                email:"",
                firstname:"",
                lastname:"",
                Message:"",
            
            })
        }
    },[reset,isSubmitSuccessful])
  return (
    <form 
    className="flex flex-col gap-7 w-full items-center"
    onSubmit={handleSubmit(submitContactForm)}>
         
         <div className="flex flex-col gap-5 lg:flex-row">
            {/*firstname*/}
            <div  className="flex flex-col gap-2 lg:w-[48%]">
                <label htmlFor='firstname' className="lable-style">
                <p
              
                >First Name</p></label>
                <input
                    type='text'
                    name='firstname'
                    id='firstname'
                    placeholder='Enter first name'
                    className="form-style "
                    {...register("firstname",{required:true})}
                />
                {
                    errors.firstname && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                            Please enter Your Name
                        </span>
                    )
                }
            </div>
            {/*lastname*/}
            <div className="flex flex-col gap-2 lg:w-[48%]">
                <label htmlFor='lastname' className="lable-style">last Name</label>
                <input
                    type='text'
                    name='lastname'
                    id='lastname'
                    className="form-style"
                    placeholder='Enter last name'
                    {...register("lastname")}
                />
                {
                    errors.lastname && (
                        <span>
                            Please enter Your Name
                        </span>
                    )
                }
            </div>
          </div>  
            {/*email*/}
            <div className="flex flex-col gap-2 ">
                <label htmlFor='email' className='lg:ml-[-57%]'>Email Address</label>
                <input
                    type='email'
                    name='email'
                    id='email'
                    className="form-style lg:ml-[-55%] w-[210%]"
                    placeholder='Enter email name'
                    {...register("email",{required:true})}
                />
                {
                    errors.email && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                            Please enter Your email
                        </span>
                    )
                }
            </div>

            {/*message*/}
            <div className="flex flex-col gap-2">
                <label htmlFor='Message' className="lable-style lg:ml-[-33%]">Message</label>
                <textarea
                    className="form-style lg:ml-[-35%] w-[170%]"
                    name='Message'
                    id='Message'
                   cols="30"
                   rows="7"
                   placeholder="Enter your Message here....."
                    {...register("Message",{required:true})}
                />
                {
                    errors.Message && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                            Please enter Your Message
                        </span>
                    )
                }
            </div>

            <button type='submit'
                    className={`lg:w-[33%] lg:ml-[1%] rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
         ${
           !loading &&
           "transition-all duration-200 hover:scale-95 hover:shadow-none"
         }  disabled:bg-richblack-500 sm:text-[16px] `}>
                 Send Message
            </button>
       
    </form>
  )
}

export default Contactus