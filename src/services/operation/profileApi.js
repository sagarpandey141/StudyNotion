import { toast } from "react-hot-toast"
import { profileEndpoints, settings } from "../api";
import { apiConnector } from "../apiconnector";


export async function getAllEnrolledCourses(token){
     const toastId=toast.loading("Loading....")
     let result=[]
     try{
     

        const response = await apiConnector(
            "GET",
           profileEndpoints.GET_USER_ENROLLED_COURSES_API,
            null,
            {
              Authorisation: `Bearer ${token}`,
            }
          )
          

            if(!response.data.success){
                throw new Error(response.data.message);
            }
           
            result=response.data.data;
     }
     catch(error){
        console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
        toast.error("Could Not Get Enrolled Courses")
     }
     toast.dismiss(toastId);
     return result;
}



export async function deleteProfile(token){
     const toastId=toast.loading("Loading");
     try{

         //make a call to backend
           const response=await apiConnector("DELETE",settings.DELETE_PROFILE_API,{       
              Authorisation: `Bearer ${token}`,
           })
        
           toast.success("Account Deleted")
     } catch(error){
        toast.error("Some Error Occured Please Try Again In A Minute");
        console.log("error",error);
     }
     toast.dismiss(toastId);
}