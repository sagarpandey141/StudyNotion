import React, { useState } from 'react'
import {HomePageExplore} from "../../../../src/data/homepage-explore"
import HighlightText from './HighlightText';

import CourseCard from './CourseCard';

const tabName=[
"Free",
"New to coding",
"Most popular",
"Skill paths",
"Career paths",

]

const ExploreMore = () => {

    const[currentTab,changeCurrentTab]=useState(tabName[0]);
    const[courses,setCourses]=useState(HomePageExplore[0]?.courses);
    const[currentCard,setCurrentCard]=useState(HomePageExplore[0].courses[0].heading);

 const setmyCard=(Element)=>{
      changeCurrentTab(Element);
      const result=HomePageExplore.filter((courses)=>courses.tag===Element);
      setCourses(result[0].courses);
      setCurrentCard(result[0].courses[0].heading);
 }

  return (
    <div>
           <div className='text-4xl front-semibold text-center'>Unlock the  <HighlightText text= {"Power of Code"}/>
           
           </div>

           <div className='text-[19px] text-sm text-richblack-300 text-center mt-3'>
           Learn to Build Anything You Can Imagine
           </div>

           <div className="flex flex-row mt-5 bg-richblack-800 rounded-full mb-5 border-richblack-100  py-1 px-3">
            {
                tabName?.map((Element,index)=>{
                    return(
                         <div className={`text-[16px] flex justify-between  gap-2 
                         ${currentTab===Element ?
                         " bg-richblack-900 text-richblack-5 font-medium px-1 " :
                          "text-richblack-200"} transition-all duration-200 cursor-pointer
                hover:bg-richblack-900 hover:text-richblack-5 px-2 py-1 rounded-xl`}
                key={index}
                 onClick={()=>setmyCard(Element)} >
                            {Element}
                         </div>
                    )
                })
            }
           </div>
            <div className="hidden lg:block lg:h-[200px]"></div>
             <div className="lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3">
             {
            courses.map((data,index)=>{
               return ( <CourseCard
                  key={index}
                  cardData={data}
                  currentCard={currentCard}
                  setCurrentCard={setCurrentCard}
                 />
               )
           })
           }
           </div>

    </div>
  )
}

export default ExploreMore