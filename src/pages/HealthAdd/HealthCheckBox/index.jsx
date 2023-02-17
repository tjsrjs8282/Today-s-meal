import React, { useCallback, useState, useEffect } from "react";
import { CHANGE_TAB } from "../";
import $ from "./healthCheck.module.scss"
import Input from "@components/Input";
import classNames from 'classnames/bind'
const cx = classNames.bind($)

export default function HealthCheckBox ({healthInfo, dispatch, index, isCheck }) {
  const [check, setCheck] = useState("")
  const {value, title } = healthInfo

  useEffect(() => {
    if (isCheck) {
      setCheck("check")
      
    }
  }, [])

  const handleCheckBox = useCallback((e) => {
    const { checked, value } = e.target
    if (checked) {
      setCheck("check")
      dispatch({ type: CHANGE_TAB, index: index, checked: checked, })
    } else {
      setCheck("")
      dispatch({ type: CHANGE_TAB, index: index, checked: checked, })
    }
    console.log(checked, value)
  }, [])


  return (
    <label className={cx('check_box', { check })} index={index}>
      <span className="blind">
        <Input type="checkbox" value={value} title={title} onChange={handleCheckBox} />
      </span>
      {title}
    </label>  
  )
}