import React from 'react'
import $ from './wrapper.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind($)

export default function Wrapper({ children, colorGray, colorWhite, thisRef }) {
  return (
    <div ref={thisRef} className={cx('wrapper', { colorGray, colorWhite })}>
      {children}
    </div>
  )
}
