import React from 'react'
import $ from './floatMenu.module.scss'
import { BiRestaurant, BiDumbbell, BiShoppingBag, BiUser } from 'react-icons/bi'
import Flex from '@components/Flex'
import { useNavigate } from 'react-router-dom'

export default function FloatMenu({}) {
  const navigate = useNavigate()
  return (
    <div className={$.float_menu}>
      <Flex
        col4
        column
        path={'/today' || '/search' || '/today/detail'}
        onClick={() => navigate('/today')}
      >
        <BiRestaurant />
        <p>식단</p>
      </Flex>
      <Flex col4 column path={'/health'} onClick={() => navigate('/health')}>
        <BiDumbbell />
        <p>운동</p>
      </Flex>
      <Flex col4 column path={'/product'} onClick={() => navigate('/product')}>
        <BiShoppingBag />
        <p>쇼핑</p>
      </Flex>
      <Flex col4 column onClick={() => navigate('/mypage')}>
        <BiUser />
        <p>마이</p>
      </Flex>
    </div>
  )
}
