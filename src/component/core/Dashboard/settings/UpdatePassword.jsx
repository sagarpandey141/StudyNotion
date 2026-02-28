import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { UpdatePasswordCo } from '../../../../services/operation/setting.API';
import { useSelector } from 'react-redux';

export default function UpdatePassword(){

       const {token} =useSelector((state)=>state.auth)
       const navigate=useNavigate();
       const{
        setValue,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
      
            const onsubmitHandler=async(data)=>{
                try{
                     await UpdatePasswordCo(token,data);
                     setValue("currentPassword","")
                     setValue("newPassword","")
                } catch(error){
                    console.log("ERROR MESSAGE - ", error.message)
                }
            }
  return (
    <form onSubmit={handleSubmit(onsubmitHandler)}>
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
            <h2 className="text-lg font-semibold text-richblack-5">Password</h2>
            <div className="flex flex-col gap-5 lg:flex-row">
                {/*current password*/}
                <div  className="relative flex flex-col gap-2 lg:w-[48%]">
                    <label htmlFor='currentPassword' className='lable-style'>current password</label>
                    <input
                        id='currentPassword'
                        type='password'
                        name='currentPassword'
                        placeholder='Enter Current Password'
                        className='form-style'
                        {...register("currentPassword",{
                            required:true
                        })}
                    />

                    {
                        errors.currentPassword && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                Enter Current Password
                            </span>
                        )
                    }
                </div>
                
                {/*new password*/}
                <div className="relative flex flex-col gap-2 lg:w-[48%]">
                    <label htmlFor='newPassword' className='lable-style'>New password</label>
                    <input
                        id='newPassword'
                        type='password'
                        name='newPassword'
                        placeholder='Enter new Password'
                        className='form-style'
                        {...register("newPassword",{
                            required:true
                        })}
                    />

                    {
                        errors.newPassword && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                Enter new Password
                            </span>
                        )
                    }
                </div>

                

            </div>
        </div>

        <div className="flex justify-end gap-2">
            <button onClick={()=>{
             navigate("/dashboard/settings")
            }}
            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50">
                Cancel
            </button>
            <button type="submit"
            className=" cursor-pointer rounded-md bg-yellow-100 py-2 px-5 font-semibold text-black">
                Update
            </button>
        </div>
    </form>
  )
}

