import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {RiDeleteBin6Line} from "react-icons/ri"
import {GiNinjaStar,} from "react-icons/gi"
import {GrStarOutline} from "react-icons/gr"
import { useEffect } from 'react'
import ReactStars from "react-rating-stars-component";
import { removeFromCart } from '../../../../slices/cartSlice'
const RenderCartCourses = () => {
    const{cart}=useSelector((state)=>state.cart)
    const [averageRating,setaverageRating]=useState([]);
    const dispatch=useDispatch();
//     const getAverage=async()=>{
//         try{
//          const response=await getAverageRating(courseid);
//          setaverageRating(response);
//         } catch(error){
//          console.log("Unable to Fetch Enrolled Courses");
//         }
//    }

//   useEffect(()=>{
//       getAverage();
//   },[])

   
   console.log("cart",cart)
  return (
    <div className="flex flex-1 flex-col" >
           
           {
            cart.map((course,index)=>(
                <div key={index}
                className={`flex w-full flex-wrap items-start justify-between gap-6 ${
                index !== cart.length - 1 && "border-b border-b-richblack-400 pb-6"
            } ${index !== 0 && "mt-6"} `}>
                    <div className="flex flex-1 flex-col gap-4 xl:flex-row">
                        <img src={course.thumbnail}
                             className="h-[148px] w-[220px] rounded-lg object-cover"
                        />
                        <div className="flex flex-col space-y-1">
                            <p className="text-lg font-medium text-richblack-5">{course?.courseName}</p>
                            <p  className="text-sm text-richblack-300">{course?.Category[0]?.name}</p>
                           <div className='flex items-center gap-2'>
                           <span  className="text-yellow-5"> 4.8</span>
                           <ReactStars
                                count={5}
                                value={course?.ratingAndReview?.length}
                                size={20}
                                edit={false}
                                activeColor="#ffd700"
                                emtpyIcon={<GrStarOutline />}
                                fullIcon={<GiNinjaStar />}
                            /> 

                           </div>
                            <span className="text-richblack-400">{course?.ratingAndReviews?.length} Rating</span>
                    </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                        <button onClick={()=> 
                         dispatch(removeFromCart(course._id))}
                         className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200">
                            <RiDeleteBin6Line/>
                            <p>Remove</p>
                        </button>
                        <span className="mb-6 text-3xl font-medium text-yellow-100">  ₹{course?.price}</span>
                    </div>
                </div>
            ))
           }
    </div>
  )
}

export default RenderCartCourses