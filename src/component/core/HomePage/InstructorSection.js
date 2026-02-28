import React from 'react'
import Instructor from "../../../../src/assets/Images/Instructor.png"
import HighlightText from './HighlightText'
import BTN from './BTN'
import {FaArrowRight} from "react-icons/fa"
const InstructorSection = () => {
  return (
    <div className='mt-16'>
      <div className='flex flex-row gap-20 items-center'>
          <div className='w-[50%]'>
             <img src={Instructor}
             className='shadow-white'
             ></img>
          </div>

          <div className='flex flex-col w-[50%] gap-6'>
              <div className='text-white text-4xl font-semibold w-[50%]'>Become an 
              <HighlightText text={"instructor"}/> </div>
             
                <p className='font-medium text-[16px] text-richblack-300 w-[80%]'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
                <div className='w-fit'>
                    <BTN active={true} linkto={"/signup"}>
                        <div className='flex flex-row items-center gap-2'>
                           Start Teaching Today
                           <FaArrowRight/>
                        </div>
                    </BTN>
                </div>
          </div>
      </div>
    </div>
  )
}

export default InstructorSection