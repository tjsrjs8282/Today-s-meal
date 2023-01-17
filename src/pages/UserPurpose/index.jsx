import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import $ from './perposeList.module.scss'
import Wrapper from '@components/Wrapper'
import Header from '@components/Header'
import IconButton from '@components/IconButton'
import Title from '@components/Title'
import Button from '@components/Button'
import RadioGroup from '@components/RadioGroup'
import Radio from '@components/Radio'
import { AiFillCheckCircle } from 'react-icons/ai'

export default function UserPurpose() {
  const navigate = useNavigate()
  const [purpose, setPurpose] = useState('maintain')

  const handleOnClick = () => {
    localStorage.removeItem('userPurpose')
    localStorage.setItem('userPurpose', JSON.stringify(purpose))

    navigate('/today')
  }

  useEffect(() => {}, [])

  return (
    <Wrapper>
      <Header>
        <IconButton kinds="back" />
      </Header>
      <Title
        content="귀하의 식단 목표를
          설정해 주세요."
      />
      <RadioGroup label="purpose" value={purpose} onChange={setPurpose}>
        <Radio name="purpose" value="maintain">
          <div className={$.purpose_icon}>
            <AiFillCheckCircle />
          </div>
          <p>탄단지 균형 유지</p>
          <h3>유지하기</h3>
        </Radio>
        <Radio name="purpose" value="muscle">
          <div className={$.purpose_icon}>
            <AiFillCheckCircle />
          </div>
          <p>단백질량 증가해서</p>
          <h3>근육 키우기</h3>
        </Radio>
        <Radio name="purpose" value="diet">
          <div className={$.purpose_icon}>
            <AiFillCheckCircle />
          </div>
          <p>균형잡힌 영양소와</p>
          <h3>체중 감소</h3>
        </Radio>
        <Radio name="purpose" value="bulkup">
          <div className={$.purpose_icon}>
            <AiFillCheckCircle />
          </div>
          <p>균형잡힌 영양소와</p>
          <h3>체즁 증가</h3>
        </Radio>
      </RadioGroup>
      <Button content="확인" link="/today" onClick={handleOnClick} />
    </Wrapper>
  )
}
