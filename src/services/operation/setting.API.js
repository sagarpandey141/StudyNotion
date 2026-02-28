import { toast } from "react-hot-toast"
import { course, settings } from "../api"
import { apiConnector } from "../apiconnector"
import { setUser } from "../../slices/profileSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import { logout } from "./authApi";


export async function UpdatePasswordCo(token,data){
 
    const toastID=toast.loading("Loading......")
    try{
        const response=await apiConnector("POST",settings.CHANGE_PASSWORD_API,data,{
          Authorisation: `Bearer ${token}`,
        })

            console.log("update password  response.....",response)

            if(!response.data.success){
              throw new Error(response.data.success);

            }

            toast.success("Password Updated SuccessFully");         
    } catch(error){
        console.log("CHANGE_PASSWORD_API API ERROR............", error)
        toast.error(" Password Dosen't Match")
    }
    toast.dismiss(toastID);
}

export  function setDisplayPicture(token,formData){
  return async(dispatch)=>{
       const toastId=toast.loading("Loading....")
       try{
             const response=await apiConnector(
               "PUT",
             settings.UPDATE_DISPLAY_PICTURE_API,
             formData,
               {
                 "Content-Type": "multipart/form-data",
                 Authorisation: `Bearer ${token}`,
               }
             )

             console.log(
               "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
               response
             )
       
             if (!response.data.success) {
               throw new Error(response.data.message)
             }
          
             toast.success("Profile Updated SuccessFully");
             localStorage.setItem("user", JSON.stringify(response.data.data))
             dispatch(setUser(response.data.data))
       } catch(error){
         console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
         toast.error("Could Not Update Display Picture")
       }
       toast.dismiss(toastId);
  }
}

export function updateProfile(data,token){

 return async(dispatch)=>{
       const toastID=toast.loading("Loading....")
       try{
           const response=await apiConnector("PUT",settings.UPDATE_PROFILE_API,data,{
             Authorisation: `Bearer ${token}`,
           })

           console.log(
             "UPDATE_PROFILE_API  RESPONSE............",
             response
           )

           if (!response.data.success) {
             throw new Error(response.data.message)
           }
            
           const userImage = response.data.userInfo.images
           ? response.data.userInfo.images
           : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.profile.firstName} ${response.data.updatedUserDetails.lastName}`
            toast.success("Profile Updated SuccessFully");
            localStorage.setItem("user", JSON.stringify({...response.data.userInfo,additionalDetail:response.data.profile,images:userImage}))
            dispatch(setUser({...response.data.userInfo, additionalDetail:response.data.profile, images:userImage}))
           
       } catch(error){
         console.log("UPDATE_PROFILE_API API ERROR............", error)
         toast.error("Could Not Update Profile")
       }
       toast.dismiss(toastID);
 }
}

export function deleteProfile(navigate,token){
     return async(dispatch)=>{
            const toastID=toast.loading("Loading.....")
            try{
                const response=await apiConnector("DELETE",settings.DELETE_PROFILE_API,{
                  Authorisation: `Bearer ${token}`,
                })

                console.log(
                  "DELETE_PROFILE_API  RESPONSE............",
                  response
                )
     
                if (!response.data.success) {
                  throw new Error(response.data.message)
                }

                toast.success("Profile Deleted SuccessFully")
               dispatch(logout(navigate))
            } catch(error){
              console.log("DELETE_PROFILE_API API ERROR............", error)
              toast.error("Could Not Delete Profile")
            }
     }
}

