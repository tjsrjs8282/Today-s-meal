import React from 'react'
import $ from './flex.module.scss'
import classNames from 'classnames/bind'
import { useLocation } from 'react-router-dom'

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
  image,
  shadow,
  padding,
  fontWhite,
  fontBlack,
  colorWhite,
  colorSub,
  colorMain,
  fontMain,
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
  path,
  order1,
  order2,
}) {
  const loacation = useLocation()
  const this_pathName = loacation.pathname
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
        fontBlack,
        colorSub,
        colorMain,
        fontMain,
        marginTop,
        marginLeft,
        marginRight,
        marginBottom,
        paddingBottom,
        borderBottom,
        col4,
        col3,
        col2,
        active: this_pathName === path,
        path,
        order1,
        order2,
      })}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
