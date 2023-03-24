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
  id,
}) {
  function tests() {
    let focusApp = document.getElementsByClassName('App')
    focusApp.classList.add('input_fous')
  }
  return (
    <div className={$.input_box}>
      <input
        onFocus={tests}
        onInput={(e) => {
          if (e.target.value.length > e.target.maxLength)
            e.target.value = e.target.value.slice(0, e.target.maxLength)
        }}
        ref={inputRef}
        {...{ type, name, title, value, maxLength, placeholder, onKeyPress, onChange, id }}
      />
      {unit && <p className={$.unit}>{unit}</p>}
    </div>
  )
}
