import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import $ from './product.module.scss'
import Wrapper from '@components/Wrapper'
import Header from '@components/Header'
import HeaderTitle from '@components/HeaderTitle'
import Flex from '@components/Flex'
import IconButton from '@components/IconButton'
import { productInstance } from '@api/axiosInstance'
import { PRODUCT_LIST } from './productData'
import InputSearch from '@components/InputSearch'
import ProductCard from './ProductCard'
import FloatMenu from '@components/FloatMenu'

export default function Product() {
  const [value, onChange] = useState(new Date())

  const navigate = useNavigate()
  const inputRef = useRef(null)
  const [query, setQuery] = useSearchParams()
  // const searchQuery = query.get('q') || ''
  const [searchValue, setSearchValue] = useState('')
  const [productList, setProductList] = useState([])

  const handleInputChange = useCallback(
    (e) => {
      setSearchValue(e.target.value)
      console.log(searchValue)
    },
    [searchValue]
  )

  const handleResetClick = () => {
    setSearchValue('')
    inputRef.current.focus()
  }

  // function getProduct() {
  //   productInstance
  //     .get('/', {
  //       params: {
  //         q: searchQuery,
  //       },
  //     })
  //     .then((res) => setProductList(res.data))
  //     .catch((err) => console.log(err))
  // }

  const search = (e) => {
    if (e.key === 'Enter') {
      let keyword = e.target.value
      let searchFilter = PRODUCT_LIST.filter((v) => v.title.includes(keyword))
      setProductList(searchFilter)
    }
  }

  useEffect(() => {
    setProductList(PRODUCT_LIST)
  }, [])

  return (
    <Wrapper colorGray>
      <Header>
        <Flex width between>
          <HeaderTitle content="쇼핑" dates={value} />
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

      <FloatMenu />
    </Wrapper>
  )
}
