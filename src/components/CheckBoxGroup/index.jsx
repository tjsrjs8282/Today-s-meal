import CheckBoxContext from '@components/CheckBoxContext'
import $ from './checkBoxGroup.module.scss'
export default function CheckBoxGroup({
  label,
  children,
  disabled: groupDisabled,
  values,
  onChange,
}) {
  const isDisabled = (disabled) => disabled || groupDisabled

  const isChecked = (value) => values.includes(value)

  const toggleValue = ({ checked, value }) => {
    if (checked) {
      onChange(values.concat(value))
    } else {
      onChange(values.filter((v) => v !== value))
    }
  }

  return (
    <fieldset className={$.fieldset}>
      <legend>{label}</legend>
      <CheckBoxContext.Provider value={{ isDisabled, isChecked, toggleValue }}>
        {children}
      </CheckBoxContext.Provider>
    </fieldset>
  )
}
