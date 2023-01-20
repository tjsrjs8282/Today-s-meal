import React from 'react'
import IconButton from '@components/IconButton'
import Flex from '@components/Flex'

export default function FoodTodayRecord({ name, value, calorie, image, food, onClick, key }) {
  return (
    <Flex width colorWhite radius padding marginBottom column shadow key={key}>
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
        <IconButton kinds="add" onClick={onClick} />
      </Flex>
      {food && (
        <Flex colorGray width radius padding>
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
