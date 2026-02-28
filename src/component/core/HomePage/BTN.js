import React from 'react'
import {Link} from "react-router-dom"
const BTN = ({children,linkto,active}) => {
  return (
    <Link to={linkto}>
         <div className={`flex flex-row items-center py-2 px-4 rounded ${active ?  "bg-yellow-50 text-black":" bg-richblack-800"} `}>
      
             {children}
         </div>
            
         
    </Link>
   
  )
}

export default BTN