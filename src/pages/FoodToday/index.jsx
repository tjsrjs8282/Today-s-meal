import React from 'react'
import $ from './foodToday.module.scss'
import { useNavigate } from 'react-router-dom'
import Wrapper from '@components/Wrapper'
import Header from '@components/Header'
import IconButton from '@components/IconButton'
import Flex from '@components/Flex'
import Title from '@components/Title'
import Button from '@components/Button'
import { FOOD_TODAY_SUMMARY } from './FoodTodaySummary/constants'
import { FOOD_TODAY_RECORD } from './FoodTodayRecord/constants'
import FoodTodaySummary from './FoodTodaySummary'
import FoodTodayRecord from './FoodTodayRecord'

export default function FoodToday() {
  const navigate = useNavigate()
  const goFoodSearch = () => {
    navigate('/search')
  }

  return (
    <Wrapper gray>
      <Header>
        <Flex width between>
          <Flex column start>
            <h2>오늘의 식단</h2>
            <p>1월 17일, 수요일</p>
          </Flex>
          <IconButton kinds="calendar" />
        </Flex>
      </Header>
      <Title content="요약 " sub>
        <Button content="상세보기" more />
      </Title>
      <div className={$.summary_box}>
        <Flex between>
          {FOOD_TODAY_SUMMARY.map((summary) => {
            const { name, value, unit, id } = summary
            return <FoodTodaySummary name={name} value={value} unit={unit} key={id} />
          })}
        </Flex>
      </div>

      <Title content="기록" sub />
      <div className={$.record_box}>
        <Flex wrap column>
          {FOOD_TODAY_RECORD.map((record) => {
            const { name, value, calorie, image, food, id } = record
            return (
              <FoodTodayRecord
                name={name}
                value={value}
                calorie={calorie}
                image={image}
                food={food}
                onClick={goFoodSearch}
                key={id}
              />
            )
          })}
        </Flex>
      </div>
    </Wrapper>
  )
}
