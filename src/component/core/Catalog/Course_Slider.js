import React from 'react'
import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Autoplay,FreeMode,Navigation, Pagination}  from 'swiper'
import Course_Card from './Course_Card'
import { course } from '../../../services/api'

const Course_Slider = ({courses}) => {
  console.log("courses",courses);
  return (
    <div>
          <Swiper
                    slidesPerView={1}
                   
                    spaceBetween={200}
                    pagination={true}
                    modules={[Autoplay,Pagination,Navigation]}
                    className="mySwiper"
                    autoplay={{
                    delay: 1000,
                    disableOnInteraction: false,
                    }}
                    navigation={true}
                    breakpoints={{
                        1024:{slidesPerView:3,}
                    }}
                >
                    {
                          courses?.map((data,index)=>(
                            <SwiperSlide key={index}>
                           <Course_Card courses={data} Height={"h-[400px]"}
                           />
                           </SwiperSlide>
                          ))
                    }
                </Swiper>
    </div>
  )
}

export default Course_Slider