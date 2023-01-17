import React, { useState } from 'react'
import $ from './search.module.scss'
import Wrapper from '@components/Wrapper'
import Header from '@components/Header'
import Title from '@components/Title'
import IconButton from '@components/IconButton'
import Input from '@components/Input'

export default function Search() {
  const [value, setValue] = useState('')
  const [searchList, setSearchList] = useState([])

  const handleInputChange = (e) => {
    setValue(e.target.value)
  }

  const onClick = () => {
    setValue('')
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log('onSubmit')
  }

  return (
    <div className={$.content} >
      <div className={$.wrap}>
        <Wrapper kinds={'minimal'}>
          <Header>
            <IconButton kinds={'close'} />
            <div className={$.title_box} >
              <h1>아침식사</h1>
              <p>12월 28일 수요일</p>
            </div>
          </Header>
          <form className={$.search_form} onSubmit={onSubmit}>
            <Input 
              type='text'
              name='search'
              value={value}
              onChange={handleInputChange}
              unit={
                value && <IconButton kinds={'closeCircle'} onClick={onClick}/>
              }
            />
          </form>
        </Wrapper>
      </div>
    </div>
  )
}