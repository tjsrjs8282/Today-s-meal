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
import Modal from '@components/Modal'
import { FOOD_TODAY_SUMMARY } from './FoodTodaySummary/constants'
import { FOOD_TODAY_RECORD } from './FoodTodayRecord/constants'
import { themeState, dateState, partState } from '@store'
import { useRecoilState } from 'recoil'
import { localStorageService } from '@utils/localStorage.service'

export default function FoodToday() {
  const [theme, setTheme] = useRecoilState(themeState)
  const [dateRecoil, setDateRecoil] = useRecoilState(dateState)
  const [partRecoil, setPartRecoil] = useRecoilState(partState)
  // const [foodPart, setFoodPart] = useState('TOTAL')
  const [todayFoods, setTodayFoods] = useState([{}])

  const [todayBreakfast, setTodayBreakfast] = useState([{}])
  const [todayLunch, setTodayLunch] = useState([{}])
  const [todayDinner, setTodayDinner] = useState([{}])
  const [todaySnack, setTodaySnack] = useState([{}])

  const [todayTotal, setTodayTotal] = useState([0, 0, 0, 0])
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
  const sessionDateTotal = localStorageService().get('DATETOTAL')

  // let todayFoodList = sessionFoods

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
    setRemoveId(id)
    setModal(!modal)
  }

  const modalOnClick = () => {
    const removefilter = sessionFoods.filter((data) => data.id !== removeId)
    localStorageService().set('FOODS', removefilter)
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

  //console.log(dateRecoil)

  // async function sessionFoodsPartFilter() {
  //   const partFoodArray = []
  //   const foodTotalArray = []

  //   for (let i = 1; i < foodPartList.length; i++) {
  //     const partFilter = todayFoodList.filter((data) => data.part === foodPartList[i])
  //     partFoodArray.push(partFilter)
  //   }
  //   for (let i = 0; i < foodTotal.length; i++) {
  //     const totalFilterss = todayFoodList.filter((data) => data.part === foodPart)
  //     const totalFilter =
  //       foodPart === '전체'
  //         ? todayFoodList
  //             .map((data) => data[foodTotal[i]])
  //             .reduce((acc, cur) => Number(acc) + Number(cur), 0)
  //         : totalFilterss
  //             .map((data) => data[foodTotal[i]])
  //             .reduce((acc, cur) => Number(acc) + Number(cur), 0)
  //     foodTotalArray.push(Math.round(totalFilter))
  //     //
  //   }
  //   partFoodArray.unshift(todayFoodList)
  //   setTodayFoods(partFoodArray)
  //   setTodayTotal(foodTotalArray)
  // }
  function dd() {
    const sessionFoodPart = localStorageService().get(partRecoil)
    setTodayBreakfast(localStorageService().get('아침'))
    setTodayLunch(localStorageService().get('점심'))
    setTodayDinner(localStorageService().get('저녁'))
    setTodaySnack(localStorageService().get('간식'))
    if (sessionFoodPart) {
      const foodDateFilter = sessionFoodPart.filter((data) => data.date === foodDate)
      setTodayFoods(foodDateFilter)
    }
    setTodayFoods(sessionFoodPart)
  }
  useEffect(() => {
    dd()
  }, [partRecoil])
  console.log(partRecoil)
  console.log(todayFoods)

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
                sessionDateTotal.find(
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
          <FoodTodayRecord
            name={partRecoil}
            image={theme === 'LIGHT' ? '아침' : '아침'}
            onClick={() => goFoodSearch(partRecoil)}
            data={todayFoods}
          />
        </Flex>
      </div>
      <FloatMenu />
    </Wrapper>
  )
}
