import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import $ from './userInfo.module.scss'
import Wrapper from '@components/Wrapper'
import Header from '@components/Header'
import Flex from '@components/Flex'
import Title from '@components/Title'
import RadioGroup from '@components/RadioGroup'
import Radio from '@components/Radio'
import Button from '@components/Button'
import Input from '@components/Input'
import IconButton from '@components/IconButton'
import { LOCAL_STORAGE_KEY } from '@constants'
import Modal from '@components/Modal'

export default function UserInfo() {
  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }

  const [gender, setGender] = useState('man')
  const [isUserInfo, setIsUserInfo] = useState(!false)
  const [modal, setModal] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [modalContent, setModalContent] = useState('')

  const nameInput = useRef([])
  const [inputs, setInputs] = useState({
    userName: '',
    userOld: '',
    userHeight: '',
    userWeight: '',
  })
  const { userName, userOld, userHeight, userWeight } = inputs

  const handleInputChange = (e) => {
    const { name, value } = e.target
    const result = name !== 'userName' ? value.replace(/\D/g, '') : value
    checkUserInfo()
    setInputs({ ...inputs, [name]: result })
  }

  const checkUserInfo = () => {
    if (userName != '' && userOld != '' && userHeight != '' && userWeight != '') {
      setIsUserInfo(false)
    } else {
      setIsUserInfo(true)
    }
  }

  const handleOnClick = () => {
    for (let i = 0; i < nameInput.current.length; i++) {
      if (nameInput.current[i].value === '') {
        setModalTitle(nameInput.current[i].title + ' 을(를) 입력해주세요!')
        setModalContent(
          `귀하의 ${nameInput.current[i].title} 을(를) 입력해주셔야만
             다음으로 진행이 될 수 있습니다.`
        )
        setModal(!modal)

        nameInput.current[i].focus()
        return false
      }
    }
    localStorage.removeItem(LOCAL_STORAGE_KEY.USER_INFO)
    localStorage.removeItem(LOCAL_STORAGE_KEY.USER_GENDER)
    localStorage.setItem(LOCAL_STORAGE_KEY.USER_INFO, JSON.stringify(inputs))
    localStorage.setItem(LOCAL_STORAGE_KEY.USER_GENDER, gender)

    navigate('/purpose')
  }

  return (
    <Wrapper colorWhite>
      {modal && <Modal title={modalTitle} content={modalContent} onClick={handleOnClick}></Modal>}

      <Header>
        <IconButton kinds="back" onClick={goBack} />
      </Header>
      <Title
        content="회원 정보를 
        입력해 주세요."
      />
      <Title content="성별" sub />
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
      <Title content="이름" sub />
      <Input
        type="text"
        placeholder="이름이 무엇인가요?"
        name="userName"
        title="이름"
        value={userName}
        inputRef={(el) => (nameInput.current[0] = el)}
        maxLength={8}
        onChange={handleInputChange}
      />
      <Title content="나이" sub />
      <Input
        type="number"
        placeholder="나이를 입력해주세요"
        name="userOld"
        title="나이"
        value={userOld}
        inputRef={(el) => (nameInput.current[1] = el)}
        maxLength={3}
        onChange={handleInputChange}
      />

      <Flex>
        <div className={$.input_box}>
          <Title content="키" sub />
          <Input
            type="number"
            placeholder="0"
            name="userHeight"
            title="키"
            value={userHeight}
            inputRef={(el) => (nameInput.current[2] = el)}
            maxLength={3}
            unit="cm"
            onChange={handleInputChange}
          />
        </div>
        <div className={$.input_box}>
          <Title content="몸무게" sub />
          <Input
            type="number"
            placeholder="0"
            name="userWeight"
            title="몸무게"
            value={userWeight}
            inputRef={(el) => (nameInput.current[3] = el)}
            maxLength={3}
            unit="kg"
            onChange={handleInputChange}
          />
        </div>
      </Flex>
      <Button content="다음으로" check={isUserInfo} onClick={handleOnClick} container />
    </Wrapper>
  )
}
