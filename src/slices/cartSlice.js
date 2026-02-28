import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState={
    cart:localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem('cart')) :
    [],
   totalItems:localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")): 0,
   total:localStorage.getItem("total") ?
   JSON.parse(localStorage.getItem("total")) :
   0,
}

const cartSlice=createSlice({
   name:"cart",
   initialState:initialState,
   reducers:{
       settotalItems(state,value){
           state.totalItems=value.payload;
       },
       //add to cart
       addToCart:(state,action)=>{
         const course=action.payload
         const index=state.cart.findIndex((item)=>item._id===course._id)

         if(index>=0){
            toast.error("Course already in Cart")
            return
         }

         state.cart.push(course);
         state.totalItems++;
         const total=parseInt(course.price);
         state.total+=total

         localStorage.setItem("cart", JSON.stringify(state.cart))
         localStorage.setItem("total", JSON.stringify(state.total))
         localStorage.setItem("totalItems", JSON.stringify(state.totalItems))

         toast.success("Course Added To Cart");
       },
       //remove the cart
       removeFromCart:(state,action)=>{
           const courseId=action.payload
           const index=state.cart.findIndex((item)=>item._id===courseId)

           if(index>=0){
              state.totalItems--;
              state.total-=state.cart[index].price
            
              state.cart.splice(index,1);

              localStorage.setItem("cart", JSON.stringify(state.cart))
              localStorage.setItem("total", JSON.stringify(state.total))
              localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
                toast.success("Course Removed From Cart")
           }
       },
       //resetcart
       resetCart:(state,action)=>{
           state.cart=[]
           state.total=0;
           state.totalItems=0;

           localStorage.removeItem("cart")
           localStorage.removeItem("total")
           localStorage.removeItem("totalItems")
       }
   },
})

export const {settotalItems,addToCart,resetCart,removeFromCart}=cartSlice.actions;
export default cartSlice.reducer;
