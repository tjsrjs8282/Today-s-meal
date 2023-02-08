import React, { memo, useEffect, useState, useRef, useCallback } from 'react'
import Flex from '@components/Flex'
import dayjs from 'dayjs'

const weeks = ['일', '월', '화', '수', '목', '금', '토']

const HeaderTitle = memo(({ content }) => {
  const now = dayjs()
  now.format()

  // const [today, setToday] = useState(new Date())
  // const [month, setMonth] = useState(today.getMonth() + 1)
  // const [date, setDate] = useState(today.getDate())
  // const [week, setWeek] = useState(weeks[today.getDay()])

  // const handleCheckToday = useCallback(() => {
  //   setToday(dates)
  //   setMonth(dates.getMonth() + 1)
  //   setDate(dates.getDate())
  //   setWeek(weeks[dates.getDay()])
  // }, [dates])

  // useEffect(() => {
  //   intervel.current = setInterval(handleCheckToday, 1000)

  //   return () => {
  //     clearInterval(intervel.current)
  //   }
  // }, [month, date, week])
  // useEffect(() => {
  //   handleCheckToday()
  // }, [dates])

  return (
    <Flex column start>
      <h2>{content}</h2>
      <p>{now.format(`MM월 DD일 ${weeks[now.get('d')]}요일`)}</p>
    </Flex>
  )
})

export default HeaderTitle
