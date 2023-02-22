import React from 'react'
import $ from './loding.module.scss'
import Flex from '@components/Flex'
export default function Loding() {
  return (
    <Flex fontWhite whdth padding>
      <div className={$.loader}>
        <div className={$.bg}></div>
        <h2>Loading...</h2>
      </div>
    </Flex>
  )
}
