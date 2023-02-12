import React from 'react'
import IconButton from '@components/IconButton'
import Flex from '@components/Flex'

export default function FoodSearchListItem({ foodData, onClick }) {
  const { food_id, food_name, food_description, food_type } = foodData

  return (
    <Flex shadow between marginTop marginBottom padding radius colorWhite onClick={onClick}>
      <Flex column start>
        <h2>{food_name}</h2>
        <h3>{food_type}</h3>
        <p>{food_description}</p>
      </Flex>
      <IconButton kinds="next" onClick={onClick} />
    </Flex>
  )
}
