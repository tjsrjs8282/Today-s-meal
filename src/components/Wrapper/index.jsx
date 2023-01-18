import React from 'react'
import $ from './wrapper.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind($)
export default function Wrapper({ color, children }) {
  return <div className={cx('wrapper', color)}>{children}</div>
}
