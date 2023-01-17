import React, { useState } from 'react'
import $ from './search.module.scss'
import logoBg from '@assets/ic-logo-bg.png'
import Wrapper from '@components/Wrapper'
import Header from '@components/Header'
import TitleBox from '@components/TitleBox'
import IconButton from '@components/IconButton'
import Input from '@components/Input'

export default function Search() {
  const [value, setValue] = useState('')
  const [searchList, setSearchList] = useState([])
  const [check, setCheck] = useState(false)

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
            <TitleBox content={'아침식사'} />
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
      {
        check 
        ? (
          <Wrapper kinds={'minimal'}>
            {searchList}
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