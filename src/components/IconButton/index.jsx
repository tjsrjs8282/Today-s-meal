import React, { memo } from 'react'
import './iconButton.module.scss'
import { HiArrowLeft, HiChevronRight } from 'react-icons/hi2'
import { BsPlusSquareFill, BsCart2 } from 'react-icons/bs'
import { VscClose } from 'react-icons/vsc'
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

const IconButton = memo(({ kinds, onClick }) => {
  return (
    <>
      {kinds === 'back' && <HiArrowLeft onClick={onClick} />}
      {kinds === 'calendar' && <AiOutlineCalendar size="2.2rem" />}
      {kinds === 'close' && <AiOutlineClose onClick={onClick} />}
      {kinds === 'close2' && <VscClose size="1.8rem" color="#999" />}
      {kinds === 'minus' && <AiOutlineMinus />}
      {kinds === 'minusGray' && <AiOutlineMinus color='#999'/>}
      {kinds === 'plus' && <AiOutlinePlus />}
      {kinds === 'man' && <AiOutlineMan />}
      {kinds === 'woman' && <AiOutlineWoman />}
      {kinds === 'add' && <BsPlusSquareFill onClick={onClick} />}
      {kinds === 'search' && (
        <AiOutlineSearch size="20" color="#767676" className="search_button" />
      )}
      {kinds === 'closeCircle' && (
        <AiFillCloseCircle
          size="24"
          color="#dbdbdb"
          onClick={() => onClick()}
          className="close_circle"
        />
      )}
      {kinds === 'next' && <HiChevronRight size="20" />}
      {kinds === 'cart' && <BsCart2 size="2.2rem" />}
      
    </>
  )
})

export default IconButton