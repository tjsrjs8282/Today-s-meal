import React from 'react'
import IconButton from '@components/IconButton'
import Flex from '@components/Flex'
export default function TodayRecord({ name, value, calorie, image, food, key }) {
  return (
    <Flex width white radius padding marginBottom column shadow key={key}>
      <Flex between width marginBottom>
        <Flex>
          <img src={image} alt={name} />
          <Flex column start>
            <h2>{name}</h2>
            <p>
              {value} 개 / {calorie} kcal
            </p>
          </Flex>
        </Flex>
        <IconButton kinds="add" />
      </Flex>
      {food && (
        <Flex gray width radius padding>
          <Flex column gray start width>
            <h3>{food.name}</h3>
            <p>
              {food.value} 개 {food.size} / {food.calorie} kcal
            </p>
          </Flex>
          <IconButton kinds="close2" />
        </Flex>
      )}
    </Flex>
  )
}
