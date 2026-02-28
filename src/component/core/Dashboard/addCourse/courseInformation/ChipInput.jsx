import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import {MdClose} from "react-icons/md"
import { useEffect } from 'react';

export default function ChipInput ({

  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
  getValues,
}){

  const[chip,SetChip]=useState([]);
  const{editCourse,course}=useSelector((state)=>state.course)

  useEffect(()=>{
    
    if(editCourse){
      let str = course.tag[0]; 
      str = str.replace(`["`,"");
      str = str.replace(`"]`,"");
      // console.log("tr", str);
      SetChip(str.split(" "));
     
    }

    register(name,{required:true,validate: (value) => value.length > 0 })
  },[])
 
  useEffect(()=>{
    setValue(name,chip)
  },[chip])

  const handleKeyDown=(event)=>{
    if(event.key==="Enter" || event.key===','){
       event.preventDefault();
       const chipValue=event.target.value.trim();
             {/*duplication*/}
       if(chipValue && !chip.includes(chipValue)){
            const newChip=[...chip,chipValue]
            SetChip(newChip);
            event.target.value=""
       }
    }
  }

  const handleDeleteChip=(Chipindex)=>{

    const newChip=chip.filter((_,index)=>index!==Chipindex);
    SetChip(newChip);
  }
  return (
    <div className="flex flex-col space-y-2">
       
       <label className="text-sm text-richblack-5" htmlFor={name}>{label}</label>
        <div className="flex w-full flex-wrap gap-y-2">
           {
               chip.map((chip,index)=>(
                   <div key={index}
                    className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5">
                          {chip}

                          <button
                          type='button'
                          onClick={()=>handleDeleteChip(index)}
                          className="ml-2 focus:outline-none">

                          <MdClose className="text-sm" />
                          </button>
                   </div>
               ))}
                {/*render input to adding chip*/}
                <input
                  id={name}
                  name={name}
                  type='text'
                  placeholder={placeholder}
                  onKeyDown={handleKeyDown}
                  className="form-style w-full"
                />
        </div>
            {
               errors[name] && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                  {label} is required
                </span> 
               )
            }
    </div>
  )
}

