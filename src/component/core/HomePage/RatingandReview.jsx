import React, { useEffect, useState } from 'react'
import { FetchAllRatingandReviews } from '../../../services/operation/RatingandReview';
import ReactStars from 'react-stars';
import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Autoplay,FreeMode,Navigation, Pagination}  from 'swiper'
import {FaStar} from "react-icons/fa"
const RatingandReview = () => {
    
    const[ratingData,setRatingData]=useState([]);
    useEffect(()=>{

        const fetchRatingandReview=async()=>{
               const res=await FetchAllRatingandReviews();
               setRatingData(res);
        }
        fetchRatingandReview();
    },[])
 
  return (
 
           <div className='text-white' >
        
                    <div className='h-[190px] max-w-maxContent flex mt-3  mx-auto'>
                    <Swiper
                    modules={[FreeMode, Pagination, Autoplay]}
                    setWrapperSize={20}
                    slidesPerView={2}
                    spaceBetween={20}
                    loop={true}
                    className='max-w-3xl mx-auto  '
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction:false
                    }}
                  
                     >
                                  {
                                        ratingData?.map((data,index)=>(
                                             
                                             <SwiperSlide key={index} className='bg-richblack-800 gap-3 w-fit ' >
                                            
                                               <div className='flex gap-4 mt-4 ml-3'>
                                                  
                                                <img
                                                    src={data?.user?.images}
                                                    alt={data?.user?.firstName}
                                                    className='h-9 w-9 object-cover rounded-full mt-3'
                                                />
                                                  <div className='flex-col mt-3'>
                                                    <p className=''>{data?.user?.firstName} {data.user?.lastName}</p>
                                                    <p className='text-richblack-300'>{data?.course?.courseName}</p>
                                                  </div>
                                               
                                               </div>

                                              
                                                {/*rating and reviews*/}
                                               
                                                    <p className='ml-3 mt-3'>{data.review}</p>
                                                    
                                                     <div className='flex items-center gap-3 ml-2 mt-3'>
                                                        <p className='text-yellow-100 font-bold'>{data.rating.toFixed(1)}</p>
                                                        <ReactStars
                                                            count={5}
                                                            value={data.rating}
                                                            size={20}
                                                            edit={false}
                                                            activeColor="#ffd700"
                                                            emptyIcon={<FaStar />}
                                                            fullIcon={<FaStar />}
                                                        />
                                                     </div>

                                    
                                        
                                             </SwiperSlide>
                                        ))
                              }
                              
                       </Swiper>
                                
                 </div>
                </div>
            )
         }
  
  


export default RatingandReview

