import  {toast}  from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { section } from "../api"
import { setCourse } from "../../slices/courseSlice"

export async function createSection(data,token){
       let result;
            const toastID=toast.loading("Loading....") 
            console.log("data",data)
            try{
                
                const response=await apiConnector("POST",section.ADD_SECTION_API,data,{
                Authorisation: `Bearer ${token}`,
                })
                
                
            console.log("create Section  response.....",response)

            if(!response.data.success){
                throw new Error(response.data.success);

            }
            result=response.data.updatecourse;
            toast.success("section added SuccessFully");
              
            } catch(error){
                console.log("ADD_SECTION_API API ERROR............", error)
                toast.error("Error in Creating Section")
            }
            toast.dismiss(toastID);
            return result;
    }



export async function updateSection(data,token){
        let result=null
        const toastId=toast.loading("Loading....")
        try{
            const response=await apiConnector("POST",section.UPDATE_SECTION_API,data,{
                Authorisation: `Bearer ${token}`,
            })
            console.log("create Section  response.....",response)

            if(!response.data.success){
                throw new Error(response.data.success);

            }
            toast.success('Section Updated SuccessFully')
            result=response?.data?.data
        } catch(error){
            console.log("UPDATE_SECTION_API API ERROR............", error)
            toast.error("Error in Updating Section")
        }
        toast.dismiss(toastId);
        return result;
}


export async function deleteSection(data,token){
    let result=null
        const toastID=toast.loading("Loading....")
        console.log("data",data);
        try{
            const response=await apiConnector("POST",section.DELETE_SECTION_API,data,{
                Authorisation: `Bearer ${token}`,
            })

            console.log("create Section  response.....",response)

            if(!response.data.success){
                throw new Error(response.data.success);

            }
            toast.success("Secton Deleted SuccessFully");
            result=response?.data?.data
        } catch(error){
            console.log("DELETE_SECTION_API API ERROR............", error)
            toast.error("Error in Deleting Section")
        }
        toast.dismiss(toastID);
        return result;
}
