import React from 'react'
import $ from './flex.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind($)
export default function Flex({
  column,
  between,
  around,
  wrap,
  start,
  white,
  colorGray,
  radius,
  width,
  shadow,
  padding,
  fontWhite,
  colorWhite,
  colorMain,
  marginTop,
  marginLeft,
  marginRight,
  marginBottom,
  paddingBottom,
  borderBottom,
  children,
  onClick,
}) {
  return (
    <div
      className={cx('flex', {
        column,
        width,
        between,
        around,
        wrap,
        start,
        white,
        colorGray,
        radius,
        shadow,
        padding,
        fontWhite,
        colorWhite,
        colorMain,
        marginTop,
        marginLeft,
        marginRight,
        marginBottom,
        paddingBottom,
        borderBottom,
      })}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
