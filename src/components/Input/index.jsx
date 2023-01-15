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
  handleInputChange,
}) {
  return (
    <div className={$.input_box}>
      <input
        type={type}
        name={name}
        title={title}
        value={value}
        ref={inputRef}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={(e) => {
          handleInputChange(e)
        }}
      />
      <p className={$.unit}>{unit}</p>
    </div>
  )
}
