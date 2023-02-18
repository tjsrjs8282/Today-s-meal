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
import RadioGroup from '@components/RadioGroup'
import Radio from '@components/Radio'

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
  const [foodPart, setFoodPart] = useState('전체')
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
  const [todayTotal, setTodayTotal] = useState([0, 0, 0, 0])
  let [calendarOpen, setCalendarOpen] = useState(false)
  const modalRaf = useRef()
  const navigate = useNavigate()

  const weeks = ['일', '월', '화', '수', '목', '금', '토']
  const foodTotal = ['carbohydrate', 'protein', 'fat', 'calories']
  const foodPartList = ['전체', '아침 식사', '점심 식사', '저녁 식사', '간식']
  const foodDate = dayjs(dateRecoil).format(`MM월 DD일 ${weeks[dayjs(dateRecoil).get('d')]}요일`)
  const sessionFoods = localStorageService().get('FOODS')
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
    const partFoodArray = []
    const foodTotalArray = []

    const todayFoodList = await sessionFoods.filter((data) => data.date === foodDate)
    for (let i = 1; i < foodPartList.length; i++) {
      const partFilter = todayFoodList.filter((data) => data.part === foodPartList[i])
      partFoodArray.push(partFilter)
    }
    for (let i = 0; i < foodTotal.length; i++) {
      const totalFilterss = todayFoodList.filter((data) => data.part === foodPart)
      const totalFilter =
        foodPart === '전체'
          ? todayFoodList
              .map((data) => data[foodTotal[i]])
              .reduce((acc, cur) => Number(acc) + Number(cur), 0)
          : totalFilterss
              .map((data) => data[foodTotal[i]])
              .reduce((acc, cur) => Number(acc) + Number(cur), 0)
      foodTotalArray.push(totalFilter)
    }
    partFoodArray.unshift(todayFoodList)
    setTodayFoods(partFoodArray)
    setTodayTotal(foodTotalArray)
  }
  useEffect(() => {
    sessionFoodsPartFilter()
  }, [dateRecoil, foodPart])

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

      <div className={$.radio_box}>
        <RadioGroup label="part" value={foodPart} onChange={setFoodPart}>
          {foodPartList.map((part, index) => {
            return (
              <Radio name="part" value={part} key={index} tab>
                <p>{part}</p>
              </Radio>
            )
          })}
        </RadioGroup>
      </div>

      <div className={$.summary_title}>
        <Title content="요약" sub>
          <Button content="상세보기" none onClick={goFoodDetail} />
        </Title>
      </div>

      <div className={$.summary_box}>
        <Flex between>
          {/* {FOOD_TODAY_SUMMARY.map((summary) => {
            const { name, value, unit, id } = summary
            return <FoodTodaySummary name={name} value={value} unit={unit} key={id} />
          })} */}

          <Flex column>
            <h3>탄수화물</h3>
            <p>
              {todayTotal[0]}
              <span>g</span>
            </p>
          </Flex>
          <Flex column>
            <h3>단백질</h3>
            <p>
              {todayTotal[1]}
              <span>g</span>
            </p>
          </Flex>
          <Flex column>
            <h3>지방</h3>
            <p>
              {todayTotal[2]}
              <span>g</span>
            </p>
          </Flex>
          <Flex column>
            <h3>칼로리</h3>
            <p>
              {todayTotal[3]}
              <span>kcal</span>
            </p>
          </Flex>
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
          {foodPart === '전체' || foodPart == '아침 식사' ? (
            <Flex width colorWhite radius padding marginBottom column shadow>
              <Flex between width marginBottom>
                <Flex>
                  <img src={theme === `LIGHT` ? Morning : DarkMorning} alt="아침 식사" />
                  <Flex column start>
                    <h2>아침 식사</h2>
                    <p>총 개수 : {todayFoods[1].length} 개</p>
                  </Flex>
                </Flex>
                <IconButton kinds="add" onClick={() => goFoodSearch('아침 식사')} />
              </Flex>
              {todayFoods[1].map((foods) => {
                return (
                  <Flex colorGray width radius padding marginBottom>
                    <Flex column gray start width>
                      <h3>{foods.name}</h3>
                      <p>
                        개수 : 1 개 | 사이즈 : {foods.measurement}
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
          ) : null}

          {foodPart === '전체' || foodPart == '점심 식사' ? (
            <Flex width colorWhite radius padding marginBottom column shadow>
              <Flex between width marginBottom>
                <Flex>
                  <img src={theme === `LIGHT` ? Lunch : DarkLunch} alt="점심 식사" />
                  <Flex column start>
                    <h2>점심 식사</h2>
                    <p>총 개수 : {todayFoods[2].length}</p>
                  </Flex>
                </Flex>
                <IconButton kinds="add" onClick={() => goFoodSearch('점심 식사')} />
              </Flex>
              {todayFoods[2].map((foods) => {
                return (
                  <Flex colorGray width radius padding marginBottom>
                    <Flex column gray start width>
                      <h3>{foods.name}</h3>
                      <p>
                        개수 : 1 개 | 사이즈 : {foods.measurement}
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
          ) : null}

          {foodPart === '전체' || foodPart == '저녁 식사' ? (
            <Flex width colorWhite radius padding marginBottom column shadow>
              <Flex between width marginBottom>
                <Flex>
                  <img src={theme === `LIGHT` ? Dinner : DarkDinner} alt="저녁 식사" />
                  <Flex column start>
                    <h2>저녁 식사</h2>
                    <p>총 개수 : {todayFoods[3].length}</p>
                  </Flex>
                </Flex>
                <IconButton kinds="add" onClick={() => goFoodSearch('저녁 식사')} />
              </Flex>
              {todayFoods[3].map((foods) => {
                return (
                  <Flex colorGray width radius padding marginBottom>
                    <Flex column gray start width>
                      <h3>{foods.name}</h3>
                      <p>
                        개수 : 1 개 | 사이즈 : {foods.measurement}
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
          ) : null}
          {foodPart === '전체' || foodPart == '간식' ? (
            <Flex width colorWhite radius padding marginBottom column shadow>
              <Flex between width marginBottom>
                <Flex>
                  <img src={theme === `LIGHT` ? Snack : DarkSnack} alt="간식" />
                  <Flex column start>
                    <h2>간식</h2>
                    <p>총 개수 : {todayFoods[4].length} 개</p>
                  </Flex>
                </Flex>
                <IconButton kinds="add" onClick={() => goFoodSearch('간식')} />
              </Flex>
              {todayFoods[4].map((foods) => {
                return (
                  <Flex colorGray width radius padding marginBottom>
                    <Flex column gray start width>
                      <h3>{foods.name}</h3>
                      <p>
                        개수 : 1 개 | 사이즈 : {foods.measurement}
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
          ) : null}
        </Flex>
      </div>
      <FloatMenu />
    </Wrapper>
  )
}
