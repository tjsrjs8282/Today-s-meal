import React from 'react'
import $ from './button.module.scss'
import { Link } from 'react-router-dom'

export default function Button({ content, link }) {
  return (
    <Link to={link} className={$.button}>
      {content}
    </Link>
  )
}
