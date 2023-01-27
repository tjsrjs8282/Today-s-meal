import React from 'react'
import $ from './flex.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind($)
export default function Flex ({
  column,
  between,
  around,
  wrap,
  start,
  white,
  colorGray,
  radius,
  width,
  image,
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
  col4,
  col3,
  col2,
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
        image,
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
        col4,
        col3,
        col2,
      })}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
