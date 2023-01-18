import React, { useState, useRef } from 'react'
import $ from './search.module.scss'
import logoBg from '@assets/ic-logo-bg.png'
import Wrapper from '@components/Wrapper'
import Header from '@components/Header'
import ListBox from '@components/ListBox'
import TitleBox from '@components/TitleBox'
import IconButton from '@components/IconButton'
import Input from '@components/Input'

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

  return (
    <div className={$.content} >
      <div className={$.wrap}>
        <Wrapper kinds={'minimal'}>
          <Header>
            <IconButton kinds={'close'} />
            <TitleBox content={'아침식사'} kinds={'margin'}/>
          </Header>
          <form className={$.search_form} onSubmit={handleFormSubmit}>
            <Input 
              type='text'
              name='search'
              value={value}
              onChange={handleInputChange}
              inputRef={inputRef}
              kinds={<IconButton kinds={'search'} />}
              unit={
                value
                && <IconButton
                  kinds={'closeCircle'}
                  onClick={handleResetClick}
                  />
              }
            />
          </form>
        </Wrapper>
      </div>
      {
        check 
        ? (
          <Wrapper kinds={'minimal'}>
            {searchList.map((data) => (
              <ListBox key={data.name + data.size} data={data} />
            ))}
          </Wrapper>
        ) 
        : (
          <div className={$.empty_box}>
            <img src={logoBg} alt="빈접시" />
          </div>
        )
      }
    </div>
  )
}