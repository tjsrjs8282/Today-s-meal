import React, { useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import $ from './search.module.scss'
import logoBg from '@assets/ic-logo-bg.png'
import Wrapper from '@components/Wrapper'
import Flex from '@components/Flex'
import Header from '@components/Header'
import HeaderTitle from '@components/HeaderTitle'
import IconButton from '@components/IconButton'
import InputSearch from '@components/InputSearch'
import FoodSearchListItem from './FoodSearchListItem'
import { SEARCH_FOOD } from './constants'

export default function FoodSearch() {
  const [searchFood, setSearchFood] = useState('')
  const [isSearchData, setIsSearchData] = useState(true)
  const inputRef = useRef(null)
  const navigate = useNavigate();

  const handleInputChange = useCallback((e) => {
    setSearchFood(e.target.value)
  }, [searchFood])

  const handleResetClick = () => {
    setSearchFood('')
    inputRef.current.focus()
  }

  const handleItemClick = () => {
    console.log('handleItemClick')
  }

  const goBack = () => {
    navigate('../today')
  }

  if (!isSearchData) {
    return (
      <Wrapper colorGray>
        <Header>
          <Flex column start width >
            <Flex >
              <IconButton kinds="close" onClick={goBack} />
              <HeaderTitle content="아침식사" />
            </Flex>
            <InputSearch
              type="text"
              name="foodSearch"
              value={searchFood}
              inputRef={inputRef}
              placeholder="먹은 음식을 검색해 주세요."
              onChange={handleInputChange}
              onClick={handleResetClick}
            />
          </Flex>
        </Header>
        <div className={$.empty_box}>
          <img src={logoBg} alt="빈접시" />
        </div>
      </Wrapper>
    )
  }
  return (
    <Wrapper colorGray>
      <Header>
        <Flex column start width >
          <Flex >
            <IconButton kinds="close" onClick={goBack} />
            <HeaderTitle content="아침식사" />
          </Flex>
          <InputSearch
            type="text"
            name="foodSearch"
            value={searchFood}
            inputRef={inputRef}
            placeholder="먹은 음식을 검색해 주세요."
            onChange={handleInputChange}
            onClick={handleResetClick}
          />
        </Flex>
      </Header>
      <div className={$.food_list}>
        {SEARCH_FOOD.map((foodData) => {
          const { id } = foodData
          return <FoodSearchListItem key={id} foodData={foodData} onClick={handleItemClick} />
        })}
      </div>
    </Wrapper>
  )
}