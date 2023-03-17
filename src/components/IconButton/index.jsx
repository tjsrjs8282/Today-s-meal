import React, { memo } from 'react'
import './iconButton.module.scss'
import { HiArrowLeft, HiChevronRight } from 'react-icons/hi2'
import {
  BsPlusSquareFill,
  BsCart2,
  BsSun,
  BsCloudSun,
  BsCloudMoon,
  BsCloudDrizzle,
  BsSnow,
  BsClouds,
  BsLightningCharge,
  BsMoonStars,
  BsCloudFog2,
} from 'react-icons/bs'
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
  AiOutlineSetting,
  AiOutlineCheckSquare,
  AiFillCheckSquare
} from 'react-icons/ai'

const IconButton = memo(({ kinds, onClick, onFocus }) => {
  return (
    <>
      {kinds === 'back' && <HiArrowLeft onClick={onClick} />}
      {kinds === 'calendar' && (
        <AiOutlineCalendar size="2.2rem" onClick={onClick} onFocus={onFocus} />
      )}
      {kinds === 'close' && <AiOutlineClose onClick={onClick} />}
      {kinds === 'close2' && <VscClose size="1.8rem" color="#999" onClick={onClick} />}
      {kinds === 'minus' && <AiOutlineMinus />}
      {kinds === 'minusGray' && <AiOutlineMinus color="#999" />}
      {kinds === 'plus' && <AiOutlinePlus onClick={onClick} />}
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
      {kinds === 'next' && <HiChevronRight size="2rem" onClick={onClick} />}
      {kinds === 'cart' && <BsCart2 size="2.2rem" />}
      {kinds === 'setting' && <AiOutlineSetting onClick={onClick} />}
      {kinds === 'checkNone' && <AiOutlineCheckSquare color='#999'/>}
      {kinds === 'check' && <AiFillCheckSquare color='#4c9838' />}
      {/* weather */}
      {kinds === 'sun' && <BsSun color="#fff" />}
      {kinds === 'moon' && <BsMoonStars color="#fff" />}
      {kinds === 'cloudSun' && <BsCloudSun color="#fff" />}
      {kinds === 'cloudMoon' && <BsCloudMoon color="#fff" />}
      {kinds === 'clouds' && <BsClouds color="#fff" />}
      {kinds === 'rain' && <BsCloudDrizzle color="#fff" />}
      {kinds === 'lightning' && <BsLightningCharge color="#fff" />}
      {kinds === 'snow' && <BsSnow color="#fff" />}
      {kinds === 'fog' && <BsCloudFog2 color="#fff" />}
    </>
  )
})

export default IconButton
