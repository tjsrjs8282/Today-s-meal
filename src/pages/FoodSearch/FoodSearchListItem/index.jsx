import React from 'react'
import IconButton from '@components/IconButton'
import Flex from '@components/Flex'

export default function FoodSearchListItem({ foodData, onClick }) {
  const { food_id, food_name, food_description, brand_name } = foodData

  return (
    <Flex shadow between marginBottom padding radius colorWhite onClick={onClick}>
      <Flex column start>
        <h2>{food_name}</h2>
        <h3>{brand_name}</h3>
        <p>{food_description}</p>
      </Flex>
      <IconButton kinds="next" onClick={onClick} />
    </Flex>
  )
}
