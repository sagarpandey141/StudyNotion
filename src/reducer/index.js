import {combineReducers} from "@reduxjs/toolkit"
import authReducer from "../slices/authSlice"
import profileReducer from "../slices/profileSlice"
import cartReducer from "../slices/cartSlice"
import courseReducer from "../slices/courseSlice"
import ViewCourseReducer from "../slices/ViewCourse"
const rootReducer=combineReducers({
      auth:authReducer,
      profile:profileReducer,
      cart:cartReducer,
      course:courseReducer,
      ViewCourse:ViewCourseReducer

})

export default rootReducer