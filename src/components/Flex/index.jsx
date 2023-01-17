import React from 'react'
import $ from './flex.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind($)
export default function Flex({ kinds, children }) {
  const isKinds = kinds === 'culumn'
  return <div className={cx('flex', { culumn: isKinds })}>{children}</div>
}
