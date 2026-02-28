import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { fetchcourseCategories } from '../services/operation/CourseApi';
import { getCatalogPageData } from '../services/operation/PageandComponent';
import Course_Card from '../component/core/Catalog/Course_Card';
import Course_Slider from '../component/core/Catalog/Course_Slider';
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/api';
import Footer from "../component/common/Footer"
import Error from './Error';
const Catalog = () => {
    
    const{catalogName}=useParams();
    const[categoryid,setCategoryId]=useState(null);
    const[catalogPageData,setCatalogPageData]=useState("");
    const[active,SetActive]=useState(1);
    //fetch all category
    
    useEffect(()=>{
        const getCategories=async()=>{
            
                const response=await apiConnector("GET",categories.CATEGORIES_API);
                  console.log("catalog res",response);
                const category_id = 
                response?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
             
                setCategoryId(category_id);
             
        }

        getCategories();
    },[catalogName])

    useEffect(() => {
          
        const getCategoryPageDetails=async()=>{
              try{
          
                     const response=await getCatalogPageData(categoryid);
                     console.log("catalogPageData",response)
                     setCatalogPageData(response);
              } catch(error){
                  console.log("error",error)
              }

             
        }

        if(categoryid){
            getCategoryPageDetails();
       }

    }, [categoryid])
    console.log("catalogPageData",catalogPageData.data);

    if(!catalogPageData.success){
         return <Error/>
    }
  return (
    <div className=" box-content bg-richblack-800 ">
        <div  className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
            <p className="text-sm text-richblack-300">{`Home/Catalog/`}</p>
            <span className='text-yellow-25'>
               {catalogPageData?.data?.specifiedCategory?.name}
            </span>
           
                <p className="text-3xl text-richblack-5"> {catalogPageData?.data?.specifiedCategory?.name}</p>
               <p className="max-w-[870px] text-richblack-200">{catalogPageData?.data?.specifiedCategory?.description}</p>
        </div>

        <div className='bg-richblack-900'>
            {/*section 1*/}
            <div className=" mx-auto box-content w-full max-w-maxContent px-4 py-12 lg:max-w-maxContent  ">
                <div className="section_heading">Courses to get you started</div>
               <div className="my-4 flex border-b border-b-richblack-600 text-sm">
                <p className={`px-4 py-2 ${
                     active===1 ? "border-b border-b-yellow-25 text-yellow-25" :
                     "text-richblack-50"
                } cursor-pointer`}
                onClick={()=>SetActive(1)}>Most Popular</p>
                <p className={`px-4 py-2 ${
                     active===2 ? "border-b border-b-yellow-25 text-yellow-25" :
                     "text-richblack-50"
                } cursor-pointer`}
                onClick={()=>SetActive(2)}>New</p>
               </div>
               <div>
                <Course_Slider courses={catalogPageData?.data?.specifiedCategory?.course}/>
            </div>
            </div>
           
           {/*section 2*/}
           <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <p className="section_heading">Top courses in {catalogPageData?.data?.differentCategory?.name}</p>
                <div className='py-8'>
                    <Course_Slider courses={catalogPageData?.data?.differentCategory?.course}/>
                </div>
           </div>

           {/*section 3*/}

           <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                 <p className='section_heading'>Frequently Bought</p>
                 <div className='py-8'>
                    <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
                        {
                            catalogPageData?.data?.mostSellingCourses?.splice(0,4)
                            .map((data,index)=>(
                                 <div key={index}>
                                       <Course_Card courses={data} key={index} Height={"h-[400px]"}/>
                                 </div>
                            ))
                        }
                    </div>
                 </div>
           </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Catalog