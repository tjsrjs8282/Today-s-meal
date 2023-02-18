import React, { useRef } from 'react'
import $ from './header.module.scss'

export default function Header({ children }) {
  const headerRef = useRef()
  const headerHeight = headerRef.current?.offsetHeight
  const style = {
    height: `${headerHeight}px`,
  }

  return (
    <>
      <div className={$.header} ref={headerRef}>
        {children}
      </div>
      <div style={style}></div>
    </>
  )
}
