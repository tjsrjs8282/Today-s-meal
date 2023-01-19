import React, { useState } from 'react'
import $ from './input.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind($)
export default function Input({
  type,
  name,
  title,
  value,
  maxLength,
  placeholder,
  unit,
  inputRef,
  onChange,
}) {
  return (
    <div className={$.input_box}>
      <input
        ref={inputRef}
        {...{ type, name, title, value, maxLength, placeholder }}
        onChange={(e) => {
          onChange(e)
        }}
      />
      <p className={$.unit}>{unit}</p>
    </div>
  )
}
