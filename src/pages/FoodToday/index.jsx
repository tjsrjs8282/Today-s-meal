import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import $ from './foodToday.module.scss'
import '@styles/calendar.scss'
import Wrapper from '@components/Wrapper'
import Header from '@components/Header'
import HaederTitle from '@components/HeaderTitle'
import IconButton from '@components/IconButton'
import Flex from '@components/Flex'
import Title from '@components/Title'
import Button from '@components/Button'
import Calendar from 'react-calendar'
import moment from 'moment'
import FoodTodaySummary from './FoodTodaySummary'
import FoodTodayRecord from './FoodTodayRecord'
import FloatMenu from '@components/FloatMenu'
import dayjs from 'dayjs'
import { FOOD_TODAY_SUMMARY } from './FoodTodaySummary/constants'
import { FOOD_TODAY_RECORD } from './FoodTodayRecord/constants'
import { themeState } from '@store'
import { useRecoilState } from 'recoil'

export default function FoodToday() {
  const [theme, setTheme] = useRecoilState(themeState)
  const [date, onDate] = useState(new Date())
  let [calendarOpen, setCalendarOpen] = useState(false)
  const modalRaf = useRef()
  const navigate = useNavigate()

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

  const handleChangeTheme = useCallback(() => {
    if (theme === 'DARK') {
      localStorage.setItem('THEME', 'LIGHT')
      document.documentElement.setAttribute('data-theme', 'LIGHT')
      setTheme('LIGHT')
      return
    }
    localStorage.setItem('THEME', 'DARK')
    document.documentElement.setAttribute('data-theme', 'DARK')
    setTheme('DARK')
  }, [theme])

  console.log(theme)

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
        <button onClick={handleChangeTheme}>dddddddddd</button>
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
            const { name, value, calorie, image, darkImage, food, id } = record

            return (
              <FoodTodayRecord
                name={name}
                value={value}
                calorie={calorie}
                image={theme === 'LIGHT' ? image : darkImage}
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
