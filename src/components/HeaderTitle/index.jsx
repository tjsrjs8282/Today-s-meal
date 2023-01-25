import React, { memo, useEffect, useState, useRef, useCallback } from 'react'
import Flex from '@components/Flex'

const weeks = ['일', '월', '화', '수', '목', '금', '토']

const HeaderTitle = memo(({ content }) => {
  const [today, setToday] = useState(new Date())
  const [month, setMonth] = useState(0)
  const [date, setDate] = useState(0)
  const [week, setWeek] = useState('')
  const intervel = useRef(null)

  const handleCheckToday = useCallback(() => {
    setToday(new Date())
    setMonth(today.getMonth() + 1)
    setDate(today.getDate())
    setWeek(weeks[today.getDay()])
  }, [month, date, week])

  useEffect(() => {
    handleCheckToday()
  }, [])

  useEffect(() => {
    console.log('useEffect')
    intervel.current = setInterval(handleCheckToday, 1000)

    return () => {
      clearInterval(intervel.current)
    }
  }, [month, date, week])

  return (
    <Flex column marginLeft start>
      <h2>{content}</h2>
      <p>{month}월 {date}일 {week}요일</p>
    </Flex>
  )
})

export default HeaderTitle