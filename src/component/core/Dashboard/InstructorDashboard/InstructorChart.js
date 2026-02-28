import React, { useState } from "react";

const InstructorChart = ({ courses = [] }) => {
  const [currChart, setCurrChart] = useState("Student");

  const chartDataForStudents = {
    labels: courses.map((cour) => cour.courseName),
    values: courses.map((data) => data.totalStudent),
  };

  const chartDataForIncome = {
    labels: courses.map((cour) => cour.courseName),
    values: courses.map((data) => data.totalAmountGenerated),
  };

  const activeData =
    currChart === "Student" ? chartDataForStudents : chartDataForIncome;

  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
      <p className="text-lg font-bold text-richblack-5">Visualize</p>
      <div className="space-x-4 font-semibold">
        <button
          onClick={() => setCurrChart("Student")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "Student"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Student
        </button>

        <button
          onClick={() => setCurrChart("Income")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "Income"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Income
        </button>
      </div>

      <div className="mt-6 flex flex-col gap-3 text-sm text-richblack-25">
        {activeData.labels.length === 0 ? (
          <p>No course data available.</p>
        ) : (
          activeData.labels.map((label, index) => (
            <div
              key={label}
              className="flex items-center justify-between rounded-md bg-richblack-700 px-3 py-2"
            >
              <span className="mr-4 text-richblack-5">{label}</span>
              <span className="font-semibold text-yellow-50">
                {activeData.values[index]}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default InstructorChart;