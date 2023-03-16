import React, { Children } from 'react'
import $ from './title.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind($)
export default function Title({
  content,
  sub,
  right,
  left,
  margitTopNone,
  margitBottomNone,
  subContent,
  children,
}) {
  return (
    <div className={cx('title', { sub, right, left, margitTopNone, margitBottomNone })}>
      <h2>{content}</h2>
      {subContent && <p>{subContent}</p>}
      {children}
    </div>
  )
}
