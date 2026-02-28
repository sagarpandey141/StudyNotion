import { paymentss } from "../api";
import { apiConnector } from "../apiconnector";
import { toast } from "react-hot-toast";
import { resetCart } from "../../slices/cartSlice";
import rzpLogo from "../../assets/Logo/rzp_logo.png"

const RAZORPAY_KEY = "rzp_test_JYeH64tDpVQK8y"

function loadScripts(src){
     return new Promise((resolve)=>{
          const script=document.createElement("script");
         script.src=src;
          
         script.onload=()=>{
             resolve(true);
         }

         script.onerror=()=>{
              resolve(false);
         }
         document.body.appendChild(script);
     })
}

export async function buyCourse(token, courses, userDetails, navigate, dispatch){
      
     const toastID=toast.loading("Loading....")
     try{
           //script load
          const res=await loadScripts("https://checkout.razorpay.com/v1/checkout.js")
           //validation
           if(!res){
               toast.error("Razopay SDK failed to load")
               return ;
           }
           //intiate the order capture payment
           const orderResponse=await apiConnector("POST",paymentss.PAYMENT_CAPTURE_API,{courses},{
               Authorisation:`Bearer ${token}`
           })
           //validation
          
           if(!orderResponse.data.success){
               throw new Error(orderResponse.data.message);
           }
        
           //options
           const options={
               key:RAZORPAY_KEY,
               currency:orderResponse.data.message.currency,
               amount:orderResponse.data.message.amount,
               order_id:orderResponse.data.message.id,
               name:"StudyNotion",
               description:"Thankyou For purchasign the Course",
               image:rzpLogo,
               prefill:{
                    email:userDetails.email,
                    name:`${userDetails.firstName}`
               },
               handler:function(response){
                    //sent succesfull payment email
                    sendPaymentSuccessEmail(response,orderResponse.data.message.amount,token)
                    //verify payment
                    console.log("payment",{...response,courses})
                    verifyPayment({...response,courses},token,navigate,dispatch);
               }
           
             
           }
           const paymentObject=new window.Razorpay(options)
           paymentObject.open();
           paymentObject.on("payment.failed", function(response) {
               toast.error("oops, payment failed");
               console.log(response.error);
           })
     } catch(error){
          console.log(error.message);
          toast.error("Payment Failed");
     } 
     toast.dismiss(toastID);
}

const sendPaymentSuccessEmail=async(response,amount,token)=>{
     console.log("razorpay res",response)
             try{
              await apiConnector("POST",paymentss.PAYMENT_SUCCESSFULLY_EMAIL,{
                    orderId:response.razorpay_order_id,
                    paymentId:response.razorpay_payment_id,
                    amount,
               },{
                    Authorisation:`Bearer ${token}`
               })
               
             } catch(error){
               console.log("error in sending confirmation payment email",error.message)
             }
}

const verifyPayment=async(bodyData,token,navigate,dispatch)=>{
       const toastId=toast.loading("Loading....");
       try{
          const res=await apiConnector("POST",paymentss.VERIFY_PAYMENT_API,bodyData,{
               Authorisation:`Bearer ${token}`
          })
          console.log(" res verifyPayment",res)
          if(!res.data.success)
          {
               throw new Error(res.data.message)
          }
          toast.success("Payment Successfull,Your Are Enrolled To The Courses")
          navigate("/dashboard/enrolled-courses");
          dispatch(resetCart());
       } catch(error){
           console.log(error.message);
           toast.error("error in Verify Payment")
       }
       toast.dismiss(toastId);
}