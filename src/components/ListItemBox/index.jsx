import React from 'react'
import IconButton from '@components/IconButton'
import Flex from '@components/Flex'

export default function ListItemBox({ title, brandName, description, onClick }) {
  // const { food_name, food_description, brand_name } = foodData

  return (
    <Flex shadow between marginBottom padding radius colorWhite onClick={onClick}>
      <Flex column start>
        <h2>{title}</h2>
        { brandName && <h3>{brandName}</h3>}
        <p>{description}</p>
      </Flex>
      <IconButton kinds="next" onClick={onClick} />
    </Flex>
  )
}
