import React from 'react'
import {useSelector} from "react-redux"
import Sidebar from '../component/core/Dashboard/Sidebar';
import { Outlet } from 'react-router-dom';
const Dashboard = () => {

      const {loading:profileLoading}=useSelector((state)=>state.profile);
      const {loading:authLoading}=useSelector((state)=>state.auth);

      if(profileLoading || authLoading){
        return(
            <div className='mt-10'>
                 Loading....
            </div>
        )
      }


  return (
    <div  className='relative flex min-h-[calc(100vh-3.5rem)] bg-richblack-900 w-full'>
          <Sidebar />
          
     <div className='h-[calc(100vh-3.5rem)] overflow-auto   w-full flex justify-center'>
          <div className=' w-[900px] border    py-10 '>
            <Outlet/>
          </div>
    </div>
    </div>
  )
}

export default Dashboard