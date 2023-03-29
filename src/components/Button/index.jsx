import React from 'react'
import $ from './button.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind($)

export default function Button({
  content,
  className,
  check,
  onClick,
  none,
  border,
  nonefixed,
  noneBackground,
  marginTop,
  colorWhite,
  container,
}) {
  return (
    <>
      {container ? (
        <div className={$.fixed_box}>
          <button
            className={cx('button', {
              focused: className,
              check,
              none,
              border,
              nonefixed,
              noneBackground,
              marginTop,
              colorWhite,
            })}
            onClick={onClick}
          >
            {content}
          </button>
        </div>
      ) : (
        <button
          className={cx('button', {
            focused: className,
            check,
            none,
            border,
            nonefixed,
            noneBackground,
            marginTop,
            colorWhite,
          })}
          onClick={onClick}
        >
          {content}
        </button>
      )}
    </>
  )
}
