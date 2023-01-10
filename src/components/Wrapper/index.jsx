import React from 'react'
import $ from './wrapper.module.scss'

export default function Wrapper({ children }) {
  return <div className={$.wrapper}>{children}</div>
}
