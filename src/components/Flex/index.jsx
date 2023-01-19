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
        nowrap: nowrap,
        start: start,
        white: white,
        gray: gray,
        radius: radius,
        shadow: shadow,
        padding: padding,
        marginRight: marginRight,
        marginBottom: marginBottom,
      })}
    >
      {children}
    </div>
  )
}
