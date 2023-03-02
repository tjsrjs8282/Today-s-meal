import $ from './checkBox.module.scss'
import classNames from 'classnames/bind'
import CheckBoxContext from '@components/CheckBoxContext'
import { useContext } from 'react'
const cx = classNames.bind($)

export default function CheckBox({ children, disabled, value, checked, onChange, tab }) {
  const context = useContext(CheckBoxContext)
  const { isDisabled, isChecked, toggleValue } = context
  return (
    <>
      <input
        className={$.input}
        type="checkbox"
        id={value}
        name={value}
        value={value}
        disabled={isDisabled(disabled)}
        checked={isChecked(value)}
        onChange={({ target: { checked } }) => toggleValue({ checked, value })}
      />
      <label className={cx('label', { tab })} htmlFor={value}>
        {children}
      </label>
    </>
  )
}
