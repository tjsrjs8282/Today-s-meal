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
import Input from '@components/Input'
import CheckBox from '@components/CheckBox'
import FloatMenu from '@components/FloatMenu'
import Calendar from 'react-calendar'
import Modal from '@components/Modal'
import moment from 'moment'
// import axios from 'axios'
import HealthWeatherInfoBox from './HealthWeatherInfoBox'
import { weatherInstance } from '@api/axiosInstance'
import logoBg from '@assets/ic-logo-bg.png'
import { themeState, dateState, partState } from '@store'
import { useRecoilState } from 'recoil'
import { localStorageService } from '@utils/localStorage.service'

export default function Health() {
  const navigate = useNavigate()
  const [dateRecoil, setDateRecoil] = useRecoilState(dateState)
  const [weatherData, setWeatherData] = useState(null)
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [exerciseName, setExerciseName] = useState('')
  const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_KEY

  const [service, setService] = useState(false)
  const [marketing, setMarketing] = useState(false)

  const [modal, setModal] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [modalContent, setModalContent] = useState('')

  const WEEKS = ['일', '월', '화', '수', '목', '금', '토']
  const marks = ['15-01-2023', '03-01-2023', '07-01-2023', '12-02-2023', '13-02-2023', '15-02-2023']

  const openCalendarHandler = () => {
    setCalendarOpen(!calendarOpen)
  }

  const onClickDayHandler = (date) => {
    setDateRecoil(date)
    setCalendarOpen(!calendarOpen)
  }

  const onClickModalHandler = (name) => {
    setModalTitle(`운동추가`)
    //setModalContent(`${name} 를(을) 삭제 하시겠습니까?`)
    setModal(!modal)
  }

  const modalOnClick = () => {
    setModal(false)
  }

  const modalOnClose = () => {
    setModal(false)
  }

  const handleInputChange = useCallback((e) => {
    setExerciseName(e.target.value)
  }, [])

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

    /**
     const url = `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=b1881980ee6e26b7b5169e5eaec251e7&units=metric`
     fetch(url).then((response) => response.json()).then((data) => {
         console.log(data)
       });
     }
     */
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError)
  }, [])

  const goHealthAdd = () => {
    navigate('add')
  }

  return (
    <Wrapper colorGray>
      {modal && (
        <Modal
          title={modalTitle}
          content={modalContent}
          onClick={modalOnClick}
          onClose={modalOnClose}
          confirm
        >
          <Title content="운동명" sub />
          <Input
            type="text"
            placeholder="무슨 운동을 하셨나요?"
            name="exerciseName"
            title="운동명"
            value={exerciseName}
            onChange={handleInputChange}
            unit={
              exerciseName && (
                <IconButton
                  kinds={'closeCircle'}
                  onClick={() => {
                    setExerciseName('')
                  }}
                />
              )
            }
          />
          <Checkbox checked={service} onChange={setService}>
            (필수) 서비스 이용약관
          </Checkbox>
          <Checkbox checked={marketing} onChange={setMarketing}>
            (선택) 마케팅 수신
          </Checkbox>
        </Modal>
      )}
      <Header>
        <Flex width between>
          <HaederTitle content="운동일지 " />
          <div className={$.header_icon_btn}>
            <IconButton kinds="calendar" onClick={openCalendarHandler} />
          </div>
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
              if (marks.find((x) => x === moment(date).format('DD-MM-YYYY'))) {
                return 'highlight'
              }
            }}
          />
        )}
      </Header>
      {weatherData && <HealthWeatherInfoBox data={weatherData} />}
      <Title content={'오늘의 운동'} sub>
        <Button content={'수정 및 추가하기'} none onClick={onClickModalHandler} />
      </Title>
      <ul className={$.health_list}>
        <li className={$.empty_list}>
          <img src={logoBg} alt="빈 접시" onClick={goHealthAdd} />
        </li>
      </ul>

      <FloatMenu />
    </Wrapper>
  )
}
