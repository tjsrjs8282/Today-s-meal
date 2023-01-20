import React from 'react'
import $ from './button.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind($)

export default function Button({ content, check, onClick, more }) {
  return (
    <button
      className={cx('button', { check, more })}
      onClick={() => {
        onClick()
      }}
    >
      {content}
    </button>
  )
}
