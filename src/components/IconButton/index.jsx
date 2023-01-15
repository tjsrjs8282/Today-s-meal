import React from 'react'
import { HiArrowLeft } from 'react-icons/hi2'
import {
  AiOutlineCalendar,
  AiOutlineClose,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineMan,
  AiOutlineWoman,
} from 'react-icons/ai'
import './iconButton.module.scss'
import { useNavigate } from 'react-router-dom'

export default function IconButton({ kinds }) {
  const navigate = useNavigate()
  return (
    <>
      {kinds === 'back' && (
        <HiArrowLeft
          onClick={() => {
            navigate(-1)
          }}
        />
      )}
      {kinds === 'calendar' && <AiOutlineCalendar />}
      {kinds === 'close' && <AiOutlineClose />}
      {kinds === 'minus' && <AiOutlineMinus />}
      {kinds === 'plus ' && <AiOutlinePlus />}
      {kinds === 'man' && <AiOutlineMan />}
      {kinds === 'woman' && <AiOutlineWoman />}
    </>
  )
}
