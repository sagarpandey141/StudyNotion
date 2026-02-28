import React from "react";
import "./App.css";
import {Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import Login from "../src/pages/Login";
import Signup from "../src/pages/Signup";
import Navbar from "../src/component/common/Navbar";
import OpenRoute from "./component/core/Auth/openRoute";
import Forgotpassword from "./pages/Forgotpassword";
import UpdatePassword from "../src/pages/UpdatePassword"
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./component/core/Dashboard/MyProfile";
import PrivateRoute from "./component/core/Auth/PrivateRoute";
import Settings from "./component/core/Dashboard/settings/index";
import EnrolledCourse from "./component/core/Dashboard/EnrolledCourse";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./utils/constant";
import Cart from "./component/core/Dashboard/Cart";
import Contact from "./pages/Contact";
import MyCourse from "./component/core/Dashboard/MyCourse";
import RenderSteps from "./component/core/Dashboard/addCourse/RenderSteps";
import AddCourse from "./component/core/Dashboard/addCourse";
import Catalog from "./pages/Catalog";
import EditCourse from "./component/core/Dashboard/EditCourse";
import CourseDetail from "./pages/CourseDetail";
import ViewCourse from "./pages/ViewCourse";

import VideoDetail from "./component/core/ViewCourse/VideoDetail";
import InstructorDshboard from "./component/core/Dashboard/InstructorDashboard/InstructorDshboard";
function App() {
  const {user}=useSelector((state)=>state.profile)
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter  ">
       
           <Navbar/>
       <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="catalog/:catalogName" element={<Catalog/>} />
      <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
    <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <Forgotpassword/>
            </OpenRoute>
          }
        />


          <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword/>
            </OpenRoute>
          }
        />

       <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail/>
            </OpenRoute>
          }
        />

         <Route
          path="/about"
          element={
            
              <About/>
          
          }
          />
         
         <Route path="/contact" element={ <Contact/>  } />
         <Route path="catalog/:catalogName/courses/:courseId" element={<CourseDetail/>}/>
         <Route
          element={
         <PrivateRoute>
               <Dashboard/>
         </PrivateRoute>
          }
          >
            
                <Route path="dashboard/my-profile" element={<MyProfile/>}/>
                <Route path="dashboard/settings" element={<Settings/>}></Route>
                <Route path="dashboard/instructor" element={<InstructorDshboard/>}></Route>
                {
                       user?.accountType===ACCOUNT_TYPE.STUDENT  && (
                        <>
                        <Route path="dashboard/enrolled-courses" element={<EnrolledCourse/>}/>
                        <Route path="dashboard/cart" element={<Cart/>}></Route>
                        </>
                       )
                }
                {
                  
                  user?.accountType===ACCOUNT_TYPE.INSTRUCTOR && (
                        <>
                          <Route path="dashboard/my-courses" element={<MyCourse/>}></Route>
                          <Route path="dashboard/add-course" 
                        
                          element={
                             <div className="relative inset-0">
                                 <AddCourse/>
                          </div>
                          }
                          ></Route>
                          <Route path="dashboard/edit-course/:courseId" element={<EditCourse/>} />
                        </>
                       )
                }
          </Route> 
       
         <Route
         element={
           <ViewCourse/>
         }>
           <Route path="/view-course/:courseId/section/:sectionId/sub-section/:subSectionId" element={<VideoDetail/>}></Route>
         </Route>
            
       

        

    </Routes>

    
    </div>
  );
}

export default App;
