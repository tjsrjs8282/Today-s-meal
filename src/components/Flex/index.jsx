import React from 'react'
import $ from './flex.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind($)
export default function Flex({
  column,
  between,
  around,
  nowrap,
  start,
  white,
  gray,
  radius,
  width,
  shadow,
  padding,
  marginRight,
  marginBottom,
  children,
}) {
  return (
    <div
      className={cx('flex', {
        column,
        width,
        between,
        around,
        nowrap,
        start,
        white,
        gray,
        radius,
        shadow,
        padding,
        marginRight,
        marginBottom,
      })}
    >
      {children}
    </div>
  )
}
