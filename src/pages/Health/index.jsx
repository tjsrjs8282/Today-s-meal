import React, { useEffect, useState } from 'react'
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
import moment from 'moment'
import axios from 'axios'
import HealthWeatherInfoBox from './HealthWeatherInfoBox'
// import { weatherInstance } from '@api/axiosInstance'
export default function Health() {
  const [date, onDate] = useState(new Date())
  let [calendarOpen, setCalendarOpen] = useState(false)

  const openCalendarHandler = () => {
    setCalendarOpen(!calendarOpen)
  }

  const marks = ['15-01-2023', '03-01-2023', '07-01-2023', '12-02-2023', '13-02-2023', '15-02-2023']

  const getWeather = () => {
  //   axios.get('/weather/data/2.5/weather?lat=44.34&lon=10.99&appid=b1881980ee6e26b7b5169e5eaec251e7').then((res) => console.log(res))
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=b1881980ee6e26b7b5169e5eaec251e7&units=metric`
  
    fetch(url).then((response) => response.json()).then((data) => {
        console.log(data)
      });
    }
  

  

  useEffect(() => {
    getWeather()
  }, [])

  return (
    <Wrapper colorGray>
      <Header>
        <Flex width between>
          <HaederTitle content="운동일지 " />
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
      <ul onClick={(e) => console.log(e)}>
        <li id='1' value="a">1</li>
        <li id='2' value="b">2</li>
        <li id='3' value="c">3</li>
      </ul>
      <HealthWeatherInfoBox />

      <FloatMenu />
    </Wrapper>
  )
}
