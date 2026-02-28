import { apiConnector } from "../apiconnector"
import { course } from "../api"
import { toast } from "react-hot-toast"
import axios from "axios"
import { categories } from "../api"


export async function  getAllCourses(){

    let result=[]
    try{
      console.log("first")
        const response=await axios.get(course.Course_Find_API);
         console.log("response is ",response);
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        result=response.data.data
    } catch(error){
        console.log("Fetched All Courses API ERROR............", error)
        toast.error("Could Not Get All Courses")
    }
  
    console.log("result is",result)
    return result;
}

 export async function fetchcourseCategories(){
    let result=[]
    try{
     const response= await apiConnector("GET",categories.CATEGORIES_API);
     console.log("printing Course Category Response",response);

     if(!response?.data?.success){
        throw new Error("Could Not Fetch Course Categories")
     }
    //   setsubLink(result.data.AllCategory);
      result=response?.data?.data

      } catch(error)
      {
        console.log("could not fetch Course Category list",error);
        toast.error(error.message);
      }
      return result;
  }

  export async function addCourseDetails(data,token){
    console.log("data",data)
         let result=null
         const toastId=toast.loading("Loading....")
         try{
             const response=await apiConnector("POST",course.ADD_COURSE_API,data,{
              "Content-Type": "multipart/form-data",
              Authorisation: `Bearer ${token}`,
             })

             if(!response?.data?.success){
              throw new Error("Could Not Add Course Details")
             }
             toast.success("Course Deatil Added SuccessFully");
             result=response?.data?.data
         } catch(error){
          console.log("CREATE COURSE API ERROR............", error)
          toast.error(error.message)
         }
         toast.dismiss(toastId);
         return result;
  }

  export async function editCourseDetails(data,token){
    console.log("api data",data)
       let result=null
        const toastId=toast.loading("Loading....")
        try{
            const response=await apiConnector("POST",course.EDIT_COURSE_API,data,{
          
            Authorisation: `Bearer ${token}`,
            })

            if(!response?.data?.success){
            throw new Error("Could Not Add Course Details")
            }

            toast.success("Course Detail Added SuccessFully");
            result=response?.data?.data
        } catch(error){
        console.log("Edit COURSE API ERROR............", error.message)
        toast.error(error.message)
        }
        toast.dismiss(toastId);
        return result;
  }

  export async function editFullCourseDetails(courseId,token){
      const toastId=toast.loading('Loading....');
      let result=null;
      try{
         const response=await apiConnector("POST",course.EDIT_COURSE_DETAIL_API,{courseId},{
            Authorisation: `Bearer ${token}`,
         })
        console.log("res",response)
          if (!response.data.success) {
            throw new Error(response.data.message)
          }
          result=response?.data?.data;
      } catch(error){
          console.log("error in Edit Course Detail Api",error.message);
          toast.error("Could Not Edit Course Please Try Again Later")
      }
      toast.dismiss(toastId);
      return result;
  }

  export async function deleteCourseHandler(courseId,token){
            const toastId=toast.loading('Loading....');
          let result=null
            try{
            const response=await apiConnector("POST",course.DELETE_COURSE_API,courseId,{
                Authorisation: `Bearer ${token}`,
            })
              console.log("res",response)
                if (!response.data.success) {
                throw new Error(response.data.message)
                }
                result=response?.data?.data
                toast.success("Course Deleted SuccessFully");
            } catch(error){
                console.log("error in Delete Course Detail Api",error.message);
                toast.error("Could Not Delete Course Please Try Again Later")
            }

            toast.dismiss(toastId);
            return result;
  }

  export async function fetchCourse(data){
        const toastId=toast.loading('Loading....');
          let result=null;
          
        try{
        const response=await apiConnector("POST",course.FIND_COURSE_API,data)
        console.log("res",response)
            if (!response.data.success) {
            throw new Error(response.data.message)
            }
            result=response?.data?.data
           
        } catch(error){
            console.log("error in Find Course Detail Api",error.message);
            toast.error("Something Went Wrong Please Try Again Later")
        }
        toast.dismiss(toastId);
        return result;
  }

  export async function fetchInstructorCourse(token){
   
         let result=null;
         try{
          const res=await apiConnector("GET",course.FETCH_INSTURCTOR_COURSE,null,{
          
                  Authorisation: `Bearer ${token}`,
            });
          console.log("instructor corse response",res);
          if(!res.data.success){
             throw new Error(res.data.message);

          }
          result=res?.data?.data;
         } catch(error){
          console.log("error in Fetch Instructor Course Detail Api",error.message);
          toast.error("Something Went Wrong Please Try Again Later")
         }
         return result;
  }

  export async function GetInstructorDshBoardData(token){
           let result=null;

           try{
                const res=await apiConnector("GET",course.GET_INSTRUCTOR_DSHBOARD_DATA,null,{
          
                  Authorisation: `Bearer ${token}`,
                  });
                   
                if(!res.data.success){
                  throw new Error(res.data.message);
                }
                result=res?.data?.data
           } catch(error){
            console.log("error in Fetch Instructor Dashboard Stats  Api",error.message);
            toast.error("Something Went Wrong Please Try Again Later")
           }
           return result;
  }

export async function MarkLectureCompletion(data,token){
          let result=null;
            const toastId=toast.loading("Loading....")
          try{
                 const res=await apiConnector("POST",course.LECTURE_COMPLETITON_API,data,{
                  Authorisation: `Bearer ${token}`,
                })

                console.log(
                  "MARK_LECTURE_AS_COMPLETE_API API RESPONSE............",
                  res
                )
            
                if (!res.data.success) {
                  throw new Error(res.data.error)
                }

                toast.success("Lecture Completed")
                result=true
          } catch(error){
            console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error.message)
            toast.error(error.message)
            result=false
          }
          toast.dismiss(toastId);
          return result;
  }