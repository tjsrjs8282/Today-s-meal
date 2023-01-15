import React, { useState, useEffect, useRef } from 'react'
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
import { useNavigate } from 'react-router-dom'

export default function UserInfo() {
  const navigate = useNavigate()
  const [gender, setGender] = useState('man')

  const [infoCheck, setInfoCheck] = useState(!false)

  const nameInput = useRef([])

  const [inputs, setInputs] = useState({
    userName: '',
    userOld: '',
    userHeight: '',
    userWeight: '',
  })
  const { userName, userOld, userHeight, userWeight } = inputs
  const handleInputChange = (e) => {
    let result
    const { name } = e.target
    result = name != 'userName' ? e.target.value.replace(/\D/g, '') : e.target.value
    if (userName != '' && userOld != '' && userHeight != '' && userWeight != '') {
      setInfoCheck(false)
    } else {
      setInfoCheck(true)
    }
    setInputs({ ...inputs, [name]: result })
  }

  useEffect(() => {
    console.log('nameInputRef:', nameInput)
  })

  const handleOnClick = () => {
    for (let i = 0; i < nameInput.current.length; i++) {
      if (nameInput.current[i].value === '') {
        alert(nameInput.current[i].title + '는(은) 필수 입력사항입니다.')
        nameInput.current[i].focus()
        return false
      }
    }
    navigate('/purpose')
  }
  return (
    <Wrapper>
      <Header>
        <IconButton kinds="back" />
      </Header>
      <Title
        content="회원 정보를 
        입력해 주세요."
      />
      <Title content="성별" kinds="sub" />
      <RadioGroup label="gender" value={gender} onChange={setGender}>
        <Radio name="gender" value="man" defaultChecked>
          <IconButton kinds="man" />
          <span>남자</span>
        </Radio>
        <Radio name="gender" value="woman">
          <IconButton kinds="woman" />
          <span>여자</span>
        </Radio>
      </RadioGroup>
      <Title content="이름" kinds="sub" />
      <Input
        type="text"
        placeholder="이름이 무엇인가요?"
        name="userName"
        title="이름"
        value={userName}
        inputRef={(el) => (nameInput.current[0] = el)}
        handleInputChange={handleInputChange}
      />
      <Title content="나이" kinds="sub" />
      <Input
        type="tel"
        placeholder="나이를 입력해주세요"
        name="userOld"
        title="나이"
        value={userOld}
        inputRef={(el) => (nameInput.current[1] = el)}
        maxLength={3}
        handleInputChange={handleInputChange}
      />

      <Flex>
        <div className={$.input_box}>
          <Title content="키" kinds="sub" />
          <Input
            type="tel"
            placeholder="0"
            name="userHeight"
            title="키"
            value={userHeight}
            inputRef={(el) => (nameInput.current[2] = el)}
            maxLength={3}
            unit="cm"
            handleInputChange={handleInputChange}
          />
        </div>
        <div className={$.input_box}>
          <Title content="몸무게" kinds="sub" />
          <Input
            type="tel"
            placeholder="0"
            name="userWeight"
            title="몸무게"
            value={userWeight}
            inputRef={(el) => (nameInput.current[3] = el)}
            maxLength={3}
            unit="kg"
            handleInputChange={handleInputChange}
          />
        </div>
      </Flex>
      <Button content="다음으로" link="/purpose" check={infoCheck} onClick={handleOnClick} />
    </Wrapper>
  )
}
