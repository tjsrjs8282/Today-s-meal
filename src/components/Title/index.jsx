import React, { Children } from 'react'
import $ from './title.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind($)
export default function Title({ content, kinds, children }) {
  const isKinds = kinds === 'sub'
  return (
    <div className={cx('title', { sub: isKinds })}>
      {content}
      {children}
    </div>
  )
}
