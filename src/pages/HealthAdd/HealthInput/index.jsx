import React, { useEffect } from "react";
import $ from "./healthInput.module.scss"
import Title from "@components/Title"
import Input from "@components/Input"
import CountBox from "@components/CountBox"

export default function HealthInput ({
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

  if (isTime) {
    return (
      <div className={$.input_box}>
        <Title content={title} sub />
        <div className={$.time_box}>
          <input type="number" value={minute} name="minute" onChange={onChange}/>
          <span>:</span>
          <input type="number" value={second} name="second" onChange={onChange}/>
        </div>
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