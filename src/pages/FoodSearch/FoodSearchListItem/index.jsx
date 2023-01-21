import React, { memo } from 'react'
import IconButton from '@components/IconButton'
import Flex from '@components/Flex'
//경로들은 절대경로로 맞추기 ex: @components/Flex

const FoodSearchListItem = memo(({ foodData, onClick, kinds }) => {
  const { name, number, size, kcal } = foodData
  
  return (
    <Flex between marginTop marginBottom padding wrap radius colorWhite onClick={onClick}>
      <Flex column start>
        {kinds && <span>{kinds}</span>}
        <h2>{name}</h2>
        <p>
          {number}개 {size} / {kcal} kcal
        </p>
      </Flex>
      <IconButton kinds="next" />
    </Flex>
  )
})

export default FoodSearchListItem