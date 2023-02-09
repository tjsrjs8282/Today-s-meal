import React, { useState } from 'react'
import $ from './foodTodayDetail.module.scss'
import { useNavigate } from 'react-router-dom'
import Header from '@components/Header'
import IconButton from '@components/IconButton'
import Title from '@components/Title'
import Wrapper from '@components/Wrapper'
import Flex from '@components/Flex'
import IconPurpose from '@assets/ic-purpose-normal.png'
import Button from '@components/Button'
import RadioGroup from '@components/RadioGroup'
import Radio from '@components/Radio'
import FloatMenu from '@components/FloatMenu'
import { USER_INTAKE_TOTAL, USER_INTAKE_PART } from './constants'
import { LOCAL_STORAGE_KEY } from '@constants'

export default function FoodTodayDetail() {
  const isUserPurpose = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.USER_PURPOSE))
  const [currentTab, SetCurrentTab] = useState(0)
  const [foodPart, setFoodPart] = useState('아침')

  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }
  const goPurpose = () => {
    navigate('/purpose')
  }
  const selectMenuHandler = (index) => {
    SetCurrentTab(index)
  }
  return (
    <Wrapper>
      <Header>
        <IconButton kinds="back" onClick={goBack} />
      </Header>
      <Title content="오늘의 식단" />
      <Title content="나의 목표" sub></Title>
      <div className={$.purpose}>
        <Flex width between>
          <Flex>
            <div className={$.icon}>
              <img src={IconPurpose} alt={IconPurpose} />
            </div>

            <Flex column start>
              <h2>{isUserPurpose}</h2>
              <p>
                단백질 : 150 / 212 <span>g</span>
              </p>
            </Flex>
          </Flex>
          <Button content="목표 수정" border onClick={goPurpose} />
        </Flex>
      </div>
      <Title content="섭취량" sub></Title>

      <div className={$.intake_total}>
        <Flex colorMain radius padding wrap>
          {USER_INTAKE_TOTAL.map((total) => {
            const { id, name, value, max, unit } = total
            return (
              <Flex width between fontWhite paddingBottom borderBottom key={id}>
                <h3>{name}</h3>
                <p>
                  {value} / {max}
                  <span>{unit}</span>
                </p>
              </Flex>
            )
          })}
        </Flex>
      </div>

      <Title content="식사" sub></Title>

      <RadioGroup label="purpose" value={foodPart} onChange={setFoodPart}>
        {['아침', '점심', '저녁', '간식'].map((part, index) => {
          return (
            <Radio name="purpose" value={part} key={index} tab>
              <p>{part}</p>
            </Radio>
          )
        })}
      </RadioGroup>

      {/* <Flex start>
        {FOOD_PART.map((part, index) => {
          return (
            <Flex marginRight marginBottom onClick={() => selectMenuHandler(index)} key={index}>
              <Button content={part} className={index === currentTab ? true : false} border />
            </Flex>
          )
        })}
      </Flex> */}

      <div className={$.intake_part}>
        <Flex colorGray radius padding wrap>
          {USER_INTAKE_PART[0][foodPart].map((part) => {
            const { id, name, value, unit } = part
            return (
              <Flex width between paddingBottom borderBottom>
                <h3>{name}</h3>
                <p>
                  {value}
                  <span>{unit}</span>
                </p>
              </Flex>
            )
          })}
        </Flex>
      </div>

      <FloatMenu />
    </Wrapper>
  )
}
