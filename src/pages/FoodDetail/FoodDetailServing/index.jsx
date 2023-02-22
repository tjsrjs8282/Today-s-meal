import React from 'react'
import Flex from '@components/Flex'

export default function FoodDetailServing({ unit, image, value, name }) {
  console.log(value)
  return (
    <Flex padding radius shadow column start colorWhite whdth fontBlack marginBottom col2>
      <Flex paddingBottom>
        <img src={image} alt={name} />
      </Flex>
      <Flex marginTop column start>
        <p>{name}</p>
        <h2>
          {value}
          <span>{unit}</span>
        </h2>
      </Flex>
    </Flex>
  )
}
