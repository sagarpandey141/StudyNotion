import React, { useEffect, useState } from 'react'
import RatingStars from '../../common/RatingStar';
import { course } from '../../../services/api';
import { Link } from 'react-router-dom';
import GetAvgRating from '../../../utils/avgRating';

const Course_Card = ({courses,Height}) => {

    const[AvgRating,setavgRating]=useState(0);

    useEffect(()=>{
        const response= GetAvgRating(courses?.ratingAndReview)
        if(response){
            setavgRating(response);
        }
    },[courses])
  return (
    <>
        <div>
            <Link
            to={`courses/${courses._id}`}>
               <div>
                  <div>
                    <img
                        src={courses?.thumbnail}
                        alt='Course Thumbnail'
                        className={`${Height} w-full rounded-xl object-cover `}
                    />

                  </div>
                  <div className="flex flex-col gap-2 px-1 py-3">
                      <p className="text-xl text-richblack-5">{courses?.courseName}</p>
                      <p  className="text-sm text-richblack-50">{courses.instructor?.firstName} {courses.instructor?.lastName}</p>
                      <div className="flex items-center gap-2">
                          <span className='text-yellow-50'>{AvgRating || 0}</span>
                          <RatingStars Review_Count={AvgRating}/>
                          <p className='text-richblack-50'>{courses.ratingAndReview.length}</p>
                      </div>
                      <p className="text-xl text-richblack-5">Rs. {courses.price}</p>
                  </div>
               </div>
            </Link>
        </div>
    </>
  )
}

export default Course_Card