import { useState } from 'react'
import {AiFillEyeInvisible,AiOutlineEye} from "react-icons/ai"
import {Link,useNavigate} from "react-router-dom"
import { useDispatch } from 'react-redux'
import { login } from '../../../services/operation/authApi'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { setLoading, setToken } from '../../../slices/authSlice'
import { endpoints } from '../../../services/api'
import {setUser} from "../../../slices/profileSlice"

const LogInForm = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  

    const [formData,setFormData]=useState({
        email:"",password:""
    })

    const[showPassword,setShowPassword]=useState(false);

    const changeHandler=(event)=>{
          setFormData((prevdata)=>(
            {
                ...prevdata,
                [event.target.name]:event.target.value,
            }

          ))  
    }
    const {email,password}=formData;
        
      async function log(){
      const toastID=toast.loading("loading.....")
   //   dispatch(setLoading(true));
      try{
        const data = await axios.post(endpoints.LOGIN_API ,formData);
         
        if(!data.data.success){
          throw new Error(data.message);
        }
        toast.success("Log In  SuccessFull");
        console.log("data from  Email",data);
        dispatch(setToken(data.data.token))
         const userImage = data.data?.user?.images
          ? data.data.user.images
         : `https://api.dicebear.com/5.x/initials/svg?seed=${data.data.user.firstName} ${data.data.user.lastName}`

   
         dispatch(setUser({...data.data.user, image: userImage}))
         localStorage.setItem("token", JSON.stringify(data.data.token))
         localStorage.setItem("user", JSON.stringify(data.data.user))
        navigate("/dashboard/my-profile");
      } catch(error){
        toast.error("Log In Failed")
        console.log(error);
      }
      toast.dismiss(toastID);
      dispatch(setLoading(false));
    }



    const submithandler=(event)=>{
      event.preventDefault();
      log();
      dispatch(login(email,password,navigate))
    }
  return (
    <form className='flex flex-col w-full gap-y-4 mt-6' onSubmit={submithandler} >
            
            
     
       <label className='w-full '> 
        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
         Email Address
          <sup className='text-[#EF476F]'> *</sup>
         </p>
         <br/>

        <input
            required
            value={email}
            placeholder='Enter Your Email'
            name="email"
            type="email"
            onChange={changeHandler}
            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] -mt-4 outline-none'
        />
       </label>
       
       <label className='w-full relative'>
        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'> Password
         <sup className='text-[#EF476F]'> *</sup> </p>
        <br></br>
        <input
            required
            value={password}
            placeholder='Enter Password'
            name="password"
            type={showPassword ? ("text") : ("password")}
            onChange={changeHandler}
            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] -mt-4 outline-none'

        
       />
         <span onClick={()=>setShowPassword((prev)=>!prev)} className='absolute left-[90%] right-1/3 top-[52%] bottom-1/3 cursor-pointer text-richblack-5'>
            {showPassword ? (<AiFillEyeInvisible/>) :(<AiOutlineEye/>) }
        </span>
       
        <Link to="/forgot-password">
                <p className='text-xs mt-1 text-blue-100 max-w-max ml-auto'>
                    Forgot Password
                </p>
            </Link>
       </label>
        
       <button 
        type='submit'
       className="bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6">
         Sign In
        </button>
    </form>
  )
}

export default LogInForm