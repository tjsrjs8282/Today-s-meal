import React, { useState } from 'react'
import $ from './input.module.scss'

export default function Input({
  type,
  name,
  title,
  value,
  maxLength,
  placeholder,
  unit,
  inputRef,
  onKeyPress,
  onChange,
}) {
  return (
    <div className={$.input_box}>
      <input
        ref={inputRef}
        {...{ type, name, title, value, maxLength, placeholder, onKeyPress, onChange }}
      />
      <p className={$.unit}>{unit}</p>
    </div>
  )
}
