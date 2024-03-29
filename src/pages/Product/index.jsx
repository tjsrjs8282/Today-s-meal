import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import $ from './product.module.scss'
import Wrapper from '@components/Wrapper'
import Header from '@components/Header'
import HeaderTitle from '@components/HeaderTitle'
import Flex from '@components/Flex'
import RadioGroup from '@components/RadioGroup'
import Radio from '@components/Radio'
import IconButton from '@components/IconButton'
import { productInstance } from '@api/axiosInstance'
import { PRODUCT_LIST } from './productData'
import InputSearch from '@components/InputSearch'
import ProductCard from './ProductCard'
import FloatMenu from '@components/FloatMenu'

function getRandomProductList() {
  const copyProductList = [...PRODUCT_LIST]
  const shuffle = []
  while (copyProductList.length > 0) {
    const randomNum = Math.floor(Math.random() * copyProductList.length)
    shuffle.push(copyProductList.splice(randomNum, 1)[0])
  }
  return shuffle
}

export default function Product() {
  const [value, onChange] = useState(new Date())

  const navigate = useNavigate()
  const inputRef = useRef(null)
  const [query, setQuery] = useSearchParams()
  const [searchValue, setSearchValue] = useState('')
  const [productList, setProductList] = useState([])
  const [categoryList, setCategoryList] = useState([])
  const [category, setCategory] = useState('전체')
  const [clickCategory, setClickCategory] = useState('')

  const goProductBasket = () => {
    navigate('/basket')
  }

  const handleInputChange = useCallback(
    (e) => {
      setSearchValue(e.target.value)
    },
    [searchValue]
  )

  const handleResetClick = () => {
    setSearchValue('')
    inputRef.current.focus()
  }

  const onClickPartHandler = (e, cate) => {
    if (clickCategory === e.target.id) {
      return
    }

    setClickCategory(e.target.id)
    const productList = getRandomProductList()
    let categoryFilter =
      cate === '전체' ? productList : productList.filter((v) => v.category.includes(cate))
    setProductList(categoryFilter)
  }

  function getProduct() {
    const category = PRODUCT_LIST.map((data) => data.category)
    setProductList(getRandomProductList())
    setCategoryList(['전체', ...new Set(category)])
  }

  const search = (e) => {
    if (e.key === 'Enter') {
      let keyword = e.target.value
      let searchFilter = PRODUCT_LIST.filter((v) => v.title.includes(keyword))
      setProductList(searchFilter)
    }
  }

  useEffect(() => {
    getProduct()
  }, [])

  return (
    <Wrapper colorGray>
      <Header>
        <Flex width between>
          <HeaderTitle content="쇼핑" dates={value} />
          <IconButton kinds={'cart'} onClick={goProductBasket} />
        </Flex>

        <InputSearch
          type="text"
          name="productSearch"
          value={searchValue}
          placeholder="찾으시는 상품을 검색해주세요."
          inputRef={inputRef}
          maxLength={30}
          onClick={handleResetClick}
          onChange={handleInputChange}
          onKeyPress={(e) => search(e)}
        />
      </Header>

      <div className={$.radio_box}>
        <RadioGroup label="category" value={category} onChange={setCategory}>
          {categoryList.map((cate, index) => {
            return (
              <Radio
                name="category"
                value={cate}
                key={index}
                onClick={(e) => onClickPartHandler(e, cate)}
                tab
              >
                <p>{cate}</p>
              </Radio>
            )
          })}
        </RadioGroup>
      </div>

      <div className={$.product_box}>
        <Flex start wrap width>
          {productList.map((data) => {
            return <ProductCard key={data.id} data={data} />
          })}
        </Flex>
      </div>

      <FloatMenu />
    </Wrapper>
  )
}
