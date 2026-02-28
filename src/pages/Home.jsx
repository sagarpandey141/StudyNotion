import React, { useEffect } from 'react'
import { BsArrowRightShort } from 'react-icons/bs';
import HighlightText from "../../src/component/core/HomePage/HighlightText";
import BTN from "../../src/component/core/HomePage/BTN";
import banner from "../assets/Images/banner.mp4"
import {Link, useNavigate} from "react-router-dom"
import CodeBlock from '../../src/component/core/HomePage/CodeBlock';
import TimeLineLanguage from '../../src/component/core/HomePage/TimeLineLanguage';
import LearningLanguageSection from '../../src/component/core/HomePage/LearningLanguageSection';
import InstructorSection from '../../src/component/core/HomePage/InstructorSection';
import ExploreMore from '../../src/component/core/HomePage/ExploreMore';
import RatingandReview from '../component/core/HomePage/RatingandReview';
import Footer from '../component/common/Footer';
import { checkJwtExpired } from '../services/operation/authApi';
const Home = () => {
  const navigate=useNavigate()
  const token=localStorage.getItem("token");
  
 

  return (
    <div>
    {/*section 1*/}
     <div className="relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between">
      <Link to={"/signup"}>
          <div className="group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
            transition-all duration-200 hover:scale-95 w-fit">
            <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px]
                transition-all duration-200 group-hover:bg-richblack-900'>
              <p> Become an Instructor</p> 
               <BsArrowRightShort/>
            </div>
          </div>
       </Link>

          <div className="mt-4 text-center text-4xl font-semibold  ">
          Empower Your Future with <HighlightText text="Coding Skills"></HighlightText>
          </div>

          <div className=" mt-4 w-[90%] text-center text-lg font-bold text-richblack-300">
          With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a <br/>
           wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
          </div>

        <div className="flex mt-10 gap-7">
          <BTN linkto={"/signup"} active={true}>learn More</BTN>
          <BTN linkto={"/login"} active={false}>Book a Demo</BTN>
          </div>

          <div className="mx-3 my-7 shadow-[10px_-3px_50px_-5px] shadow-blue-200">
            
              <video className="shadow-drop w-[1035px] h-[515px] " autoPlay loop muted controls>
                <source src={banner} type='video/mp4'></source>
              </video>
          </div>
           {/*code section 1*/}
           <div>
                 <CodeBlock
                    
                    position={"lg:flex-row"}
                    heading={
                       <div className='text-4xl font-semibold'>
                           Unlock your <HighlightText text="coding potential"></HighlightText>   
                           
                          <br/> with our online courses.
                       </div>
                    }

                    subHeading={
                       `Our courses are designed and taught by industry experts who 
                        have years of experience in coding and are passionate about sharing their knowledge with you.`
                    }
                    
                   ctabtn1={
                    {
                         btntext:"Try it Yourself",
                         linkto:"/signup",
                         active:true

                    }

                   }
                  
                  ctabtn2={
                    {
                      btntext:"Learn More",
                      linkto:"/login",
                      active:false
                    }
                  }

                  codeblock={`<<!DOCTYPE html>\n<html>\nhead><title>Example</title><link rel="stylesheet"href="styles.css">\n/head>\n/body>\n/h1><ahref="/">Header</a>\n//h1>\n/nav><ahref="one/">One</a><ahref="two/">Two</\n/a><ahref="three/">Three</a>\n//nav>`}
                  blockcolor="text-yellow-25, text-pink-300, text-pink-200"
                 />
                
                </div>
                {/*code section 2*/}
                <div>
                <CodeBlock
                      
                      position={"lg:flex-row-reverse"}
                    heading={
                       <div className='text-4xl font-semibold'>
                          Start <HighlightText text="coding in seconds"></HighlightText>   
                           
                        
                       </div>
                    }

                    subHeading={
                       "Go ahead, give it a try. Our hands-on learning environment  means you'll be writing real code from your very first lesson."
                    }
                    
                   ctabtn1={
                    {
                         btntext:"Continue Lesson",
                         linkto:"/signup",
                         active:true

                    }

                   }
                  
                  ctabtn2={
                    {
                      btntext:"Learn More",
                      linkto:"/login",
                      active:false
                    }
                  }

                  codeblock={`<<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\n/body>\n/h1><ahref="/">Header</a>\n//h1>\n/nav><ahref="one/">One</a><ahref="two/">Two</\n/a><ahref="three/">Three</a>\n//nav>`}
                  blockcolor="text-yellow-25"

                />
               
                </div>
            <ExploreMore/>
     </div>
     {/*section 2*/}
     <div className='bg-pure-greys-5 text-richblack-700'>
           <div className='homepage_bg h-[310px]'>
               <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto'>
               <div className='h-[150px]'></div>
               <div className='flex gap-7 text-white'>
                  <BTN  linkto={"/signup"} active={true}>
                      <div className='flex items-center gap-3'>
                      Explore Full Catalog
                       <BsArrowRightShort/> 
                      </div>
                  </BTN>
                  <BTN active={false} linkto={"/signup"}>Learn More
                  </BTN>
                  </div>
               </div>
           </div>

            <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto'>
             <div className='flex flex-row mt-[95px] mb-10 gap-5'>
                   <div className='text-4xl font-semibold w-[45%]'>
                   Get the skills you need for a 
                  <HighlightText text="job that is in demand."></HighlightText> 
                   </div>

                   <div className='flex flex-col gap-10 w-[40%] items-start'>
                     <div className='text-[16px]'>
                     The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                     </div>

                     <div>
                        <div>
                           <BTN active={true} linkto={"/signup"}>Learn More</BTN>
                        </div>
                     </div>
                   </div>
             </div>
                <TimeLineLanguage/>
                <LearningLanguageSection/>
           </div>
          
          <div className='h-[80px]'></div>

     </div>
     {/*section 3*/}
     <div className='flex w-11/12 flex-col mx-auto max-w-maxContent items-center bg-richblack-900 justify-between text-white '>
       <InstructorSection/>
      {/*section 4*/}
      <div>
      <h2 className='text-center font-semibold text-4xl mt-[90px] '>Reviews from other Learners</h2>
        <RatingandReview/>
      </div>

     </div>
     <Footer/>
</div>

  )
}

export default Home