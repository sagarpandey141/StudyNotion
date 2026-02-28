import React from 'react'
import ContactDetail from '../component/ContactPage/ContactDetail'
import ContactUsForm from '../component/ContactPage/ContactUsForm'
import Footer from '../../src/component/common/Footer'
import RatingandReview from '../component/core/HomePage/RatingandReview'



const Contact = () => {
  return (
    <div>
    <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row">
       <div className="lg:w-[40%]">
             <ContactDetail/>
       </div>
       <div className="lg:w-[60%]">
        <ContactUsForm/>
       </div>
     </div>
     <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
     <h1 className=' text-pink-500 text-3xl'> Reviews from other learners</h1>
      <RatingandReview/>
     </div>
     <Footer/>
    </div>
  )
}

export default Contact