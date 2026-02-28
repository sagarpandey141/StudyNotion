import { createSlice } from "@reduxjs/toolkit";



const initialState={
      SectionData:[],
      FullCourseData:[],
      CompletedVideo:[],
      subSectionData:[],
      TotalNoOfLecture:0,
}

const viewCourseSlice=createSlice({
    name:"ViewCourse",
    initialState:initialState,
    reducers:{
        setCourseSectionData(state,value){
              state.SectionData=value.payload;
        },
        setCourseSubSectionData(state,value){
                  state.subSectionData=value.payload;
        },
        setEntireCourseData(state,value){
           state.FullCourseData=value.payload
        },
        setCompletedVideo(state,value){
        
           state.CompletedVideo=value.payload
        },
        settotalNoOfLecture(state,value){
            state.TotalNoOfLecture=value.payload
        }
    }
})

export const {setCourseSectionData,setEntireCourseData,setCompletedVideo,setCourseSubSectionData,settotalNoOfLecture}=viewCourseSlice.actions;
export default viewCourseSlice.reducer;