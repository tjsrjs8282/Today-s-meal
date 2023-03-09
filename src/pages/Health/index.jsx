import React, { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import $ from './health.module.scss'
import Wrapper from '@components/Wrapper'
import Flex from '@components/Flex'
import Title from '@components/Title'
import Header from '@components/Header'
import HaederTitle from '@components/HeaderTitle'
import IconButton from '@components/IconButton'
import Button from '@components/Button'
import FloatMenu from '@components/FloatMenu'
import Calendar from 'react-calendar'
import Modal from '@components/Modal'
import dayjs from 'dayjs'
import HealthAddmodal from './HealthAddmodal'
import HealthWeatherInfoBox from './HealthWeatherInfoBox'
import { weatherInstance } from '@api/axiosInstance'
import logoBg from '@assets/ic-logo-bg.png'
import { dateState } from '@store'
import { useRecoilState } from 'recoil'
import { localStorageService } from '@utils/localStorage.service'

export default function Health() {
  const navigate = useNavigate()
  const [dateRecoil, setDateRecoil] = useRecoilState(dateState)
  const [weatherData, setWeatherData] = useState(null)
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [todayHealth, setTodayHealth] = useState([{}])
  const [healthList, setHealthList] = useState([{}])
  const [todayMark, setTodayMark] = useState([])
  const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_KEY
  const [inputs, setInputs] = useState({
    id: new Date().getTime(),
    date: '',
    healthName: '',
    healthCount: '',
    healthWeight: '',
    healthSet: 1,
    healthMinute: '',
    healthSecond: '',
  })
  const [removeId, setRemoveId] = useState(0)
  const { healthName, healthCount, healthWeight, healthSet, healthMinute, healthSecond } = inputs
  const [modalRemove, setModalRemove] = useState(false)
  const [modal, setModal] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [modalContent, setModalContent] = useState('')
  const sessionHealthTotal = localStorageService().get('HEALTH_TOTAL')
  const WEEKS = ['일', '월', '화', '수', '목', '금', '토']
  const healthDate = dayjs(dateRecoil).format(`MM월 DD일 ${WEEKS[dayjs(dateRecoil).get('d')]}요일`)

  const openCalendarHandler = () => {
    setCalendarOpen(!calendarOpen)
  }

  const onClickDayHandler = (date) => {
    setDateRecoil(date)
    setCalendarOpen(!calendarOpen)
  }

  const onClickModalHandler = (name) => {
    setModalTitle(`운동추가`)
    setModal(!modal)
  }

  const onClickRemoveHandler = (name, id) => {
    setModalTitle(`운동리스트 삭제`)
    setModalContent(`${name} 를(을) 삭제 하시겠습니까?`)
    setRemoveId(id)
    setModalRemove(!modalRemove)
  }

  const modalRemoveOnClick = () => {
    const removefilter = sessionHealthTotal.filter((data) => data.id !== removeId)
    localStorageService().set('HEALTH_TOTAL', removefilter)
    setModalRemove(false)
  }

  const modalOnClick = () => {
    const sesstionHealth = localStorageService().get('HEALTH_TOTAL')
    if (sesstionHealth) {
      sesstionHealth.push({ ...inputs, date: healthDate, id: new Date().getTime() })
      localStorageService().set('HEALTH_TOTAL', sesstionHealth)
    } else {
      localStorageService().set('HEALTH_TOTAL', [
        { ...inputs, date: healthDate, id: new Date().getTime() },
      ])
    }
    setHealthList({ ...inputs, date: healthDate, id: new Date().getTime() })
    setModal(false)
  }

  const modalOnClose = () => {
    setModal(false)
    setModalRemove(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    const result = name !== 'healthName' ? value.replace(/\D/g, '') : value
    setInputs({ ...inputs, [name]: result })
  }

  const handleInputReset = (e) => {
    setInputs({ ...inputs, healthName: '' })
  }

  const handleCountCalculation = (count) => {
    setInputs({ ...inputs, [`healthSet`]: count })
  }

  const onGeoOk = (poistion) => {
    const lat = poistion.coords.latitude
    const lng = poistion.coords.longitude
    getWeather(lat, lng)
  }

  const onGeoError = () => {
    console.log('위치를 찾지 못했습니다.')
  }

  const getWeather = async (lat, lng) => {
    const response = await weatherInstance(
      `/weather?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}`
    )
    setWeatherData(response.data)
  }

  function healthTodayFilter() {
    const healthDateFilter = sessionHealthTotal
      ? sessionHealthTotal.filter((data) => data.date === healthDate)
      : []
    const healthDateMark = sessionHealthTotal ? sessionHealthTotal.map((data) => data.date) : []
    setTodayMark([...new Set(healthDateMark)])
    console.log(sessionHealthTotal)
    setTodayHealth(healthDateFilter)
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError)
  }, [])

  useEffect(() => {
    healthTodayFilter()
  }, [dateRecoil, modal, modalRemove])

  return (
    <Wrapper colorGray>
      {modalRemove && (
        <Modal
          title={modalTitle}
          content={modalContent}
          onClick={modalRemoveOnClick}
          onClose={modalOnClose}
          confirm
        ></Modal>
      )}
      {modal && (
        <HealthAddmodal
          title={modalTitle}
          content={modalContent}
          onClick={modalOnClick}
          onClose={modalOnClose}
          healthName={healthName}
          healthCount={healthCount}
          healthWeight={healthWeight}
          healthSet={healthSet}
          minute={healthMinute}
          second={healthSecond}
          handleCountCalculation={handleCountCalculation}
          onChange={handleInputChange}
          handleInputChange={handleInputChange}
          handleInputReset={handleInputReset}
        ></HealthAddmodal>
      )}
      <Header>
        <Flex width between>
          <HaederTitle content="운동일지 " />
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
      {weatherData && <HealthWeatherInfoBox data={weatherData} />}
      <Title content={'오늘의 운동'} sub>
        <Button content={'추가하기'} none onClick={onClickModalHandler} />
      </Title>
      {todayHealth.length === 0 ? (
        <ul className={$.health_list}>
          <li className={$.empty_list}>
            <img src={logoBg} alt="빈 접시" />
          </li>
        </ul>
      ) : (
        todayHealth.map((health) => {
          const {
            healthCount,
            healthMinute,
            healthSecond,
            healthName,
            healthSet,
            healthWeight,
            id,
          } = health
          return (
            <Flex width shadow between marginBottom padding radius colorWhite fontBlack>
              <Flex column start>
                <h3>{healthName}</h3>
                <p>
                  {healthCount && <span>{`${healthCount}회`}</span>}
                  {healthWeight && <span>{`${healthWeight}kg`}</span>}
                  {healthSet && <span>{`${healthSet}세트`}</span>}
                  {healthMinute && <span>{`${healthMinute}분`}</span>}
                  {healthSecond && <span>{`${healthSecond}초`}</span>}
                </p>
              </Flex>
              <IconButton kinds="close2" onClick={() => onClickRemoveHandler(healthName, id)} />
            </Flex>
          )
        })
      )}
      <FloatMenu />
    </Wrapper>
  )
}
