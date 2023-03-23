import React from 'react'
import Flex from '@components/Flex'
import { Link } from 'react-router-dom'

export default function ProductCard({ data }) {
  console.log(data)
  return (
    <Flex column radius marginBottom padding shadow col3 start colorWhite fontWhite>
      <Link to={`${data.id}`}>
        <Flex image radius marginBottom>
          <img src={data?.img} alt={data?.title} />
        </Flex>
        <h2>{data?.title}</h2>
        <p>
          {data?.price.toLocaleString('ko-KR')}
          <span>원</span>
        </p>
        <p>{data?.new ? '신제품' : null}</p>
      </Link>
    </Flex>
  )
}
