import React, { useEffect, useState } from 'react'

const ReqirmentFields = ({name,label,register,errors,setValue,getValues}) => {
 
    const[requirement,setrequirements]=useState("");
    const[requirementList,setrequirementsList]=useState([])
   
    console.log("requirements is",requirement);
    console.log("requirment list",requirementList);
    
       useEffect(()=>{
            register(name,{
               required:true,
        
              })
         },[])
     
         useEffect(()=>{
            setValue(name,requirementList)
         },[requirementList])

    const handleAddRequirments=()=>{
         if(requirement){
            setrequirementsList([...requirementList,requirement] )
            setrequirements("");
         }
    }

    const handleRemoveRequirements=(index)=>{
          const updatedrequiementList=[...requirementList]
          updatedrequiementList.splice(index,1);
          setrequirementsList(updatedrequiementList);
    }
  return (
    <div>
         <label htmlFor={name}>{label}<sup>*</sup></label>
        <div>
        <input
            type="text"
            id={name}
            value={requirement}
            onChange={(e)=>setrequirements(e.target.value)}
             className='w-full  form-style'
         />
         <button
         type='button'
         onClick={handleAddRequirments}
         className='font-semibold text-yellow-50'>
             Add
         </button>
        </div>
        
        {
            requirementList.length > 0 && (
                <ul>
                    {
                        requirementList.map((requirement, index) => (
                            <li key={index} className='flex items-center text-richblack-5 gap-2'>
                                <span>{requirement}</span>
                                <button
                                type='button'
                                onClick={() => handleRemoveRequirements(index)}
                                className='text-xs text-pure-greys-300'>
                                    clear
                                </button>
                            </li>
                        ))
                    }
                </ul>
            )
        }
            
        
        {
            errors[name] && (
                <span className='text-white'>
                    {label} is required
                </span>
            )
        }
    </div>

  )
}

export default ReqirmentFields