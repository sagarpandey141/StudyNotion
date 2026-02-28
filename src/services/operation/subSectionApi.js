import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { SubSection } from "../api";

export  async function createsubSection(data,token){
   console.log("data",data);
    let result=null;
      const toastID=toast.loading("Loading...")
      try{
        const response=await apiConnector("POST",SubSection.CREATE_SUB_SECTION_API,data,{
            Authorisation: `Bearer ${token}`,
        })
          console.log(
            "CREATE_SUBSECTION_API  RESPONSE............",
            response
          )

          if (!response.data.success) {
            throw new Error(response.data.message)
          }
         
          result=response?.data?.data;
          toast.success("Sub Section Created SuccessFully")
      } catch(error){
        console.log("CREATE_SUB_SECTION_API API ERROR............", error)
        toast.error("Could Not Create Sub Section ")
      }
    toast.dismiss(toastID);
    return result;
}

export  async function handleUpdateSubSection(formData,token){
    let result=null;
    const toastID=toast.loading("Loading....");
    try{
        const response=await apiConnector("POST",SubSection.EDIT_SUB_SECTION_API,formData,{
            Authorisation: `Bearer ${token}`,
        })

        console.log(
            "Edit_SUBSECTION_API  RESPONSE............",
            response
          )

          if (!response.data.success) {
            throw new Error(response.data.message)
          }

          result=response?.data?.data;
          toast.success("Sub Section updated SuccessFully")
    } catch(error){
        console.log("Edit_SUB_SECTION_API API ERROR............", error)
        toast.error("Could Not Update Sub Section ")
    } 
    toast.dismiss(toastID);
    return result;

}

export async function deletesubSection(formdata,token){
  console.log("pohch gae")
    let result=null;
    const toastId=toast.loading("Loading...")

    try{
         const response=await apiConnector("POST",SubSection.DELETE_SUB_SECTION_API,formdata,{
          Authorisation: `Bearer ${token}`,
         })

         console.log(
          "DELETE_SUBSECTION_API  RESPONSE............",
          response
        )

        if (!response.data.success) {
          throw new Error(response.data.message)
        }
         
        result=response?.data?.data
        toast.success("Sub Section Deleted SuccessFully");
    } catch(error){
      console.log("DELETE_SUB_SECTION_API API ERROR............", error)
      toast.error("Could Not Delete Sub Section ")
    }
    toast.dismiss(toastId);
    return result;
}