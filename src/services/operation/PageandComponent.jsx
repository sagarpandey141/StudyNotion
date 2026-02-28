import { toast } from "react-hot-toast"
import { Category } from "../api"
import { apiConnector } from "../apiconnector"

export const getCatalogPageData=async(categoryid)=>{
  
    const toastId=toast.loading("Loading....")
    let result=[]
            try{
            

            const response = await apiConnector(
                "POST",
                Category.GET_CATALOG_PAGE,
                {categoryid:categoryid}
               
                )
                console.log("frontend response",response);

                if(!response?.data?.success){
                    throw new Error(response.data.message);
                }
                
                result=response?.data;
                
            }
            catch(error){
            console.log("GET_CATALOG_PAGE_API API ERROR............", error.message)
            toast.error("Could Not Get Catalog data")
            }
            toast.dismiss(toastId);
            return result;
}