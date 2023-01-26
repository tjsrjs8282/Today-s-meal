import React, { useState, useEffect } from 'react'
import $ from './product.module.scss'
import Wrapper from '@components/Wrapper'
import Header from '@components/Header'
import Flex from '@components/Flex'
import IconButton from '@components/IconButton'
import axiosInstance from '@api/productsAxios'
import InputSearch from '@components/InputSearch'
import ProductCard from './productCard'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function Product() {
  const navigate = useNavigate()
  const [query, setQuery] = useSearchParams()
  const searchQuery = query.get('q') || ''
  const [searchValue, setSearchValue] = useState('')
  const [productList, setProductList] = useState([])

  const handleInputChange = (e) => {
    setSearchValue(e.target.value)
    console.log(searchValue)
  }

  function getProduct() {
    axiosInstance
      .get(`${import.meta.env.VITE_PRODUCTS}?q=${searchQuery}`)
      .then((res) => setProductList(res))
      .catch((err) => console.log(err))
  }

  const search = (e) => {
    if (e.key === 'Enter') {
      let keyword = e.target.value
      navigate(`/product/?q=${keyword}`)
    }
  }

  useEffect(() => {
    getProduct()
  }, [query])
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
          onKeyPress={(e) => search(e)}
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
