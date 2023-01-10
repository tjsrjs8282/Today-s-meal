import React from 'react'
import $ from './input.module.scss'

export default function Input({ name, value, placeholder, unit }) {
  return (
    <div className={$.input_box}>
      <input type="text" name={name} value={value} placeholder={placeholder} />
      <p className={$.unit}>{unit}</p>
    </div>
  )
}
