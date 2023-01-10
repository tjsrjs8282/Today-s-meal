import React from 'react'
import $ from './flex.module.scss'
import cn from 'classnames'

export default function Flex({ kinds, children }) {
  const isKinds = kinds === 'culumn'
  return <div className={cn($.flex, { [$.culumn]: isKinds })}>{children}</div>
}
