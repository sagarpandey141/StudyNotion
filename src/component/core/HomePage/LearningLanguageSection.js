import React from 'react'
import know_your_progress  from "../../../../src/assets/Images/Know_your_progress.png"
import compare_with_others from "../../../../src/assets/Images/Compare_with_others.png"
import plan_your_lesson from "../../../../src/assets/Images/Plan_your_lessons.png"
import HighlightText from './HighlightText'
import BTN from './BTN'

const LearningLanguageSection = () => {
  return (
    <div className='mt-[140px]'>
         <div className='flex flex-col gap-5 items-center'>
             <div className='text-4xl font-semibold tracking-tighter'>
             Your swiss knife for  <HighlightText text={"learning any language"} />
           
             </div>

             <div className='font-inter  font-medium text-center text-base leading-6 w-[60%]'>
             Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
             </div>

             <div className='flex flex-row justify-start items-center'>
                 <img
                 src={know_your_progress}
                 alt="Know Your Progress"
                 className='object-contain -mr-32'
                 ></img>

                 <img
                     src={compare_with_others}
                     alt="Compare With Others"
                     className='object-contain'
                 />

                 <img
                    src={plan_your_lesson}
                    alt="Plan Your Lesson"
                    className='object-contain -ml-36'
                 />
             </div>

             <div className='w-fit'>
                <BTN active={true} linkto={"/signup"} >
                <div className='text-bold'>Learn More</div>
                </BTN>
             </div>
         </div>
    </div>
  )
}

export default LearningLanguageSection