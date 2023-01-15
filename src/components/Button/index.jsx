import React from 'react'
import $ from './button.module.scss'
import cn from 'classnames'

export default function Button({ content, link, check, onClick }) {
  const isInfoCheck = check

  return (
    <button
      className={cn($.button, { [$.no_check]: isInfoCheck })}
      onClick={() => {
        onClick()
      }}
    >
      {content}
    </button>
  )
}
