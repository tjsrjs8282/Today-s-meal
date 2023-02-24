import React, { useCallback, useState, useEffect } from "react";
import $ from "./healthCheck.module.scss"
import Input from "@components/Input";
import classNames from 'classnames/bind'
const cx = classNames.bind($)

const idValue = ["count", "weight", "set", "time"]

export default function HealthCheckBox ({healthInfo, index, checkItemHandler }) {
  const {value, title } = healthInfo
  const [checked, setChecked] = useState(false);  
  const checkHandled = ({target}) => {
    console.log(target.id)
    console.log('checkHandled')
    setChecked(!checked);
    checkItemHandler(target.id, target.checked);
  }

  return (
    <label className={cx('check_box', { checked })} index={index}>
      <span className="blind">
        <Input type="checkbox" id={idValue[index]} value={value} title={title} onChange={(e) => checkHandled(e)} />
      </span>
      {title}
    </label>  
  )
}