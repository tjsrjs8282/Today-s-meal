import React from 'react'
import $ from './header.module.scss'

export default function Header({ children }) {
  return <div className={$.header}>{children}</div>
}
