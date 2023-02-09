import React, { useState, useRef, useEffect, useContext } from 'react'
import $ from './foodToday.module.scss'
import '@styles/calendar.scss'
import { useNavigate } from 'react-router-dom'
import Wrapper from '@components/Wrapper'
import Header from '@components/Header'
import HaederTitle from '@components/HeaderTitle'
import IconButton from '@components/IconButton'
import Flex from '@components/Flex'
import Title from '@components/Title'
import Button from '@components/Button'
import Calendar from 'react-calendar'
import moment from 'moment'
import { FOOD_TODAY_SUMMARY } from './FoodTodaySummary/constants'
import { FOOD_TODAY_RECORD } from './FoodTodayRecord/constants'
import FoodTodaySummary from './FoodTodaySummary'
import FoodTodayRecord from './FoodTodayRecord'
import FloatMenu from '@components/FloatMenu'
import dayjs from 'dayjs'
import { ThemeDispatchContext } from '../../App'
export default function FoodToday() {
  const themeDispatch = useContext(ThemeDispatchContext)
  const [date, onDate] = useState(new Date())
  let [calendarOpen, setCalendarOpen] = useState(false)
  const modalRaf = useRef()
  const navigate = useNavigate()
  console.log

  const marks = ['15-01-2023', '03-01-2023', '07-01-2023', '12-02-2023', '13-02-2023', '15-02-2023']

  const goFoodSearch = () => {
    navigate('/search')
  }
  const goFoodDetail = () => {
    navigate('detail')
  }

  const openCalendarHandler = () => {
    setCalendarOpen(!calendarOpen)
  }

  useEffect(() => {
    const clickOutside = (e) => {
      // 모달이 열려 있고 모달의 바깥쪽을 눌렀을 때 창 닫기
      if (calendarOpen && modalRaf.current && !modalRaf.current.contains(e.target)) {
        setCalendarOpen(false)
      }
    }

    document.addEventListener('mousedown', clickOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', clickOutside)
    }
  }, [calendarOpen])

  return (
    <Wrapper colorGray thisRef={modalRaf}>
      <Header>
        <button onClick={() => themeDispatch({ type: 'TOGGLE' })}>dddddddddd</button>
        <Flex width between>
          <HaederTitle content="오늘의 식단" />
          <IconButton kinds="calendar" onClick={openCalendarHandler} />
        </Flex>
        {calendarOpen && (
          <Calendar
            onChange={onDate}
            value={date}
            onFocus={() => {
              setCalendarOpen(true)
            }}
            tileClassName={({ date, view }) => {
              if (marks.find((x) => x === moment(date).format('DD-MM-YYYY'))) {
                return 'highlight'
              }
            }}
          />
        )}
      </Header>

      <Title content="요약" sub>
        <Button content="상세보기" none onClick={goFoodDetail} />
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
      <FloatMenu />
    </Wrapper>
  )
}
