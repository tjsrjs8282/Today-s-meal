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

export default function IconButton({ kinds }) {
  return (
    <>
      {kinds === 'back' && <HiArrowLeft />}
      {kinds === 'calendar' && <AiOutlineCalendar />}
      {kinds === 'close' && <AiOutlineClose />}
      {kinds === 'minus' && <AiOutlineMinus />}
      {kinds === 'plus ' && <AiOutlinePlus />}
      {kinds === 'man' && <AiOutlineMan />}
      {kinds === 'woman' && <AiOutlineWoman />}
    </>
  )
}
