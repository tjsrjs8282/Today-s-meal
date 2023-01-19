import React, { useState, useRef } from 'react'
import $ from './search.module.scss'
import logoBg from '@assets/ic-logo-bg.png'
import Wrapper from '@components/Wrapper'
import Header from '@components/Header'
import ListItem from '@components/ListItem'
import TitleBox from '@components/TitleBox'
import IconButton from '@components/IconButton'
import Input from '@components/Input'
import InputSearch from '../../components/InputSearch'

const Data = [
  {
    name: '바나나',
    number: 1,
    size: '중형',
    kcal: 105,
  },
  {
    name: '바나나',
    number: 1,
    size: '소형',
    kcal: 105,
  },
  {
    name: '바나나우유',
    number: 1,
    size: '500ml',
    kcal: 105,
  },
]

export default function Search() {
  const [value, setValue] = useState('')
  const [searchList, setSearchList] = useState(Data)
  const [check, setCheck] = useState(true)
  const inputRef = useRef(null)

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

  return (
    <Wrapper gray>
      <Header>
        <IconButton kinds={'close'} />
        <TitleBox content={'아침식사'} kinds={'margin'} />
        <InputSearch
          type="text"
          name="foodSearch"
          value={value}
          placeholder="먹은 음식을 검색해 주세요."
          onChange={handleInputChange}
          onClick={handleResetClick}
        />
      </Header>

      {check ? (
        <Wrapper kinds={'minimal'}>
          {searchList.map((data) => (
            <ListItem key={data.name + data.size} data={data} onClick={handleItemClick} />
          ))}
        </Wrapper>
      ) : (
        <div className={$.empty_box}>
          <img src={logoBg} alt="빈접시" />
        </div>
      )}
    </Wrapper>
  )
}
