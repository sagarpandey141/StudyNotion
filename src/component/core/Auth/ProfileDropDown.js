import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {AiOutlineCaretDown} from "react-icons/ai"
import { useNavigate } from 'react-router-dom';
import {logout} from "../../../services/operation/authApi"
import { Link } from 'react-router-dom';
import useOnClickOutside from "../../../hooks/useonclickOutside"
import {VscDashboard,VscSignOut} from "react-icons/vsc"
  
export default function ProfileDropdown(){
  
const dispatch=useDispatch();
const navigate=useNavigate();
const {user}=useSelector((state)=>state.profile)
const[open,setopen]=useState(false);
const ref=useRef(null);

useOnClickOutside(ref,()=>setopen(false));
  
    return(
      
       <button className='relative' onClick={()=>setopen(true)}>
          <div className='flex items-center gap-x-1'>
             <img
             src={user?.images}
             alt={`profile-${user?.firstName}`}
             className="aspect-square w-[30px] rounded-full object-cover text-white"
             ></img>
             <AiOutlineCaretDown className="text-sm text-richblack-100"/>
          </div>
         
          {open && (
            <div
             onClick={(e)=>e.stopPropagation()}
            
             className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800"
             ref={ref}
            >
                <Link to="/dashboard/my-profile" onClick={()=>setopen(false)}>
                    <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
                        <VscDashboard className="text-lg"/>
                        Dashboard
                    </div>
                </Link>
                <div
            onClick={() => {
              dispatch(logout(navigate))
              setopen(false)
            }}
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
          >
            <VscSignOut className="text-lg" />
            LogOut
          </div>
            </div>
          )}
       </button>
       
    )
}