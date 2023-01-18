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
  kinds,
}) {
  const isKinds = kinds === 'search'
  return (
    <div className={$.input_box}>
      {kinds && <span>{kinds}</span>}
      <input
        type={type}
        name={name}
        title={title}
        value={value}
        ref={inputRef}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={(e) => {
          onChange(e)
        }}
      />
      <p className={$.unit}>{unit}</p>
    </div>
  )
}
