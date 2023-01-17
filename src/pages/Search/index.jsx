import React, { useState } from 'react'
import $ from './search.module.scss'
import Wrapper from '@components/Wrapper'
import Header from '@components/Header'
import IconButton from '@components/IconButton'
import Input from '@components/Input'

export default function Search() {
  const [value, setValue] = useState('')
  const [searchList, setSearchList] = useState([])

  const handleInputChange = (e) => {
    setValue(e.target.value)
  }
  return (
    <Wrapper>
      <Header>
        <IconButton kinds={'close'} />
      </Header>
      <div>
        <Input 
          type='text'
          name='search'
          value={value}
          onChange={handleInputChange}
        />
      </div>
      <div>
        {searchList}
      </div>
    </Wrapper>
  )
}