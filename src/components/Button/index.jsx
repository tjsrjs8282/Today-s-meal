import React from 'react'
import $ from './button.module.scss'

const Button = ({ title }) => {
  return <button className={$.button}>{title}</button>
}

export default Button
