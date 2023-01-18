import React from 'react'
import Flex from '@components/Flex'

export default function TodaySummary({ name, value, unit }) {
  return (
    <Flex column>
      <h3>{name}</h3>
      <p>
        {value}
        <span>{unit}</span>
      </p>
    </Flex>
  )
}
