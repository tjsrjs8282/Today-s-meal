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
  onKeyPress,
  onClick,
}) {
  return (
    <div className="search_box">
      <IconButton kinds={'search'} />
      <Input {...{ type, name, value, placeholder, onChange, onKeyPress }} />
      <IconButton kinds={'closeCircle'} onClick={onClick} />
    </div>
  )
}
