import React from 'react'
import $ from './button.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind($)

export default function Button({ content, check, onClick }) {
  const isInfoCheck = check

  return (
    <button
      className={cx('button', { no_check: isInfoCheck })}
      onClick={() => {
        onClick()
      }}
    >
      {content}
    </button>
  )
}
