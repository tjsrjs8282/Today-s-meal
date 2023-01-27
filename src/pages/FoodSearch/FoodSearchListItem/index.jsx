import React from 'react'
import IconButton from '@components/IconButton'
import Flex from '@components/Flex'

export default function FoodSearchListItem({ foodData, onClick }) {
  const { name, number, size, kcal } = foodData
  
  return (
    <Flex between marginTop marginBottom padding wrap radius colorWhite onClick={onClick}>
      <Flex column start>
        <h2>{name}</h2>
        <p>
          {number}개 {size} / {kcal} kcal
        </p>
      </Flex>
      <IconButton kinds="next" />
    </Flex>
  )
}

