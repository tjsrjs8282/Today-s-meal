import React, { useState, useEffect } from 'react'
import $ from './userInfo.module.scss'
import Wrapper from '@components/Wrapper'
import IconButton from '@components/IconButton'
import Title from '@components/Title'
import RadioGroup from '@components/RadioGroup'
import Radio from '@components/Radio'
import Button from '@components/Button'
import Input from '@components/Input'
import Flex from '@components/Flex'
import Header from '@components/Header'

export default function UserInfo() {
  const [value, setValue] = useState('man')

  return (
    <Wrapper>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          alert(`오늘의식단`)
        }}
      >
        <Header>
          <IconButton kinds="back" />
        </Header>
        <Title
          content="회원 정보를 
        입력해 주세요."
        />
        <Title content="성별" kinds="sub" />

        <RadioGroup label="성별" value={value} onChange={setValue}>
          <Radio name="sex" value="man" defaultChecked>
            <IconButton kinds="man" />
            남자
          </Radio>
          <Radio name="sex" value="woman">
            <IconButton kinds="woman" />
            여자
          </Radio>
        </RadioGroup>

        <Title content="이름" kinds="sub" />
        <Input placeholder="이름이 무엇인가요?" name="userName" />
        <Title content="나이" kinds="sub" />
        <Input placeholder="나이를 입력해주세요" name="userOld" />
        <Flex>
          <div className={$.input_box}>
            <Title content="키" kinds="sub" />
            <Input placeholder="0" name="userOld" />
          </div>
          <div className={$.input_box}>
            <Title content="몸무게" kinds="sub" unit="cm" />
            <Input placeholder="0" name="userOld" unit="kg" />
          </div>
        </Flex>

        <button>{value}다음으로</button>
        <Button content="다음으로" link="target" />
      </form>
    </Wrapper>
  )
}
