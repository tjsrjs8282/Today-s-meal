import React from 'react'
import Wrapper from '@components/Wrapper'
import Flex from '@components/Flex'

export default function ProductCard({ data }) {
  return (
    <Flex column colorWhite radius marginBottom padding shadow col3 start>
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
