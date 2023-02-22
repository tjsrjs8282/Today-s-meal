import React, { useRef, useEffect, memo } from "react";
import $ from "./healthInput.module.scss"
import Title from "@components/Title"
import Input from "@components/Input"
import CountBox from "@components/CountBox"

function HealthInput ({
  title,
  name,
  value,
  onChange,
  isCount,
  isTime,
  dispatch,
  minute,
  second
}) {
  const handelFormSubmit = (e) => {
    e.preventDefault()
  }
  
  if (isTime) {
    return (
      <div className={$.input_box}>
        <Title content={title} sub />
        <form className={$.time_box} onSubmit={handelFormSubmit}>
          <input type="number" value={minute} name="minute" onChange={onChange} />
          <span className={$.colon}>:</span>
          <input type="number" value={second} name="second" onChange={onChange} />
        </form>
      </div> 
    )
  }

  if (isCount) {
    return (
      <div className={$.input_box}>
        <Title content={title} sub />
        <CountBox />
      </div> 
    )
  }

  return (
    <div className={$.input_box}>
      <Title content={title} sub />
      <Input
        type="number"
        placeholder="0"
        name={name}
        title={title}
        value={value}
        onChange={onChange}
        unit={"kg"}
      />
    </div> 
  )
}
export default memo(HealthInput)