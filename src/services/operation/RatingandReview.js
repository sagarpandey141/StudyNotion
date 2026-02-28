import { toast } from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { ratingAndReview } from "../api"


export async function getAverageRating(courseId){
    const toastId=toast.loading("Loading....")
    let result=[]
    try{
        const  response=await apiConnector(
            "Get",
             ratingAndReview.Get_Average_Rating_API,
             courseId,
             
        )

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        console.log("Average Rating Fetched SuccessFully")
        result=response;
    } catch(error){
        console.log("GET_Average_Rating API ERROR............", error)
        
    }
    toast.dismiss(toastId);
    return result
}

export async function CreateRating(data,token){
    console.log("dara is",data)
      const toastId=toast.loading("Loading...")
      try{
            const response=await apiConnector("POST",ratingAndReview.CREATE_RATING,data,{
                Authorisation: `Bearer ${token}`,
            })
 
            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Rating Created SuccessFully");
      } catch(error){
          console.log("Create Rating Api Error",error.message)
         
      }
      toast.dismiss(toastId);
}

export async function FetchAllRatingandReviews(){
        let result=null;
        try{
            const response=await apiConnector("GET",ratingAndReview.FETCH_ALL_RATING_AND_REVIEW);

            if(!response.data.success){
                throw new Error(response.data.message)
            }
         result=response?.data?.data
        } catch(error){
            console.log("error",error.message);
        }
        return result;
}