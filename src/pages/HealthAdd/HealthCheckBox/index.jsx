import React, { useCallback, useState, useEffect } from "react";
import { OPEN_TAB } from "../";
import $ from "./healthCheck.module.scss"
import Input from "@components/Input";
import classNames from 'classnames/bind'
const cx = classNames.bind($)

export default function HealthCheckBox ({healthInfo, dispatch, index, isCheck }) {
  const [check, setCheck] = useState("")
  const {value, title, checked } = healthInfo

  useEffect(() => {
    if (isCheck) {
      setCheck("check")
    }
  }, [])

  const handleCheckBox = useCallback((e) => {
    const { checked, value } = e.target
    if (checked) {
      setCheck("check")
      dispatch({ type: OPEN_TAB, index: index, checked: checked, })
    } else {
      setCheck("")
    }
    console.log(checked, value)
  }, [])


  return (
    <label className={cx('check_box', { check })} index={index}>
      <span className="blind">
        <Input type="checkbox" value={value} title={title} onChange={handleCheckBox} checked={checked} />
      </span>
      {title}
    </label>  
  )
}