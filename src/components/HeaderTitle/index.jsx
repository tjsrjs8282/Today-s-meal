import React, { memo } from 'react'
import Flex from '@components/Flex'

const HeaderTitle = memo(({ content }) => {
  return (
    <Flex column marginLeft start>
      <h2>{content}</h2>
      <p>12월 28일 수요일</p>
      {/* 실시간 날짜 기능 넣기 */}
    </Flex>
  )
})

export default HeaderTitle