import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useForm} from "react-hook-form"
import {useNavigate} from 'react-router-dom'
import { updateProfile } from '../../../../services/operation/setting.API';

export default function EditProfile(){
   
    const{token}=useSelector((state)=>state.auth)
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const genders = ["Add A Gender","Male", "Female", "Non-Binary", "Prefer not to say", "Other"]
    const{user}=useSelector((state)=>state.profile)
        const{
            register,
            handleSubmit,
            formState: { errors },
        } = useForm()
        
      
     const onsubmitHandler=async(data)=>{
        console.log("form",data)
        try{
             dispatch(updateProfile(data,token))

        } catch(error){
            console.log("ERROR MESSAGE - ", error.message)
        }
     }
   
    
    
    return(
        <form onSubmit={handleSubmit(onsubmitHandler)}>
            <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                 <h2 className="text-lg font-semibold text-richblack-5">Profile Information</h2>
                 <div className="flex flex-col gap-5 lg:flex-row">
                  {/*firstname*/}
                     <div className="flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor='firstName' className="lable-style">First Name</label>
                        <input
                            id="firstName"
                            type="text"
                            name='firstName'
                            className='form-style'
                            placeholder='Enter First Name'
                            {...register("firstName",{required:true})}
                            defaultValue={user?.firstName}
                        />
                        {
                            errors.firstName && (
                                <div>
                                    <p> Please enter your first name.</p>
                                </div>
                            )
                        }
                     </div>

                     {/*lastname*/}
                     <div className="flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor='lastName' className="lable-style">Last Name</label>
                        <input
                            id="lastName"
                            type="text"
                            name='lastName'
                            className='form-style'
                            placeholder='Enter last Name'
                            {...register("lastName",{required:true})}
                            defaultValue={user?.lastName}
                        />
                        {
                            errors.lastName && (
                                <div>
                                    <p> Please enter your last name.</p>
                                </div>
                            )
                        }
                     </div>
                </div>
                                 
                <div  className="flex flex-col gap-5 lg:flex-row">
                  {/*date of birth*/}
                   <div className="flex flex-col gap-2 lg:w-[48%]">
                    <label htmlFor='dateOfBirth' className='lable-style'>Date Of birth</label>
                   <input
                      type='date'
                      id='dateOfBirth'
                      name='dateOfBirth'
                      className="form-style"
                      defaultValue={user?.additionalDetail?.dateOfBirth}
                    {...register("dateOfBirth", {
                       required: {
                         value: true,
                         message: "Please enter your Date of Birth.",
                    },
                    max: {
                        value: new Date().toISOString().split("T")[0],
                         message: "Date of Birth cannot be in the future.",
                  },
                  })}
                   />
                   {
                    errors.dateofBirth && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                               {errors.dateofBirth.message}
                        </span>
                    )
                   }
                   </div>
                      {/*gender*/}
                      <div className="flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor='gender' className='lable-style'>Gender</label>
                        <select
                        type='text'
                        id="gender"
                        name='gender'
                        className='form-style'
                        
                        defaultValue={user?.additionalDetail?.gender}
                        {...register("gender",{required:true})}>
                          {genders.map((ele,i)=>{
                              return(
                                 <option key={i} value={ele}>
                                    {ele}
                                 </option>
                              )
                          })}
                        </select>
                        {
                            errors.Gender && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                Please enter your Date of Birth.
                                </span>
                            )
                        }
                      </div>
                 </div>

                <div  className="flex flex-col gap-5 lg:flex-row">
                {/*contact number*/}
                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor='contactNumber' className='lable-style'>Contact Number</label>
                        <input
                            id="contactNumber"
                            name="contactNumber"
                            type="tel"
                            placeholder='Enter Conteact Number'
                            className='form-style'
                            {...register("contactNumber", {
                                required: {
                                    value: true,
                                    message: "Please enter your Contact Number.",
                                },
                                maxLength: { value: 12, message: "Invalid Contact Number" },
                                minLength: { value: 10, message: "Invalid Contact Number" },
                                })}
                                defaultValue={user?.additionalDetail?.contactNumber}
                        />
                        {
                            errors.contactNumber && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                {errors.contactNumber.message}
                                </span>
                            )
                        }
                    </div>
                    {/*about */}
                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor='about' className='lable-style'>About</label>
                        <input
                            id='about'
                            type='text'
                            name='about'
                            placeholder='Enter Bio Details'
                            className='form-style'
                            {...register("about",{
                                required:true,
                            })}
                            defaultValue={user?.additionalDetail?.about}
                        />
                        {
                            errors.about && (
                                <span  className="-mt-1 text-[12px] text-yellow-100">
                                    Please Enter About Us
                                </span>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className='flex justify-end gap-2'>
                 <button
                 className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                 onClick={()=>{
                    navigate("/dashboard/my-profile")
                 }}>
                      Cancel
                 </button>
                 <button
                 className="cursor-pointer rounded-md bg-yellow-100 py-2 px-5 font-semibold text-black"
                 type='submit'>
                     Save
                 </button>
            </div>
        </form>
    )
}