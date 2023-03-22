import React from 'react'
import $ from './inputTime.module.scss'

export default function InputTime({
  type,
  title,
  name,
  value,
  minute,
  second,
  onChange,
  maxlength,
  placeholder,
  onKeyPress,
}) {
  return (
    <div className={$.time_box}>
      <input
        name={'healthMinute'}
        value={minute}
        {...{ type, title, maxlength, placeholder, onKeyPress, onChange }}
      />
      <span>:</span>
      <input
        name={'healthSecond'}
        value={second}
        {...{ type, title, maxlength, placeholder, onKeyPress, onChange }}
      />
    </div>
  )
}
