import React, { useState, useCallback, useEffect } from "react";
import $ from "./healthInput.module.scss"
import Title from "@components/Title"
import Input from "@components/Input"
import CountBox from "@components/CountBox"

export default function HealthInput ({title, name, value, onChange, isCount, count, isTime, dispatch }) {
  // dispatch({type: CHANGE_COUNT, count: foodCount})
  
  if (isTime) {
    return (
      <div className={$.input_box}>
        <Title content={title} sub />
        <CountBox count={count}/>
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