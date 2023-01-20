import React from 'react'
import $ from './button.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind($)

export default function Button({ content, className, check, onClick, none, border }) {
  return (
    <button className={cx('button', { focused: className, check, none, border })} onClick={onClick}>
      {content}
    </button>
  )
}
