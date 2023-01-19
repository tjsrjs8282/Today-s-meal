import React from 'react'
import $ from './today.module.scss'
import Wrapper from '@components/Wrapper'
import Header from '@components/Header'
import IconButton from '@components/IconButton'
import Flex from '@components/Flex'
import Title from '@components/Title'
import Button from '@components/Button'
import TodaySummary from './TodaySummary'
import TodayRecord from './TodayRecord'

import Morning from '@assets/ic-morning-normal.png'
import Lunch from '@assets/ic-lunch-normal.png'
import Dinner from '@assets/ic-dinner-normal.png'
import Snack from '@assets/ic-snack-normal.png'

export default function Today() {
  const summaryList = [
    {
      id: 1,
      name: '탄수화물',
      value: 0,
      unit: 'g',
    },
    {
      id: 2,
      name: '단백질',
      value: 0,
      unit: 'g',
    },
    {
      id: 3,
      name: '지방',
      value: 0,
      unit: 'g',
    },
    {
      id: 4,
      name: '총 칼로리',
      value: 0,
      unit: 'g',
    },
  ]

  const recordList = [
    {
      id: 1,
      name: '아침 식사',
      value: 0,
      calorie: 0,
      food: {
        name: '바나나',
        value: 0,
        size: '중형',
        calorie: 0,
      },
      image: Morning,
    },
    {
      id: 2,
      name: '점심 식사',
      value: 0,
      calorie: 0,
      image: Lunch,
    },
    {
      id: 3,
      name: '저녁 식사',
      value: 0,
      calorie: 0,
      image: Dinner,
    },
    {
      id: 4,
      name: '간식',
      value: 0,
      calorie: 0,
      image: Snack,
    },
  ]

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
      <Title content="요약 " kinds="sub">
        <Button content="상세보기" link="/purpose" more />
      </Title>
      <div className={$.summary_box}>
        <Flex between>
          {summaryList.map((data) => (
            <TodaySummary name={data.name} value={data.value} unit={data.unit} key={data.id} />
          ))}
        </Flex>
      </div>

      <Title content="기록" kinds="sub" />
      <div className={$.record_box}>
        <Flex wrap column>
          {recordList.map((data) => (
            <TodayRecord
              name={data.name}
              value={data.value}
              calorie={data.calorie}
              image={data.image}
              food={data.food}
              key={data.id}
            />
          ))}
        </Flex>
      </div>
    </Wrapper>
  )
}
