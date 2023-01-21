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
  //파일명 FoodSearch 로 변경 , 컴포넌트명도 동일하게
  const [searchFood, setSearchFood] = useState('')
  const [isSearchData, setIsSearchData] = useState(true)
  const inputRef = useRef(null)
  const navigate = useNavigate();
  //변수 네이밍 수정 (있는지 확인하는거는 is어쩌구

  const handleInputChange = useCallback((e) => {
    setSearchFood(e.target.value)
  }, [searchFood])

  const handleResetClick = () => {
    setSearchFood('')
    inputRef.current.focus()
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    console.log('onSubmit')
  }

  const handleItemClick = () => {
    console.log('handleItemClick')
  }

  const goBack = () => {
    navigate('../today')
  }

  console.log('redered')

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
      {/* useNavigate 해서 onClick 뒤로가기 넣기 ,다른페이지 참고*/}
      {/* 속성값 text면 그냥 대괄호 안넣는걸로 통일 */}
      {/* 컴포넌트 네이밍 */}
      {/* inputSearch 컴포넌트 리펙토링 css */}

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
          {/* inputSearch 컴포넌트 리펙토링 css */}
      </Header>

      <div className={$.food_list}>
        {SEARCH_FOOD.map((foodData) => {
          const { id } = foodData
          return <FoodSearchListItem key={id} foodData={foodData} onClick={handleItemClick} />
        })}
      </div>
      {/* map또는 반복문 돌리는 곳만 제어 용이하게 div 클레스네임 지정해서 감싸기  */}
      {/* constants.js 불러와서 distructuring 해서 */}
    </Wrapper>
  )
}