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

import Morning from '@assets/ic-morning-normal.png'
import Lunch from '@assets/ic-lunch-normal.png'
import Dinner from '@assets/ic-dinner-normal.png'
import Snack from '@assets/ic-snack-normal.png'
import DarkMorning from '@assets/ic-morning-white.png'
import DarkLunch from '@assets/ic-lunch-white.png'
import DarkDinner from '@assets/ic-dinner-white.png'
import DarkSnack from '@assets/ic-snack-white.png'
import dayjs from 'dayjs'
import { FOOD_TODAY_SUMMARY } from './FoodTodaySummary/constants'
import { FOOD_TODAY_RECORD } from './FoodTodayRecord/constants'
import { themeState, dateState, partState } from '@store'
import { useRecoilState } from 'recoil'
import { localStorageService } from '@utils/localStorage.service'

export default function FoodToday() {
  const [theme, setTheme] = useRecoilState(themeState)
  const [dateRecoil, setDateRecoil] = useRecoilState(dateState)
  const [partRecoil, setPartRecoil] = useRecoilState(partState)
  const [todayFoods, setTodayFoods] = useState([
    [
      {
        calories: 0,
        carbohydrate: 0,
        date: 'Loding...',
        fat: 0,
        name: 'Loding...',
        part: 'Loding...',
        protein: 0,
      },
    ],
    [
      {
        calories: 0,
        carbohydrate: 0,
        date: 'Loding...',
        fat: 0,
        name: 'Loding...',
        part: 'Loding...',
        protein: 0,
      },
    ],
    [
      {
        calories: 0,
        carbohydrate: 0,
        date: 'Loding...',
        fat: 0,
        name: 'Loding...',
        part: 'Loding...',
        protein: 0,
      },
    ],
    [
      {
        calories: 0,
        carbohydrate: 0,
        date: 'Loding...',
        fat: 0,
        name: 'Loding...',
        part: 'Loding...',
        protein: 0,
      },
    ],
  ])
  let [calendarOpen, setCalendarOpen] = useState(false)
  const modalRaf = useRef()
  const navigate = useNavigate()
  const sessionFoods = localStorageService().get('FOODS')
  const weeks = ['일', '월', '화', '수', '목', '금', '토']
  const foodPart = ['아침 식사', '점심 식사', '저녁 식사', '간식']
  const foodDate = dayjs(dateRecoil).format(`MM월 DD일 ${weeks[dayjs(dateRecoil).get('d')]}요일`)
  let todayFoodMark = sessionFoods.map((data) => data.date)

  const goFoodSearch = (name) => {
    setPartRecoil(name)
    localStorageService().set('PART', name)
    navigate('/search')
  }
  const goFoodDetail = () => {
    navigate('detail')
  }

  const openCalendarHandler = () => {
    setCalendarOpen(!calendarOpen)
  }

  const onClickDayHandler = (date) => {
    setDateRecoil(date)
    setCalendarOpen(!calendarOpen)
  }

  const handleChangeTheme = useCallback(() => {
    if (theme === 'DARK') {
      localStorageService().set('THEME', 'LIGHT')
      document.documentElement.setAttribute('data-theme', 'LIGHT')
      setTheme('LIGHT')
      return
    }
    localStorageService().set('THEME', 'DARK')
    document.documentElement.setAttribute('data-theme', 'DARK')
    setTheme('DARK')
  }, [theme])

  async function sessionFoodsPartFilter() {
    let partFoodArray = []

    let todayFoodList = await sessionFoods.filter((data) => data.date === foodDate)

    for (let i = 0; i < foodPart.length; i++) {
      let partFilter = todayFoodList.filter((data) => data.part === foodPart[i])
      partFoodArray.push(partFilter)
      setTodayFoods(partFoodArray)
    }
  }

  useEffect(() => {
    sessionFoodsPartFilter()
  }, [dateRecoil])

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
            onChange={setDateRecoil}
            value={dateRecoil}
            onClickDay={(date) => onClickDayHandler(date)}
            onFocus={() => {
              setCalendarOpen(true)
            }}
            tileClassName={({ date }) => {
              if (
                todayFoodMark.find(
                  (x) => x === dayjs(date).format(`MM월 DD일 ${weeks[dayjs(date).get('d')]}요일`)
                )
              ) {
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
          {/* {FOOD_TODAY_RECORD.map((record) => {
            const { name, value, calorie, image, darkImage, food, id } = record

            return (
              <FoodTodayRecord
                name={name}
                value={value}
                calorie={calorie}
                image={theme === 'LIGHT' ? image : darkImage}
                food={food}
                onClick={() => goFoodSearch(name)}
                key={id}
              />
            )
          })} */}

          <Flex width colorWhite radius padding marginBottom column shadow>
            <Flex between width marginBottom>
              <Flex>
                <img src={theme === `LIGHT` ? Morning : DarkMorning} alt="아침 식사" />
                <Flex column start>
                  <h2>아침 식사</h2>
                  <p>총 개수 : 1 개 | 총 칼로리 : 1 kcal</p>
                </Flex>
              </Flex>
              <IconButton kinds="add" onClick={() => goFoodSearch('아침 식사')} />
            </Flex>
            {todayFoods[0].map((foods) => {
              return (
                <Flex colorGray width radius padding marginBottom>
                  <Flex column gray start width>
                    <h3>{foods.name}</h3>
                    <p>
                      갯수 : 1 개 | 사이즈 : slice
                      <br />
                      칼로리 : {foods.calories} kcal | 탄수화물 : {foods.carbohydrate} g<br />
                      단백질 : {foods.protein} g | 지방 : {foods.calories} kcal
                    </p>
                  </Flex>
                  <IconButton kinds="close2" />
                </Flex>
              )
            })}
          </Flex>

          <Flex width colorWhite radius padding marginBottom column shadow>
            <Flex between width marginBottom>
              <Flex>
                <img src={theme === `LIGHT` ? Lunch : DarkLunch} alt="점심 식사" />
                <Flex column start>
                  <h2>점심 식사</h2>
                  <p>총 개수 : 1 개 | 총 칼로리 : 1 kcal</p>
                </Flex>
              </Flex>
              <IconButton kinds="add" onClick={() => goFoodSearch('점심 식사')} />
            </Flex>
            {todayFoods[1].map((foods) => {
              return (
                <Flex colorGray width radius padding marginBottom>
                  <Flex column gray start width>
                    <h3>{foods.name}</h3>
                    <p>
                      갯수 : 1 개 | 사이즈 : slice
                      <br />
                      칼로리 : {foods.calories} kcal | 탄수화물 : {foods.carbohydrate} g<br />
                      단백질 : {foods.protein} g | 지방 : {foods.calories} kcal
                    </p>
                  </Flex>
                  <IconButton kinds="close2" />
                </Flex>
              )
            })}
          </Flex>

          <Flex width colorWhite radius padding marginBottom column shadow>
            <Flex between width marginBottom>
              <Flex>
                <img src={theme === `LIGHT` ? Dinner : DarkDinner} alt="저녁 식사" />
                <Flex column start>
                  <h2>저녁 식사</h2>
                  <p>총 개수 : 1 개 | 총 칼로리 : 1 kcal</p>
                </Flex>
              </Flex>
              <IconButton kinds="add" onClick={() => goFoodSearch('저녁 식사')} />
            </Flex>
            {todayFoods[2].map((foods) => {
              return (
                <Flex colorGray width radius padding marginBottom>
                  <Flex column gray start width>
                    <h3>{foods.name}</h3>
                    <p>
                      갯수 : 1 개 | 사이즈 : slice
                      <br />
                      칼로리 : {foods.calories} kcal | 탄수화물 : {foods.carbohydrate} g<br />
                      단백질 : {foods.protein} g | 지방 : {foods.calories} kcal
                    </p>
                  </Flex>
                  <IconButton kinds="close2" />
                </Flex>
              )
            })}
          </Flex>

          <Flex width colorWhite radius padding marginBottom column shadow>
            <Flex between width marginBottom>
              <Flex>
                <img src={theme === `LIGHT` ? Snack : DarkSnack} alt="간식" />
                <Flex column start>
                  <h2>간식</h2>
                  <p>총 개수 : 1 개 | 총 칼로리 : 1 kcal</p>
                </Flex>
              </Flex>
              <IconButton kinds="add" onClick={() => goFoodSearch('간식')} />
            </Flex>
            {todayFoods[3].map((foods) => {
              return (
                <Flex colorGray width radius padding marginBottom>
                  <Flex column gray start width>
                    <h3>{foods.name}</h3>
                    <p>
                      갯수 : 1 개 | 사이즈 : slice
                      <br />
                      칼로리 : {foods.calories} kcal | 탄수화물 : {foods.carbohydrate} g<br />
                      단백질 : {foods.protein} g | 지방 : {foods.calories} kcal
                    </p>
                  </Flex>
                  <IconButton kinds="close2" />
                </Flex>
              )
            })}
          </Flex>
        </Flex>
      </div>
      <FloatMenu />
    </Wrapper>
  )
}
