import React from 'react'
import $ from './wrapper.module.scss'
import styled from 'styled-components'
import cn from 'classnames'

const Wrapper = ({ children, theme }) => {
  const isColumn = theme === 'column'
  return <div className={cn($.wrapper, { [$.column]: isColumn })}>{children}</div>
}

export default Wrapper
