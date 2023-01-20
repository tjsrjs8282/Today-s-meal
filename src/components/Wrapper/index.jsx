import React from 'react'
import $ from './wrapper.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind($)

export default function Wrapper({ children, colorGray }) {
  return <div className={cx('wrapper', { colorGray })}>{children}</div>
}
