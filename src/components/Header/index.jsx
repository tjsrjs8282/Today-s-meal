import React, { createRef, useRef } from 'react'
import $ from './header.module.scss'

export default function Header({ children }) {
  const headers = useRef()

  // console.log(headers.current.offsetHeight)

  return (
    <>
      <div className={$.header} ref={headers}>
        {children}
      </div>
      <div></div>
    </>
  )
}
