import {toast} from "react-hot-toast"
import {apiConnector} from "../apiconnector"
import { endpoints } from "../api"
import {setLoading,setToken} from "../../../src/slices/authSlice"
import { setUser } from "../../slices/profileSlice"
import { useDispatch } from "react-redux"


const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSWORD_API,
  

} = endpoints



export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      })
      console.log("SENDOTP API RESPONSE............", response)

      console.log(response.data.success)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("OTP Sent Successfully")
      navigate("/verify-email")
    } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      toast.error("Could Not Send OTP")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      })

      console.log("SIGNUP API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Signup Successful")
      navigate("/login")
    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      toast.error("Signup Failed")
      navigate("/signup")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}


export function login(email,password,navigate){
  return async(dispatch)=>{
  const toastID=toast.loading("Loading.....");
   dispatch(setLoading(true));
   try{
      const response=await apiConnector("POST",endpoints.LOGIN_API,{
        email,password,
      })
       
      console.log("LOGIN API RESPONSE............", response)
       
      if(!response.data.success){
        throw new Error(response.data.message)
       }
       
      
       dispatch(setToken(response.data.token))
       toast.success("Log In SuccessFully");

       const userImage = response.data?.user?.images
       ? response.data.user.images
       : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
       console.log(userImage);
       dispatch(setUser({...response.data.user, images: userImage}))
       localStorage.setItem("token", JSON.stringify(response.data.token))
       localStorage.setItem("user", JSON.stringify(response.data.user))
       navigate("/");
   } catch(error){
    console.log("Login API ERROR............", error)
    toast.error("Login Failed")
 
   }
   dispatch(setLoading(false));
   toast.dismiss(toastID);
  }
}


export function logout(navigate){
    return (dispatch)=>{
         dispatch(setToken(null))
         dispatch(setUser(null))
         localStorage.removeItem("token")
         localStorage.removeItem("user")
         toast.success("Logged Out")
         navigate("/")
    }
}

export function getpasswordresetToken(email,setSentEmail){
   
     return async(dispatch)=>{
       const toastID=toast.loading("loading...")
        dispatch(setLoading(true))
        try{
            const response=await apiConnector("POST",endpoints.RESETPASSWORD_API,{
                 email,
            })
            console.log("reset password toen response.....",response)

            if(!response.data.success){
              throw new Error(response.data.success);

            }

            toast.success("Reset Email Sent")
            setSentEmail(true);
        } catch(error){
              console.log("Reset password token error ",error.message)
        }
        toast.dismiss(toastID)
        dispatch(setLoading(false));
     }

}

export async function checkJwtExpired(token) {

  try {
    const response = await apiConnector("POST", endpoints.checkJwtExpire_API, { token });

    console.log("response", response);

    if (!response.data.success) {
      return false;
    }

    return true;
  } catch (error) {
    console.log("error", error.message);
    return false;
  }
}


