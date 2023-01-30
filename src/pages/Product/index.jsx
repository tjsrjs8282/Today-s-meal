import React, { useState, useRef, useEffect } from 'react'
import $ from './product.module.scss'
import Wrapper from '@components/Wrapper'
import Header from '@components/Header'
import HeaderTitle from '@components/HeaderTitle'
import Flex from '@components/Flex'
import IconButton from '@components/IconButton'
import axiosInstance from '@api/productsAxios'
import InputSearch from '@components/InputSearch'
import ProductCard from './productCard'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function Product() {
  const navigate = useNavigate()
  const inputRef = useRef(null)
  const [query, setQuery] = useSearchParams()
  const searchQuery = query.get('q') || ''
  const [searchValue, setSearchValue] = useState('')
  const [productList, setProductList] = useState([])

  const handleInputChange = (e) => {
    setSearchValue(e.target.value)
    console.log(searchValue)
  }

  const handleResetClick = () => {
    setSearchValue('')
    inputRef.current.focus()
  }

  function getProduct() {
    axiosInstance
      .get('/', {
        params: {
          q: searchQuery,
        },
      })
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
          <HeaderTitle content="오늘의 쇼핑" />
          <IconButton kinds="cart" />
        </Flex>
        <InputSearch
          type="text"
          name="productSearch"
          value={searchValue}
          placeholder="찾으시는 상품을 검색해주세요."
          inputRef={inputRef}
          onClick={handleResetClick}
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
