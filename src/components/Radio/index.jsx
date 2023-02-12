import { useContext } from 'react'
import RadioContext from '@components/RadioContext'
import $ from './radio.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind($)

export default function Radio({ children, value, tab, name, title, onClick, radioRef, disabled }) {
  const group = useContext(RadioContext)

  return (
    <>
      <input
        className={$.input}
        type="radio"
        id={value}
        value={value}
        title={title}
        name={name}
        ref={radioRef}
        onClick={onClick}
        disabled={disabled || group.disabled}
        checked={group.value !== undefined ? value === group.value : undefined}
        onChange={(e) => group.onChange && group.onChange(e.target.value)}
      />
      <label className={cx('label', { tab })} htmlFor={value}>
        {children}
      </label>
    </>
  )
}
