import React, { useState, useRef } from 'react'
import $ from './search.module.scss'
import logoBg from '@assets/ic-logo-bg.png'
import Wrapper from '@components/Wrapper'
import Header from '@components/Header'
import ListItem from '@components/ListItem'
import HeaderTitle from '@components/HeaderTitle'
import Input from '@components/Input'
import InputSearch from '@components/InputSearch'
import { SEARCH_FOOD } from './constants'

export default function Search() {
  //파일명 FoodSearch 로 변경 , 컴포넌트명도 동일하게
  const [value, setValue] = useState('')
  const [searchList, setSearchList] = useState(SEARCH_FOOD)
  const [empty, setEmpty] = useState(true)
  const inputRef = useRef(null)
  //변수 네이밍 수정 (있는지 확인하는거는 is어쩌구

  const handleInputChange = (e) => {
    setValue(e.target.value)
  }

  const handleResetClick = () => {
    setValue('')
    inputRef.current.focus()
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    console.log('onSubmit')
  }

  const handleItemClick = () => {
    console.log('handleItemClick')
  }

  if (!empty) {
    return (
      <Wrapper colorGray>
        <Header>
          <IconButton kinds="close" />
          {/* useNavigate 해서 onClick 뒤로가기 넣기 ,다른페이지 참고*/}
          {/* 속성값 text면 그냥 대괄호 안넣는걸로 통일 */}
          <HeaderTitle content="아침식사" />
          {/* 컴포넌트 네이밍 */}
          <InputSearch
            type="text"
            name="foodSearch"
            value={value}
            placeholder="먹은 음식을 검색해 주세요."
            onChange={handleInputChange}
            onClick={handleResetClick}
          />
          {/* inputSearch 컴포넌트 리펙토링 css */}
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
        <IconButton kinds="close" />
        <TitleBox content="아침식사" kinds="margin" />
        <InputSearch
          type="text"
          name="foodSearch"
          value={value}
          placeholder="먹은 음식을 검색해 주세요."
          onChange={handleInputChange}
          onClick={handleResetClick}
        />
      </Header>

      <div className={$.food_list}>
        {searchList.map((data) => (
          <ListItem key={data.id} data={data} onClick={handleItemClick} />
        ))}
      </div>
      {/* map또는 반복문 돌리는 곳만 제어 용이하게 div 클레스네임 지정해서 감싸기  */}
      {/* constants.js 불러와서 distructuring 해서 */}
    </Wrapper>
  )
}
