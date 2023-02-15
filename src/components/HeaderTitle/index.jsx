import React, { memo, useEffect, useState, useRef, useCallback } from 'react'
import Flex from '@components/Flex'
import dayjs from 'dayjs'
import { useRecoilValue, useRecoilState } from 'recoil'
import { dateState, partState } from '@store'
import { localStorageService } from '@utils/localStorage.service'

const weeks = ['일', '월', '화', '수', '목', '금', '토']

const HeaderTitle = memo(({ content }) => {
  const dateRecoil = useRecoilValue(dateState)
  const partRecoil = useRecoilValue(partState)
  const date = dayjs(dateRecoil).format(`MM월 DD일 ${weeks[dayjs(dateRecoil).get('d')]}요일`)

  const handleCheckToday = useCallback(() => {
    localStorageService().set('DATE', date)
  }, [partRecoil, dateRecoil])

  useEffect(() => {
    handleCheckToday()
  }, [])

  return (
    <Flex column start>
      {content ? <h2>{content}</h2> : <h2>{partRecoil}</h2>}

      <p>{date}</p>
    </Flex>
  )
})

export default HeaderTitle
