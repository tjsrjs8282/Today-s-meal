import React from 'react'
import $ from './wrapper.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind($)
export default function Wrapper({ children, kinds }) {
  const isKinds = kinds === 'minimal'
  return <div className={cx('wrapper',{ minimal: isKinds })}>{children}</div>
}
