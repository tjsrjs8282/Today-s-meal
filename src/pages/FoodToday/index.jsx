import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import $ from './foodToday.module.scss'
import Wrapper from '@components/Wrapper'
import Header from '@components/Header'
import HaederTitle from '@components/HeaderTitle'
import IconButton from '@components/IconButton'
import Flex from '@components/Flex'
import Title from '@components/Title'
import Button from '@components/Button'
import Calendar from 'react-calendar'
import FoodTodayRecord from './FoodTodayRecord'
import FoodTodaySummary from './FoodTodaySummary'
import FloatMenu from '@components/FloatMenu'
import RadioGroup from '@components/RadioGroup'
import Radio from '@components/Radio'
import dayjs from 'dayjs'
import Modal from '@components/Modal'
import { themeState, dateState, partState } from '@store'
import { useRecoilState } from 'recoil'
import { localStorageService } from '@utils/localStorage.service'

export default function FoodToday() {
  const navigate = useNavigate()
  const [theme, setTheme] = useRecoilState(themeState)
  const [dateRecoil, setDateRecoil] = useRecoilState(dateState)
  const [partRecoil, setPartRecoil] = useRecoilState(partState)
  const [todayFoods, setTodayFoods] = useState([])
  const [todayBreakfast, setTodayBreakfast] = useState([])
  const [todayLunch, setTodayLunch] = useState([])
  const [todayDinner, setTodayDinner] = useState([])
  const [todaySnack, setTodaySnack] = useState([])
  const [todayMark, setTodayMark] = useState([])
  const [todayServingTotal, setTodayServingTotal] = useState([
    { name: '탄수화물', value: 0, unit: 'g' },
    { name: '단백질', value: 0, unit: 'g' },
    { name: '지방', value: 0, unit: 'g' },
    { name: '칼로리', value: 0, unit: 'kal' },
  ])
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [removeId, setRemoveId] = useState(0)
  const [modal, setModal] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [modalContent, setModalContent] = useState('')

  const sessionFoodTotal = localStorageService().get('FOOD_TOTAL')
  const WEEKS = ['일', '월', '화', '수', '목', '금', '토']
  const FOOD_SERVING = ['carbohydrate', 'protein', 'fat', 'calories']
  const FOOD_PART = ['전체', '아침', '점심', '저녁', '간식']
  const foodDate = dayjs(dateRecoil).format(`MM월 DD일 ${WEEKS[dayjs(dateRecoil).get('d')]}요일`)
  const FOOD_TOALDATA = [
    { name: '아침', data: todayBreakfast },
    { name: '점심', data: todayLunch },
    { name: '저녁', data: todayDinner },
    { name: '간식', data: todaySnack },
  ]

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

  const onClickPartHandler = (name) => {
    setPartRecoil(name)
    localStorageService().set('PART', name)
  }

  const onClickDayHandler = (date) => {
    setDateRecoil(date)
    setCalendarOpen(!calendarOpen)
  }
  const onClickModalHandler = (name, id) => {
    setModalTitle(`음식 삭제`)
    setModalContent(`${name} 를(을) 삭제 하시겠습니까?`)
    setRemoveId(id)
    console.log(removeId)
    setModal(!modal)
  }

  const modalOnClick = () => {
    const removefilter = sessionFoodTotal.filter((data) => data.id !== removeId)
    localStorageService().set('FOOD_TOTAL', removefilter)
    setModal(false)
  }
  const modalOnClose = () => {
    setModal(false)
  }

  async function foodTodayFilter() {
    const foodDateFilter = sessionFoodTotal
      ? sessionFoodTotal.filter((data) => data.date === foodDate)
      : []

    const foodPartFilter = foodDateFilter.filter((data) => data.part === partRecoil)
    const foodBreakfastFilter = foodDateFilter.filter((data) => data.part === '아침')
    const foodLunchFilter = foodDateFilter.filter((data) => data.part === '점심')
    const foodDinnerFilter = foodDateFilter.filter((data) => data.part === '저녁')
    const foodSnackFilter = foodDateFilter.filter((data) => data.part === '간식')
    const foodDateMark = sessionFoodTotal ? sessionFoodTotal.map((data) => data.date) : []

    let servingTotalFilter
    for (let i = 0; i < FOOD_SERVING.length; i++) {
      const servingPart = partRecoil === '전체' ? foodDateFilter : foodPartFilter
      const servingTotal = servingPart
        .map((data) => data[FOOD_SERVING[i]])
        .reduce((acc, cur) => Number(acc) + Number(cur), 0)
      servingTotalFilter = todayServingTotal.map((item) => ({
        ...item,
        value: Math.round(servingTotal),
      }))
    }
    setTodayMark([...new Set(foodDateMark)])
    setTodayServingTotal(servingTotalFilter)
    setTodayBreakfast(foodBreakfastFilter)
    setTodayLunch(foodLunchFilter)
    setTodayDinner(foodDinnerFilter)
    setTodaySnack(foodSnackFilter)
    setTodayFoods(foodPartFilter)
  }

  useEffect(() => {
    foodTodayFilter()
  }, [partRecoil, dateRecoil, modal])

  useEffect(() => {
    localStorageService().set('PART', '전체')
    setPartRecoil('전체')
  }, [])

  return (
    <Wrapper colorGray>
      {modal && (
        <Modal
          title={modalTitle}
          content={modalContent}
          onClick={modalOnClick}
          onClose={modalOnClose}
          confirm
        ></Modal>
      )}
      <Header>
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
                todayMark.find(
                  (x) => x === dayjs(date).format(`MM월 DD일 ${WEEKS[dayjs(date).get('d')]}요일`)
                )
              ) {
                return 'highlight'
              }
            }}
          />
        )}
      </Header>

      <div className={$.radio_box}>
        <RadioGroup label="part" value={partRecoil} onChange={setPartRecoil}>
          {FOOD_PART.map((part, index) => {
            return (
              <Radio
                name="part"
                value={part}
                key={index}
                onClick={() => onClickPartHandler(part)}
                tab
              >
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
          {todayServingTotal.map((data) => {
            const { name, value, unit } = data
            return <FoodTodaySummary key={name} name={name} value={value} unit={unit} />
          })}
        </Flex>
      </div>

      <Title content="기록" sub />

      <div className={$.record_box}>
        {partRecoil === '전체' ? (
          FOOD_TOALDATA.map((foods) => {
            const { name, data } = foods
            return (
              <FoodTodayRecord
                key={name}
                name={name}
                image={theme === 'DARK' ? `다크${name}` : name}
                onClick={() => goFoodSearch(name)}
                data={data}
                onClickModalHandler={onClickModalHandler}
              />
            )
          })
        ) : (
          <Flex wrap column>
            <FoodTodayRecord
              key={partRecoil}
              name={partRecoil}
              image={theme === 'DARK' ? `다크${partRecoil}` : partRecoil}
              onClick={() => goFoodSearch(partRecoil)}
              data={todayFoods}
              onClickModalHandler={onClickModalHandler}
            />
          </Flex>
        )}
      </div>
      <FloatMenu />
    </Wrapper>
  )
}
