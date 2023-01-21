import React, { useState, useEffect } from 'react'
import $ from './product.module.scss'
import Wrapper from '@components/Wrapper'
import Header from '@components/Header'
import Flex from '@components/Flex'
import IconButton from '@components/IconButton'
import axiosInstance from '@api/productsAxios'
import InputSearch from '@components/InputSearch'
import ProductCard from './productCard'

export default function Product() {
  const [searchValue, setSearchValue] = useState('')
  const [productList, setProductList] = useState([])

  const handleInputChange = (e) => {
    setSearchValue(e.target.value)
  }

  function getProduct() {
    axiosInstance
      .get()
      .then((res) => setProductList(res))
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    getProduct()
  }, [])
  return (
    <Wrapper colorGray>
      <Header>
        <Flex width between>
          <Flex column start>
            <h2>오늘의 쇼핑</h2>
            <p>1월 17일, 수요일</p>
          </Flex>
          <IconButton kinds="cart" />
        </Flex>
        <InputSearch
          type="text"
          name="productSearch"
          value={searchValue}
          placeholder="찾으시는 상품을 검색해주세요."
          onChange={handleInputChange}
        />
      </Header>

      <div className={$.product_box}>
        <Flex start wrap width marginTop>
          {productList.map((data) => {
            return <ProductCard data={data} />
          })}
        </Flex>
      </div>
    </Wrapper>
  )
}
