import React, { useState, useEffect, useCallback } from 'react'
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
  const [theme, setTheme] = useRecoilState(themeState)
  const [dateRecoil, setDateRecoil] = useRecoilState(dateState)
  const [partRecoil, setPartRecoil] = useRecoilState(partState)

  const [todayFoods, setTodayFoods] = useState([])
  const [todayBreakfast, setTodayBreakfast] = useState([])
  const [todayLunch, setTodayLunch] = useState([])
  const [todayDinner, setTodayDinner] = useState([])
  const [todaySnack, setTodaySnack] = useState([])
  const [todayMark, setTodayMark] = useState([])
  const [todayServingTotal, setTodayServingTotal] = useState([0, 0, 0, 0])

  const [calendarOpen, setCalendarOpen] = useState(false)
  const [removeId, setRemoveId] = useState(0)
  const [modal, setModal] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [modalContent, setModalContent] = useState('')

  const navigate = useNavigate()

  const weeks = ['일', '월', '화', '수', '목', '금', '토']
  const foodTotal = ['carbohydrate', 'protein', 'fat', 'calories']
  const foodPartList = ['전체', '아침', '점심', '저녁', '간식']
  const foodDate = dayjs(dateRecoil).format(`MM월 DD일 ${weeks[dayjs(dateRecoil).get('d')]}요일`)

  const sessionFoodTotal = localStorageService().get('FOODTOTAL')

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
  const onClickModalHandler = (name, id) => {
    setModalTitle(`음식 삭제`)
    setModalContent(`${name} 를(을) 삭제 하시겠습니까?`)
    console.log(id)
    setRemoveId(id)
    setModal(!modal)
  }

  const modalOnClick = () => {
    const removefilter = todayFoods.filter((data) => data.id !== removeId)
    localStorageService().set(partRecoil, removefilter)
    setModal(false)
  }
  const modalOnClose = () => {
    setModal(false)
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

  async function foodTodayFilter() {
    let foodDateFilter
    sessionFoodTotal
      ? (foodDateFilter = sessionFoodTotal.filter((data) => data.date === foodDate))
      : (foodDateFilter = sessionFoodTotal)

    const foodPartFilter = foodDateFilter.filter((data) => data.part === partRecoil)
    const foodBreakfastFilter = foodDateFilter.filter((data) => data.part === '아침')
    const foodLunchFilter = foodDateFilter.filter((data) => data.part === '점심')
    const foodDinnerFilter = foodDateFilter.filter((data) => data.part === '저녁')
    const foodSnackFilter = foodDateFilter.filter((data) => data.part === '간식')

    const foodDateMark = sessionFoodTotal.map((data) => data.date)

    const foodTotalArray = []
    for (let i = 0; i < foodTotal.length; i++) {
      if (partRecoil === '전체') {
        const servingTotal = foodDateFilter
          .map((data) => data[foodTotal[i]])
          .reduce((acc, cur) => Number(acc) + Number(cur), 0)
        foodTotalArray.push(Math.round(servingTotal))
      } else {
        const servingTotal = foodPartFilter
          .map((data) => data[foodTotal[i]])
          .reduce((acc, cur) => Number(acc) + Number(cur), 0)
        foodTotalArray.push(Math.round(servingTotal))
      }
    }
    setTodayMark([...new Set(foodDateMark)])
    setTodayServingTotal(foodTotalArray)
    setTodayBreakfast(foodBreakfastFilter)
    setTodayLunch(foodLunchFilter)
    setTodayDinner(foodDinnerFilter)
    setTodaySnack(foodSnackFilter)
    setTodayFoods(foodPartFilter)
  }

  useEffect(() => {
    foodTodayFilter()
  }, [partRecoil, dateRecoil])

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
                todayMark.find(
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
        <RadioGroup label="part" value={partRecoil} onChange={setPartRecoil}>
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
          <FoodTodaySummary name={'탄수화물'} value={todayServingTotal[0]} unit={'g'} />
          <FoodTodaySummary name={'단백질'} value={todayServingTotal[1]} unit={'g'} />
          <FoodTodaySummary name={'지방'} value={todayServingTotal[2]} unit={'g'} />
          <FoodTodaySummary name={'칼로리'} value={todayServingTotal[3]} unit={'kal'} />
        </Flex>
      </div>

      <Title content="기록" sub />

      <div className={$.record_box}>
        {partRecoil === '전체' ? (
          <Flex wrap column>
            <FoodTodayRecord
              name={'아침'}
              onClick={() => goFoodSearch('아침')}
              data={todayBreakfast}
            />
            <FoodTodayRecord name={'점심'} onClick={() => goFoodSearch('점심')} data={todayLunch} />
            <FoodTodayRecord
              name={'저녁'}
              onClick={() => goFoodSearch('저녁')}
              data={todayDinner}
            />
            <FoodTodayRecord name={'간식'} onClick={() => goFoodSearch('간식')} data={todaySnack} />
          </Flex>
        ) : (
          <Flex wrap column>
            <FoodTodayRecord
              name={partRecoil}
              onClick={() => goFoodSearch(partRecoil)}
              data={todayFoods}
              onefef={() => onClickModalHandler()}
            />
          </Flex>
        )}
      </div>
      <FloatMenu />
    </Wrapper>
  )
}
