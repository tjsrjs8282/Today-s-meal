import React from 'react'
import $ from './title.module.scss'
import cn from 'classnames'
export default function Title({ content, kinds }) {
  const isKinds = kinds === 'sub'
  return <div className={cn($.title, { [$.sub]: isKinds })}>{content}</div>
}
