import React from 'react'
import Flex from '@components/Flex'

export default function ProductCard({ data }) {
  return (
    <Flex column radius marginBottom padding shadow col3 start colorWhite fontWhite>
      <Flex image radius marginBottom>
        <img src={data?.img} alt={data?.title} />
      </Flex>
      <h2>{data?.title}</h2>
      <p>
        {data?.price}
        <span>원</span>
      </p>
      <p>{data?.new ? '신제품' : null}</p>
    </Flex>
  )
}
