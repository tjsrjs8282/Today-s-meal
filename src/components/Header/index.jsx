import React, { useEffect, useRef, useState } from 'react'
import $ from './header.module.scss'

export default function Header({ children }) {
  const [headerHeight, setHeaderHeight] = useState()
  const headerRef = useRef()

  useEffect(() => {
    setHeaderHeight(headerRef.current?.offsetHeight)
  }, [])

  return (
    <>
      <div className={$.header} ref={headerRef}>
        {children}
      </div>
      <div style={{ height: `${headerHeight}px` }}></div>
    </>
  )
}
