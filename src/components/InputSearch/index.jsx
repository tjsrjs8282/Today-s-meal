import React from 'react'
import Input from '@components/Input'
import IconButton from '@components/IconButton'
import './inputSearch.scss'

export default function InputSearch({
  type,
  name,
  value,
  placeholder,
  onChange,
  inputRef,
  onKeyPress,
  onClick,
}) {
  return (
    <div className="search_box">
      <IconButton kinds={'search'} />
      <Input {...{ type, name, value, inputRef, placeholder, onKeyPress, onChange }} />
      {value && <IconButton kinds={'closeCircle'} onClick={onClick} />}
    </div>
  )
}
