import React from 'react'
import $ from './wrapper.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind($)

export default function Wrapper({ children, colorGray, colorWhite, thisRef, none }) {
  return (
    <div ref={thisRef} className={cx('wrapper', { colorGray, colorWhite, none })}>
      {children}
    </div>
  )
}
