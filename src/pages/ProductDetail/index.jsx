import React from 'react';
import $ from './productDetail.module.scss'
import Wrapper from '@components/Wrapper'
import Flex from '@components/Flex'
import Header from '@components/Header'
import IconButton from '@components/IconButton'
import Button from '@components/Button'

export default function ProductDetail() {
  return (
    <Wrapper colorWhite>
      <Header>
        <Flex width between>
          <IconButton kinds="back" />
          <IconButton kinds="cart" />
        </Flex>
      </Header>
      <div className={$.detailImage}></div>
      <Flex width fixed>
        <Flex marginRight width>
          <Button content="장바구니" nonefixed noneBackground />
        </Flex>
        <Flex marginRigth width>
          <Button content="구매하기" nonefixed ></Button>
        </Flex>
      </Flex>
    </Wrapper>
  )
}