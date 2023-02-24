import React from "react";
import $ from "./healthInput.module.scss"
import Title from "@components/Title"
import Input from "@components/Input"
import CountBox from "@components/CountBox"

export default function HealthInput ({title, name, value, minute, second, onChange, isCount, isTime, handleSetNumber }) {
  if (isTime) {
    return (
      <div className={$.input_box}>
        <Title content={title} sub />
        <div className={$.time_box}>
          <input type="number" name="minute" value={minute} onChange={onChange}/>
          <span>:</span>
          <input type="number" name="second" value={second} onChange={onChange}/>
        </div>
      </div> 
    )
  }

  if (isCount) {
    return (
      <div className={$.input_box}>
        <Title content={title} sub />
        <CountBox
          value={value}
          name={name}
          handleSetNumber={handleSetNumber}
          onChange={onChange}
          marginBottomNone
          smallFont
        />
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