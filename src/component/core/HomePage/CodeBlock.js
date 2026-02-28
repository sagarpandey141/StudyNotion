import React from 'react'
import { BsArrowRightShort} from "react-icons/bs"
import BTN from './BTN'
import {TypeAnimation} from "react-type-animation"

const CodeBlock = ({
  position,
  heading,
  subHeading,
  ctabtn1,
  ctabtn2,
  codeblock,
  blockcolor,
}) => {
  return (
    <div className={`  flex ${position} my-20 justify-between gap-10`}>
      {/* Section 1 */}
      <div className="w-[50%] flex flex-col gap-8">
        {heading}
        <div className="text-richblack-300 font-bold mt-[-8px]">
          {subHeading}
        </div>
        <div className="flex gap-7 mt-7">
          <BTN active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className="flex items-center">
              {ctabtn1.btntext}
              <BsArrowRightShort />
            </div>
          </BTN>

          <BTN active={ctabtn2.active} linkto={ctabtn2.linkto}>
            <div>{ctabtn2.btntext}</div>
          </BTN>
        </div>
      </div>

      {/* Section 2 */}
      <div className="relative h-fit flex flex-row text-[14px] w-full py-7 lg:w-[500px] bg-gradient-blue shadow-2xl rounded-xl">
        {/* Gradient Blurred Circle Background */}
        <div className="absolute -top-10 -left-2 w-[350px] h-[220px] rounded-full 
          bg-[linear-gradient(123.77deg,#8A2BE2_-6.46%,#FFA500_59.04%,#F8F8FF_124.53%)] 
          blur-[68px] opacity-40 z-0">
        </div>

        {/* Line Numbers */}
        <div className="relative  text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold z-10">
          {[...Array(11).keys()].map((i) => (
            <p key={i}>{i + 1}</p>
          ))}
        </div>

        {/* Code Section */}
        <div
          className={`relative w-[90%] flex flex-col gap-2 font-bold font-mono text-white pr-2 z-10  `}
        >
          <pre className="whitespace-pre-line">
            <code>
              <span className="text-yellow-300">&lt;!DOCTYPE html&gt;</span>
              {"\n<html>\n<head><>Example</ \n title>"}
              <span className="text-pink-300">
                &lt;link <span className="text-pink-200">rel</span>="stylesheet" href="styles.css"&gt;
              </span>
              {"\n</head>\n<body>\n"}
              <h1 className="text-white">
                {"<h1><a href=\"/\">Header</a>\n</h1>"}
              </h1>
              {"<nav>"}
              <a className="text-pink-300">&lt;a href="one/"&gt;One&lt;/a&gt;</a>
              <a className="text-pink-300"> {"  <a href=\"two/\">Two< \n/a>"}</a>
              <a className="text-pink-300">&lt;a href="three/"&gt;Three&lt;/a&gt;</a>
              {"\n</nav>"}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};


export default CodeBlock