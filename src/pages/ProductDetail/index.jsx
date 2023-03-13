import React from 'react';
import $ from './productDetail.module.scss'
import Wrapper from '@components/Wrapper'
import Flex from '@components/Flex'
import Header from '@components/Header'
import IconButton from '@components/IconButton'
import Button from '@components/Button'
import Title from '@components/Title'
import sample from '@assets/sample.jpg'

export default function ProductDetail() {
  return (
    <div className={$.content}>
      <Header>
        <Flex width between>
          <IconButton kinds="back" />
          <IconButton kinds="cart" />
        </Flex>
      </Header>
      <div className={$.product_image}>
        <img src={sample} alt="샘플" />
      </div>
      <Wrapper none>
        <div className={$.title}>
          <h2>상품명</h2>
          <p className={$.price}>21,000원</p>
        </div>
        <ul className={$.benefit}>
          <li>
            <Flex width between>
              <p className={$.list_title}>적립포인트</p>
              <p>210P</p>
            </Flex>
          </li>
          <li>
            <Flex width between>
              <p className={$.list_title}>배송비</p>
              <p>3,000원</p>
            </Flex>
          </li>
        </ul>
      </Wrapper>
      <article className={$.bottom_button}>
        <div className={$.wrapper}>
          <Flex marginRight width>
            <Button content="장바구니" nonefixed noneBackground />
          </Flex>
          <Flex marginRigth width>
            <Button content="구매하기" nonefixed ></Button>
          </Flex>
        </div>
      </article>
    </div>
  )
}