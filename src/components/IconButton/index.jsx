import React from 'react'
import { useNavigate } from 'react-router-dom'
import './iconButton.module.scss'
import { HiArrowLeft } from 'react-icons/hi2'
import { BsPlusSquareFill } from 'react-icons/bs'
import { VscClose } from 'react-icons/vsc'
import { HiArrowLeft, HiChevronRight } from 'react-icons/hi2'
import {
  AiOutlineCalendar,
  AiOutlineClose,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineMan,
  AiOutlineWoman,
  AiFillCloseCircle,
  AiOutlineSearch,
} from 'react-icons/ai'

export default function IconButton({ kinds, onClick }) {
  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }
  return (
    <>
      {kinds === 'back' && <HiArrowLeft onClick={goBack} />}
      {kinds === 'calendar' && <AiOutlineCalendar size="2.2rem" />}
      {kinds === 'close' && <AiOutlineClose />}
      {kinds === 'close2' && <VscClose size="1.8rem" color="#999" />}
      {kinds === 'minus' && <AiOutlineMinus />}
      {kinds === 'plus ' && <AiOutlinePlus />}
      {kinds === 'man' && <AiOutlineMan />}
      {kinds === 'woman' && <AiOutlineWoman />}
      {kinds === 'add' && <BsPlusSquareFill />}
      {kinds === 'search' && <AiOutlineSearch size='20' color='#767676'/>}
      {
        kinds === 'closeCircle'
          && <AiFillCloseCircle
          size='24'
          color='#dbdbdb'
          onClick={() => onClick()}
        />
      }
      {kinds === 'next' && <HiChevronRight size='20' />}
    </>
  )
}
