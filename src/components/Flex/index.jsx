import React, { memo } from 'react'
import $ from './flex.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind($)
const Flex = memo(({
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
}) => {
  console.log('Flex')
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
})

export default Flex
