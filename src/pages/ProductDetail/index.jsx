import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import $ from './productDetail.module.scss'
import Wrapper from '@components/Wrapper'
import Flex from '@components/Flex'
import Header from '@components/Header'
import IconButton from '@components/IconButton'
import Button from '@components/Button'
import { PRODUCT_LIST } from '@pages/Product/productData'

export default function ProductDetail() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [productList, setProductList] = useState([])

  const goBack = () => {
    navigate(-1)
  }

  function getProduct() {
    const productIdfilter = PRODUCT_LIST.filter((data) => data.id === Number(id))
    setProductList(...productIdfilter)
  }
  useEffect(() => {
    getProduct()
  }, [])

  return (
    <Wrapper colorGray none>
      <Header>
        <Flex width between>
          <IconButton kinds="back" onClick={goBack} />
          <IconButton kinds="cart" />
        </Flex>
      </Header>

      <div className={$.product_image}>
        <img src={productList.img} alt="상품이미지" />
      </div>
      <Flex column width start padding>
        <div className={$.title}>
          <h2>{productList.title}</h2>
          <p className={$.price}>{productList.price}원</p>
        </div>
        <ul className={$.benefit}>
          <li>
            <Flex width between>
              <p className={$.list_title}>적립포인트</p>
              <p>{productList.price * 0.02}P</p>
            </Flex>
          </li>
          <li>
            <Flex width between>
              <p className={$.list_title}>배송비</p>
              <p>{productList.price > 50000 ? 0 : 3000}원</p>
            </Flex>
            <Flex width between>
              <p className={$.list_title}>(50000원 이상 배송비 무료)</p>
            </Flex>
          </li>
          <li className={$.total_price}>
            <Flex width between>
              <h2 className={$.list_title}>총 결제금액</h2>
              <h2>{productList.price - (productList.price > 50000 ? 0 : 3000)}원</h2>
            </Flex>
          </li>
        </ul>
      </Flex>
      <div className={$.bottom_button}>
        <div className={$.wrapper}>
          <Flex marginRight width>
            <Button content="장바구니" nonefixed noneBackground />
          </Flex>
          <Flex marginRigth width>
            <Button content="구매하기" nonefixed></Button>
          </Flex>
        </div>
      </div>
    </Wrapper>
  )
}
