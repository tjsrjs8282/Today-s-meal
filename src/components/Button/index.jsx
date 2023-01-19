import React from 'react'
import $ from './button.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind($)

export default function Button({ content, check, onClick, more }) {
  const isInfoCheck = check
  const isMoreButton = more

  return (
    <button
      className={cx('button', { no_check: isInfoCheck, more_button: isMoreButton })}
      onClick={() => {
        onClick()
      }}
    >
      {content}
    </button>
  )
}
