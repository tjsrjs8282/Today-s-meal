import React, { Children } from 'react'
import $ from './title.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind($)
export default function Title({ content, sub, children }) {
  return (
    <div className={cx('title', { sub })}>
      {content}
      {children}
    </div>
  )
}
