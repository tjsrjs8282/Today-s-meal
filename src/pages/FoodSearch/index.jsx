import React, { useState, useRef, useCallback, useEffect } from 'react'
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
import { fatsecretInstance } from '@api/axiosInstance'
import axios from 'axios'
export default function FoodSearch() {
  const [value, onChange] = useState(new Date())
  const [searchFood, setSearchFood] = useState('')
  const [isSearchData, setIsSearchData] = useState(true)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  const handleInputChange = useCallback(
    (e) => {
      setSearchFood(e.target.value)
    },
    [searchFood]
  )

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

  function getFatsecret() {
    fatsecretInstance
      .get('/?method=food.get.v2&food_id=1000&format=json')
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err))
    // fatsecretInstance.then((res) => console.log(res)).catch((err) => console.log(err))
  }

  useEffect(() => {
    getFatsecret()
  }, [])

  if (!isSearchData) {
    return (
      <Wrapper colorGray>
        <Header>
          <Flex column start width>
            <Flex between>
              <HeaderTitle content="아침식사" dates={value} />
              <IconButton kinds="close" onClick={goBack} />
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
        <Flex column start width>
          <Flex between width>
            <HeaderTitle content="아침식사" dates={value} />
            <IconButton kinds="close" onClick={goBack} />
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
