import React from 'react'
import Wrapper from '@components/Wrapper'
import Flex from '@components/Flex'
import Title from '@components/Title'
import Header from '@components/Header'
import HaederTitle from '@components/HeaderTitle'
import IconButton from '@components/IconButton'

export default function HealthAdd() {
  return (
    <Wrapper colorGray>
      <Header >
        <Flex width between>
          <HaederTitle content="운동일지 추가" />
          <IconButton kinds={"close"}/>
        </Flex>
      </Header>
      <div>
        
      </div>
    </Wrapper>
  )
}