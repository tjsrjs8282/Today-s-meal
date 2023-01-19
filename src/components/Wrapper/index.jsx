import React from 'react'
import $ from './wrapper.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind($)

export default function Wrapper({ children, gray }) {
  return <div className={cx('wrapper', { gray: gray })}>{children}</div>
}
