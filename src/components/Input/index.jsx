import React, { useState } from 'react'
import $ from './input.module.scss'

export default function Input({ name, value, placeholder, unit }) {
  const [inputValue, setInputValue] = useState('')
  return (
    <div className={$.input_box}>
      <input
        type="text"
        name={name}
        value={inputValue}
        placeholder={placeholder}
        onChange={(e) => {
          setInputValue(e.target.value)
        }}
      />
      <p className={$.unit}>{unit}</p>
    </div>
  )
}
