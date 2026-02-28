import React, { useState } from 'react'

import {Chart, registerables} from "chart.js"
import {Pie} from "react-chartjs-2"

Chart.register(...registerables);

const InstructorChart = ({courses}) => {

    const[currChart,setcurrChart]=useState("Student");

    //functio to generate randome color
    const getRandomecolor=(numColor)=>{
         const color=[]
         for(let i=0;i<numColor;i++){
              const color=`rgb(${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}),
              ${Math.floor(Math.random()*256)}`
         }
         return color;
    }
  console.log("cours",courses)
    const chartDataForStudents={
        labels:courses?.map((cour)=>cour.courseName),
        datasets:[
             {
                data:courses.map((data)=>data.totalStudent),
                backgroundColor:getRandomecolor(courses.length)
             }
        ]
    }

    console.log("student data",chartDataForStudents);

    const chartDataForIncome={
        labels:courses?.map((cour)=>cour?.courseName),
        datasets:[
             {
                data:courses.map((data)=>data.totalAmountGenerated),
                backgroundColor:getRandomecolor(courses.length)
             }
        ]
    }

    const options={
        maintainAspectRatio: false,
    }
  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
      <p className="text-lg font-bold text-richblack-5">Visualize</p>
      <div className="space-x-4 font-semibold">

         <button onClick={()=> setcurrChart("Student")}
           className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "Student"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}>
            Student
         </button>

         <button onClick={()=>setcurrChart("Income")}
           className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "Income"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}>
            Income
         </button>

         </div>
      <div className="relative mx-auto aspect-square h-full w-full">
          <Pie
            data={currChart==="Student" ? chartDataForStudents : chartDataForIncome}
            options={options}
          />
      </div>
    </div>
  )
}

export default InstructorChart