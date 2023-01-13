import { useContext } from 'react'
import RadioContext from '@components/RadioContext'
import $ from './radio.module.scss'

export default function Radio({ children, value, name, defaultChecked, disabled }) {
  const group = useContext(RadioContext)

  return (
    <>
      <input
        className={$.input}
        type="radio"
        id={value}
        value={value}
        name={name}
        defaultChecked={defaultChecked}
        disabled={disabled || group.disabled}
        checked={group.value !== undefined ? value === group.value : undefined}
        onChange={(e) => group.onChange && group.onChange(e.target.value)}
      />
      <label className={$.label} htmlFor={value}>
        {children}
      </label>
    </>
  )
}
