import React, { memo, useEffect, useState, useRef, useCallback } from 'react'
import Flex from '@components/Flex'

const weeks = ['일', '월', '화', '수', '목', '금', '토']

const HeaderTitle = memo(({ content, dates }) => {
  const [today, setToday] = useState(new Date())
  const [month, setMonth] = useState(today.getMonth() + 1)
  const [date, setDate] = useState(today.getDate())
  const [week, setWeek] = useState(weeks[today.getDay()])
  // const intervel = useRef(null)

  const handleCheckToday = useCallback(() => {
    setToday(dates)
    setMonth(dates.getMonth() + 1)
    setDate(dates.getDate())
    setWeek(weeks[dates.getDay()])
    // console.log(dates)
  }, [dates])

  // useEffect(() => {
  //   intervel.current = setInterval(handleCheckToday, 1000)

  //   return () => {
  //     clearInterval(intervel.current)
  //   }
  // }, [month, date, week])
  useEffect(() => {
    handleCheckToday()
  }, [dates])

  return (
    <Flex column start>
      <h2>{content}</h2>
      <p>
        {month}월 {date}일 {week}요일
      </p>
    </Flex>
  )
})

export default HeaderTitle
