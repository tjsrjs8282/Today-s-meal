import RadioContext from '@components/RadioContext'
import $ from './radioGroup.module.scss'

export default function RadioGroup({ label, children, ...rest }) {
  return (
    <fieldset className={$.fieldset}>
      <legend>{label}</legend>
      <RadioContext.Provider value={rest}>{children}</RadioContext.Provider>
    </fieldset>
  )
}
