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
  maxLength,
  placeholder,
  onKeyPress,
}) {
  return (
    <div className={$.time_box}>
      <input
        name={'healthMinute'}
        value={minute}
        {...{ type, title, maxLength, placeholder, onKeyPress, onChange }}
      />
      <span>:</span>
      <input
        name={'healthSecond'}
        value={second}
        {...{ type, title, maxLength, placeholder, onKeyPress, onChange }}
      />
    </div>
  )
}
