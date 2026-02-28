import React, { useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links';
import { useDispatch, useSelector } from 'react-redux';
import SidebarLink from './SidebarLink';
import {  useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../common/ConfirmationModal';
import {VscSignOut} from "react-icons/vsc"
import { logout } from '../../../services/operation/authApi';

const Sidebar = () => {
     const dispatch=useDispatch();
    const {user,loading:profileLoading}=useSelector((state)=>state.profile);
    const {loading:authLoading}=useSelector((state)=>state.auth);
    const[confirmationModal,setconfirmationModal]=useState(null);
    const navigate = useNavigate();
    if(profileLoading || authLoading){
        return(
            <div className='mt-10'>
                 Loading....
            </div>
        )
      }

  return (
    <div className='text-richblack-100 lg:h-[100%]  bg-richblack-800 '>
        <div className='flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10 fixed
       '>
            <div className='flex flex-col gap-2'>
                {
                      sidebarLinks.map((link)=>{
                          if(link.type && user?.accountType!==link.type) return null;
                         return(
                             <SidebarLink key={link.id} link={link} iconName={link.icon} />
                         )
                      })
                }
            </div>
            <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600'></div>

            <div className='flex flex-col gap-x-2 gap-2'>
                <SidebarLink
                 link={{name:"Settings",path:"/dashboard/settings"}}
                 iconName="VscSettingsGear"
                />

                <button 
                onClick={()=>setconfirmationModal({
                            text1: "Are You Sure ?",
                            text2: "You will be logged out of your Account",
                            btn1Text: "Logout",
                            btn2Text:"Cancel",
                             btn1handler: () => dispatch(logout(navigate)),
                             btn2handler: () => setconfirmationModal(null),
            
               } )}
               className='text-sm font-medium text-richblack-300 ml-3'>
               <div className='flex items-center gap-x-2 text-richblack-300 text-lg translate-x-7'>
               <VscSignOut className=" "/>
                   <span className=' '> Logout</span>
               </div>
                 
                </button>

            </div>
        </div> 
        {confirmationModal && <ConfirmationModal Modaldata={confirmationModal}/>}
    </div>
  )
}

export default Sidebar