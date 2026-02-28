import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BTN from '../../HomePage/BTN'
import { buyCourse } from '../../../../services/operation/studentFeaturepi'
import { useNavigate, useParams } from 'react-router-dom'

const RenderTotalItems = () => {
    const {total,cart}=useSelector((state)=>state.cart)
    const{token}=useSelector((state)=>state.auth)
   
    const{user}=useSelector((state)=>state.profile)
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const handleBuyCourse=()=>{
       const course=cart.map((course)=>course._id);
       buyCourse(token,course,user,navigate,dispatch)
    }
  return (
    <div>
    
          <div>
          <p>Total : {`₹${total}`}</p>
          
          </div>

          <div>
            <button onClick={handleBuyCourse}>
                <BTN active={true} onClick="hover:pointer">Buy Now</BTN>
            </button>
          </div>
    </div>
  )
}

export default RenderTotalItems