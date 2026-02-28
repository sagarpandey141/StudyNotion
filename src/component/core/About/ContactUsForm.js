import React from 'react'
import Contactus from '../../ContactPage/Contactus'
const ContactUsForm = () => {
  return (
    <div className='mx-auto'>
           <h1 className="text-center text-4xl font-semibold">Get in Touch</h1>
           <p className="text-center text-richblack-300 mt-3">We'd love to here for you, Please fill out this form.</p>
        
        <div className='mt-12 mx-auto'>
            <Contactus/>
        </div>
     
    </div>
  )
}

export default ContactUsForm